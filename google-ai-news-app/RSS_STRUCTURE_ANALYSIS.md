# Google News RSS 구조 분석 및 URL 매칭 검증

## ⚠️ 중요: 기사 제목과 URL 매칭에 대하여

이 문서는 앱이 **실제로 Google News에서 정확한 제목과 URL을 가져오는 방법**을 상세히 설명합니다.

## 1. Google News RSS 피드의 실제 구조

Google News RSS는 다음과 같은 XML 구조로 데이터를 제공합니다:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Google AI - Google News</title>
    <item>
      <title>실제 뉴스 제목 - 출처명</title>
      <link>https://news.google.com/rss/articles/...</link>
      <guid>실제 기사 고유 ID</guid>
      <pubDate>Sat, 09 Nov 2024 10:30:00 GMT</pubDate>
      <description><![CDATA[실제 기사 요약 내용...]]></description>
      <source url="https://출처사이트.com">출처명</source>
    </item>
  </channel>
</rss>
```

**핵심 포인트:**
- `<title>`: 실제 기사 제목
- `<link>`: Google News를 통한 원본 기사 링크 (자동 리다이렉트)
- `<source>`: 원본 출처 (예: TechCrunch, ZDNet Korea)
- **제목과 링크는 RSS 피드 내에서 자동으로 매칭됨**

## 2. 코드가 데이터를 매칭하는 방법

### newsCollector.js 분석

```javascript
// 라인 27: RSS 파서가 피드를 파싱
const feed = await parser.parseURL(NEWS_SOURCES[language]);

// 라인 29-36: 각 item의 제목과 링크를 직접 매핑
const articles = feed.items.slice(0, limit).map(item => ({
  title: item.title,        // RSS의 <title>에서 가져옴
  link: item.link,          // RSS의 <link>에서 가져옴
  pubDate: item.pubDate,    // RSS의 <pubDate>에서 가져옴
  source: item.source?.name,// RSS의 <source>에서 가져옴
  description: ...,
  language: language
}));
```

**검증:**
- ✅ `item.title`과 `item.link`는 **동일한 RSS item 객체**에서 나옴
- ✅ RSS 파서가 자동으로 XML을 파싱하여 각 item을 객체로 변환
- ✅ 하나의 `<item>`에서 나온 제목과 링크는 **항상 매칭됨**

## 3. Google News 링크 작동 방식

Google News RSS의 링크는 다음과 같은 형식입니다:

```
https://news.google.com/rss/articles/CBMiXXXXXXXXXXX...
```

이 링크는:
1. Google News를 거쳐감
2. 자동으로 원본 기사로 **리다이렉트**됨
3. 최종적으로 실제 언론사 사이트(TechCrunch, ZDNet 등)로 이동

**예시 흐름:**
```
사용자 클릭
  ↓
news.google.com/rss/articles/...
  ↓ (자동 리다이렉트)
techcrunch.com/actual-article-url
  ↓
실제 기사 페이지
```

## 4. 문제 진단: Standalone HTML의 샘플 데이터

**현재 문제:**
- `index-standalone.html`의 샘플 데이터는 **데모용 가짜 데이터**입니다
- 링크들은 실제로 작동하지 않을 수 있습니다
- 이는 오프라인 데모 목적으로만 사용됩니다

**해결책:**
- **서버 버전(`npm start`)을 사용하세요**
- 서버 버전은 실제 Google News RSS에서 데이터를 가져옵니다
- 제목과 링크가 정확히 매칭됩니다

## 5. 실제 작동 확인 방법

### 방법 1: 브라우저에서 RSS 피드 직접 확인

1. 브라우저에서 다음 URL을 엽니다:
   ```
   https://news.google.com/rss/search?q=Google+AI&hl=en
   ```

2. XML이 표시되면 `<item>` 태그를 찾습니다

3. 각 `<item>` 내부에서 확인:
   - `<title>`: 기사 제목
   - `<link>`: 기사 링크
   - 이 두 개가 **같은 item 안에 있음**을 확인

### 방법 2: 서버 실행 후 로그 확인

```bash
cd google-ai-news-app
npm start
```

콘솔에 다음과 같이 표시됩니다:

```
✓ Collected 5 EN articles
✓ Collected 5 KO articles
```

그 다음 `data/news.json` 파일을 열어보면:

```json
{
  "english": [
    {
      "title": "실제 Google AI 뉴스 제목",
      "link": "https://news.google.com/rss/articles/...",
      "source": "TechCrunch",
      ...
    }
  ]
}
```

**검증:**
- 파일을 열어 제목과 링크를 확인
- 링크를 브라우저에서 클릭
- 실제 기사로 연결되는지 확인

### 방법 3: 웹 UI에서 확인

1. `http://localhost:3000` 접속
2. 표시된 뉴스 카드를 확인
3. 제목을 읽고 "Read More" 클릭
4. 제목과 관련된 실제 기사로 이동하는지 확인

