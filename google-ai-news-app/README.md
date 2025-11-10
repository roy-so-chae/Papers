# 📰 Google AI News Daily

매일 아침 자동으로 구글 AI 뉴스를 수집하는 반응형 웹 애플리케이션입니다.

## ✨ 주요 기능

- 📅 **매일 아침 7시 자동 수집**: 최신 구글 AI 뉴스를 자동으로 수집
- 🌍 **다국어 지원**: 영어와 한국어 뉴스 각각 5개씩 제공
- 📱 **모바일 반응형**: 데스크톱, 태블릿, 모바일 모든 기기에서 최적화된 UI
- ⚡ **실시간 새로고침**: 버튼 클릭으로 언제든지 최신 뉴스 업데이트
- 🎨 **현대적인 디자인**: 깔끔하고 사용하기 쉬운 인터페이스
- 🌙 **다크모드 지원**: 시스템 테마에 따라 자동 전환

## 🚀 빠른 시작

### 필요 조건

- Node.js 14.x 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**

```bash
cd google-ai-news-app
npm install
```

2. **서버 실행**

```bash
npm start
```

3. **브라우저에서 접속**

```
http://localhost:3000
```

### 개발 모드 실행

자동 재시작 기능이 있는 개발 모드로 실행:

```bash
npm run dev
```

## 📁 프로젝트 구조

```
google-ai-news-app/
├── server.js                 # Express 서버 메인 파일
├── package.json              # 프로젝트 설정 및 의존성
├── .gitignore                # Git 제외 파일 목록
├── README.md                 # 프로젝트 문서
│
├── src/                      # 백엔드 소스 코드
│   ├── newsCollector.js     # 뉴스 수집 로직
│   └── scheduler.js         # 자동 스케줄링
│
├── public/                   # 프론트엔드 정적 파일
│   ├── index.html           # 메인 HTML
│   ├── style.css            # 스타일시트
│   └── app.js               # 클라이언트 JavaScript
│
└── data/                     # 데이터 저장소
    └── news.json            # 수집된 뉴스 데이터
```

## 🔧 API 엔드포인트

### GET /api/news

저장된 뉴스 데이터를 가져옵니다.

**응답 예시:**

```json
{
  "success": true,
  "data": {
    "lastUpdated": "2025-11-10T07:00:00.000Z",
    "english": [...],
    "korean": [...],
    "totalArticles": 10
  }
}
```

### POST /api/news/refresh

뉴스를 즉시 수집합니다.

**응답 예시:**

```json
{
  "success": true,
  "message": "News refreshed successfully",
  "data": {
    "lastUpdated": "2025-11-10T10:30:00.000Z",
    "english": [...],
    "korean": [...],
    "totalArticles": 10
  }
}
```

### GET /api/health

서버 상태를 확인합니다.

**응답 예시:**

```json
{
  "success": true,
  "status": "running",
  "timestamp": "2025-11-10T10:30:00.000Z"
}
```

## ⚙️ 설정

### 자동 수집 시간 변경

`src/scheduler.js` 파일에서 cron 스케줄을 수정할 수 있습니다:

```javascript
// 현재: 매일 오전 7시
const schedule = '0 7 * * *';

// 예시: 매일 오전 9시
const schedule = '0 9 * * *';

// 예시: 매일 오전 7시와 오후 7시
const schedule = '0 7,19 * * *';
```

### 뉴스 수집 개수 변경

`src/newsCollector.js`에서 수집 개수를 조정할 수 있습니다:

```javascript
// 각 언어별 10개씩 수집
const [englishNews, koreanNews] = await Promise.all([
  collectNews('en', 10),  // 영어 10개
  collectNews('ko', 10)   // 한국어 10개
]);
```

### 포트 변경

환경 변수로 포트를 설정할 수 있습니다:

```bash
PORT=8080 npm start
```

## 🛠️ 기술 스택

### 백엔드

- **Node.js**: JavaScript 런타임
- **Express**: 웹 프레임워크
- **rss-parser**: RSS 피드 파싱
- **node-cron**: 작업 스케줄링
- **axios**: HTTP 클라이언트

### 프론트엔드

- **Vanilla JavaScript**: 프레임워크 없는 순수 JS
- **CSS3**: 반응형 디자인, Grid, Flexbox
- **HTML5**: 시맨틱 마크업

## 📊 데이터 소스

뉴스는 Google News RSS 피드에서 수집됩니다:

- **영어 뉴스**: Google AI, Google Gemini, Google Bard 관련 최근 2일 뉴스
- **한국어 뉴스**: 구글 AI, 구글 제미나이, 인공지능 구글 관련 최근 2일 뉴스

## 🔄 자동 업데이트

- **서버 측**: 매일 오전 7시에 자동으로 뉴스 수집
- **클라이언트 측**: 30분마다 자동으로 뉴스 새로고침
- **수동 새로고침**: 언제든지 "Refresh News" 버튼으로 즉시 업데이트

## 📱 반응형 디자인

- **데스크톱**: 최대 1200px 너비의 2단 레이아웃
- **태블릿**: 768px 이하에서 최적화된 레이아웃
- **모바일**: 480px 이하에서 1단 세로 레이아웃

## 🎨 UI 특징

- 현대적이고 깔끔한 카드 기반 디자인
- 부드러운 애니메이션과 트랜지션
- 직관적인 아이콘과 색상 사용
- 접근성을 고려한 대비와 폰트 크기
- 다크모드 자동 지원

## 🚦 상태 관리

- 로딩 상태 표시 (스피너)
- 에러 메시지 표시
- 마지막 업데이트 시간 표시
- 실시간 피드백 (버튼 상태 변경)

## 📝 라이선스

MIT License

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

## 📧 문의

문제가 발생하거나 제안사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ for Google AI enthusiasts**
