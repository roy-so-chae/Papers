# 🔍 실제 뉴스 수집 작동 방식

이 문서는 앱이 **실제로 Google News에서 진짜 뉴스를 가져오는 방법**을 상세히 설명합니다.

## 1. Google News RSS 피드 사용

### RSS 피드란?
RSS(Really Simple Syndication)는 웹사이트의 콘텐츠를 구조화된 형식으로 제공하는 표준입니다. Google News는 검색 결과를 RSS 형식으로 제공합니다.

### 실제 사용하는 RSS URL

#### 영어 뉴스
```
https://news.google.com/rss/search?q=Google+AI+OR+Google+Gemini+OR+Google+Bard+when:2d&hl=en-US&gl=US&ceid=US:en
```

**URL 구성:**
- `q=Google+AI+OR+Google+Gemini+OR+Google+Bard` - 검색어
- `when:2d` - 최근 2일간의 뉴스만
- `hl=en-US` - 언어: 영어
- `gl=US` - 지역: 미국
- `ceid=US:en` - 국가 및 언어 코드

#### 한국어 뉴스
```
https://news.google.com/rss/search?q=%EA%B5%AC%EA%B8%80+AI+OR+%EA%B5%AC%EA%B8%80+%EC%A0%9C%EB%AF%B8%EB%82%98%EC%9D%B4+OR+%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5+%EA%B5%AC%EA%B8%80+when:2d&hl=ko&gl=KR&ceid=KR:ko
```

**URL 구성:**
- `q=구글+AI+OR+구글+제미나이+OR+인공지능+구글` (URL 인코딩됨)
- `when:2d` - 최근 2일간의 뉴스만
- `hl=ko` - 언어: 한국어
- `gl=KR` - 지역: 한국
- `ceid=KR:ko` - 국가 및 언어 코드

## 2. 코드 작동 방식

### 뉴스 수집 프로세스 (src/newsCollector.js)

```javascript
// 1. RSS Parser 초기화
const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

// 2. RSS URL에서 피드 파싱
const feed = await parser.parseURL(NEWS_SOURCES[language]);

// 3. 필요한 정보 추출
const articles = feed.items.slice(0, limit).map(item => ({
  title: item.title,              // 뉴스 제목
  link: item.link,                // 원문 링크
  pubDate: item.pubDate,          // 발행 날짜
  source: item.source?.name,      // 출처 (예: TechCrunch, ZDNet)
  description: item.contentSnippet, // 요약
  language: language
}));
```

### RSS 피드 응답 예시

실제 Google News RSS 피드는 다음과 같은 XML 형식으로 응답합니다:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Google AI - Google News</title>
    <item>
      <title>Google DeepMind Unveils Gemini 2.0 - TechCrunch</title>
      <link>https://news.google.com/...</link>
      <pubDate>Sat, 09 Nov 2024 10:30:00 GMT</pubDate>
      <description>Google announces Gemini 2.0...</description>
      <source url="https://techcrunch.com">TechCrunch</source>
    </item>
    <!-- 더 많은 뉴스 항목들... -->
  </channel>
</rss>
```

## 3. 자동 수집 스케줄러 (src/scheduler.js)

```javascript
// 매일 오전 7시에 자동 실행
cron.schedule('0 7 * * *', async () => {
  console.log(`Scheduled task triggered at ${new Date().toLocaleString()}`);
  await collectAllNews();
});

// 서버 시작 시에도 즉시 실행
collectAllNews();
```

**Cron 표현식 설명:**
- `0` - 0분
- `7` - 오전 7시
- `*` - 매일
- `*` - 매월
- `*` - 모든 요일

## 4. 실제 작동 확인 방법

### 방법 1: 브라우저에서 RSS URL 직접 열기

1. 브라우저에서 다음 URL을 열어보세요:
   ```
   https://news.google.com/rss/search?q=Google+AI+when:2d&hl=en
   ```

2. XML 형식으로 실제 뉴스 목록이 표시됩니다.

### 방법 2: 앱 실행 후 로그 확인

```bash
npm start
```

콘솔에 다음과 같은 로그가 표시됩니다:

```
📰 Starting news collection...
Time: 11/10/2025, 7:00:00 AM

Collecting EN news...
✓ Collected 5 EN articles

Collecting KO news...
✓ Collected 5 KO articles

✓ News collection completed!
  English articles: 5
  Korean articles: 5
  Saved to: /home/user/Papers/google-ai-news-app/data/news.json
```

### 방법 3: data/news.json 파일 확인

뉴스가 수집되면 `data/news.json` 파일에 실제 데이터가 저장됩니다:

```json
{
  "lastUpdated": "2025-11-10T07:00:00.000Z",
  "english": [
    {
      "title": "실제 뉴스 제목",
      "link": "실제 뉴스 URL",
      "pubDate": "실제 발행 날짜",
      "source": "실제 출처",
      "description": "실제 뉴스 요약",
      "language": "en"
    }
    // ... 더 많은 실제 뉴스들
  ],
  "korean": [...]
}
```

## 5. API 엔드포인트로 확인

서버 실행 후 다음 URL들을 브라우저에서 열어보세요:

### 뉴스 데이터 조회
```
http://localhost:3000/api/news
```

JSON 형식으로 수집된 실제 뉴스 데이터가 표시됩니다.

### 수동 새로고침 (새로운 뉴스 수집)
```bash
curl -X POST http://localhost:3000/api/news/refresh
```

즉시 Google News에서 최신 뉴스를 다시 수집합니다.

## 6. 샘플 데이터 vs 실제 데이터

### Standalone HTML (index-standalone.html)
- **샘플 데이터 사용**: 오프라인에서 작동하도록 하드코딩된 예시 데이터
- 서버 불필요
- 데이터 업데이트 불가능

### 서버 버전 (npm start)
- **실제 데이터 수집**: Google News RSS에서 실시간으로 가져옴
- Node.js 서버 필요
- 매일 자동 업데이트
- 수동 새로고침 가능

## 7. 네트워크 요구사항

앱이 실제 뉴스를 수집하려면:

1. ✅ **인터넷 연결** 필요
2. ✅ **news.google.com** 접근 가능해야 함
3. ✅ **포트 3000** 사용 가능해야 함

네트워크가 제한된 환경에서는:
- RSS 피드를 가져올 수 없어 빈 배열 반환
- 하지만 코드 로직은 정상 작동
- 인터넷 연결 시 자동으로 실제 뉴스 수집

## 8. 테스트 스크립트

실제 뉴스 수집을 테스트하려면:

```bash
node test-news-collection.js
```

이 스크립트는:
1. Google News RSS에 연결
2. 실제 뉴스 수집
3. 결과를 콘솔에 출력
4. data/news.json에 저장

## 결론

이 앱은 **100% 실제 Google News 데이터**를 사용합니다:

- ✅ Google News 공식 RSS 피드 사용
- ✅ 실시간 데이터 수집
- ✅ 매일 자동 업데이트
- ✅ 브라우저에서 RSS URL 직접 확인 가능
- ✅ 오픈 소스 - 코드 전체 공개

샘플 데이터는 **오직 standalone HTML 버전**에만 사용되며, 이는 오프라인 데모 목적입니다.

**서버 버전(npm start)은 항상 실제 뉴스를 가져옵니다!**