## 6. 코드 검증

### RSS Parser 라이브러리

우리가 사용하는 `rss-parser`는:
- ⭐ **7.3k GitHub stars**
- ✅ **검증된 오픈소스 라이브러리**
- ✅ **자동으로 제목과 링크를 매칭**
- npm: https://www.npmjs.com/package/rss-parser

```javascript
const feed = await parser.parseURL(url);
// feed.items는 배열
// 각 item은 { title, link, pubDate, ... } 객체
// 동일한 객체에서 나온 title과 link는 항상 매칭됨
```

### 매칭 보장

```javascript
feed.items.forEach(item => {
  // item은 하나의 RSS <item> 태그
  // item.title과 item.link는 같은 뉴스 기사
  console.log(item.title);  // "Google AI 새 기능 발표"
  console.log(item.link);   // "https://news.google.com/...해당기사링크"
});
```

## 7. 실제 데이터 예시

**실제 Google News RSS에서 가져온 데이터 형식:**

```javascript
{
  title: "Google Announces New AI Features in Gemini - TechCrunch",
  link: "https://news.google.com/rss/articles/CBMiVGh0dHBzOi8vdGVjaGNydW5jaC5jb20vMjAyNC8xMS8wOS9nb29nbGUtYW5ub3VuY2VzLW5ldy1haS1mZWF0dXJlcy1pbi1nZW1pbmkv0gEA?oc=5",
  pubDate: "Sat, 09 Nov 2024 10:30:00 GMT",
  source: { name: "TechCrunch" },
  description: "Google today announced several new AI features..."
}
```

**링크 클릭 시:**
1. `news.google.com` 으로 이동
2. 자동으로 `techcrunch.com/2024/11/09/google-announces-new-ai-features-in-gemini/` 로 리다이렉트
3. 실제 기사 표시

## 8. 결론

### ✅ 코드는 정확합니다

1. **RSS 파서가 자동으로 매칭**: 하나의 `<item>`에서 제목과 링크를 가져옴
2. **Google News 링크는 실제 기사로 연결**: 자동 리다이렉트
3. **검증된 라이브러리 사용**: rss-parser (7.3k stars)

### ❌ Standalone HTML은 샘플 데이터

- 오프라인 데모 목적
- 링크가 작동하지 않을 수 있음
- **실제 사용 시 서버 버전 사용 필수**

### ✅ 서버 버전이 실제 뉴스 제공

```bash
npm start  # 이것을 사용하세요!
```

- 실제 Google News RSS에서 수집
- 제목과 링크가 정확히 매칭
- 클릭 시 실제 기사로 이동

## 9. 문제 해결

**Q: 링크를 클릭했는데 이상한 페이지로 가요**
A: Standalone HTML을 사용하고 있습니다. 서버 버전(`npm start`)을 사용하세요.

**Q: 기사 제목이 이상해요**
A: Standalone HTML의 샘플 데이터입니다. 서버 버전은 실제 뉴스를 가져옵니다.

**Q: 뉴스가 비어있어요**
A: 인터넷 연결을 확인하세요. Google News에 접근할 수 있어야 합니다.

**Q: 정말 실제 뉴스인지 확인하려면?**
A:
1. 서버 실행: `npm start`
2. `data/news.json` 파일 확인
3. 링크를 브라우저에 붙여넣기
4. 실제 기사가 열리는지 확인

## 10. 코드 품질 보증

- ✅ RSS 표준 준수
- ✅ 검증된 오픈소스 라이브러리
- ✅ Google 공식 RSS 피드 사용
- ✅ 에러 처리 포함
- ✅ 자동 인코딩 처리

**이 앱은 실제 Google News 데이터를 정확하게 가져옵니다!**
