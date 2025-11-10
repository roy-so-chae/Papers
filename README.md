---

## 📰 뉴스 검색 웹앱

최신 2일간의 뉴스를 실시간으로 검색할 수 있는 웹 애플리케이션입니다.

### ✨ 주요 기능

- 🔍 **실시간 뉴스 검색**: 키워드로 최신 뉴스 검색
- ⏱️ **최신 2일 필터**: 최근 48시간 이내의 뉴스만 표시
- 🌐 **다국어 지원**: 한국어, 영어, 일본어, 중국어
- 📊 **정렬 옵션**: 최신순, 관련성, 인기순
- 🎨 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모두 지원
- 🔄 **자동 업데이트**: 1시간마다 자동 새로고침

### 🚀 사용 방법

1. **API 키 발급**
   - [NewsAPI.org](https://newsapi.org/register)에서 무료 API 키 발급
   - 일일 100개 요청 무료 제공

2. **웹앱 열기**
   - `index.html` 또는 `news-search.html` 파일을 브라우저로 열기
   - 또는 GitHub Pages에서 접속: `https://[username].github.io/Papers/`
   - 직접 파일 열기: 로컬에서 `index.html` 더블클릭

3. **API 키 입력**
   - 상단의 "News API 키" 입력란에 발급받은 키 입력
   - 자동으로 브라우저에 저장됨 (다음 방문시 재입력 불필요)

4. **뉴스 검색**
   - 검색창에 키워드 입력 (예: "AI", "기술", "경제")
   - Enter 키 또는 🔍 검색 버튼 클릭
   - 언어와 정렬 옵션 변경 가능

### 🔧 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: [News API](https://newsapi.org/)
- **배포**: GitHub Pages
- **자동화**: GitHub Actions (매일 자동 배포)

### 📅 자동 업데이트

- GitHub Actions를 통해 매일 한국 시간 오전 9시에 자동 배포
- 페이지 열람 중에도 1시간마다 자동으로 최신 뉴스 갱신

### 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

---
### Figma AI

**[Figma AI로 모바일 앱을 디자인하고 구축하세요](https://app.therundown.ai/guides/design-and-build-a-mobile-app-with-figma-ai?utm_source=www.therundown.ai&utm_medium=referral&utm_campaign=ai-gives-paralyzed-patients-robotic-control)**

[요약](https://www.therundown.ai/p/ai-gives-paralyzed-patients-robotic-control?_bhlid=4eaa234680798ad3bdb45514b5705f029891f88c)

---
# Image Generation
## Align Your Flow: Scaling Continuous-Time Flow Map Distillation [[Paper]]([https://arxiv.org/pdf/2506.14603.pdf]))
- 텍스트-이미지 플로우 맵 모델을 제시

텍스트-이미지 변환
또한 FLUX.1-dev 모델을 정제하여 텍스트-이미지 생성 방식을 평가합니다 . 이전 연구에 따라 기본 모델에 경량 LoRA를 추가하고 AYF-EMD 목표값을 사용하여 미세 조정합니다. 이 미세 조정 과정은 매우 빠르며, 8개의 A100 GPU에서 약 4시간밖에 걸리지 않습니다.


Image MaskTrack

![캡처0](https://user-images.githubusercontent.com/74402562/117539300-ffc07600-b044-11eb-93e6-e9163ff956a7.PNG)
![캡처0](https://medium.com/@beckham.arieon/ai-image-generator-free-a-bloggers-case-study-for-stunning-visuals-da76c9f30ede?source=rss------artificial_intelligence-5)


------------------------------------------
## MaskTrack(Learning Video Object Segmentation from Static Images) [[Paper]](https://arxiv.org/pdf/1612.02646.pdf)
- Input fame과 이전 mask estimate를 concatenate해서 네트워크를 통과시키면 이전 mask를 refine하여 input frame에 맞는 mask를 생성한다.
- 이전 영상과 다음 frame의 연관성을 활용하여 mask를 생성한다.

The ConvNet is trained to refine the previous mask to the current frame

![캡처3](https://user-images.githubusercontent.com/74402562/117539300-ffc07600-b044-11eb-93e6-e9163ff956a7.PNG)

---------------------------------------
### Stable Diffusion # Distillation 

---
### EmbodiedGen Towards a Generative 3D World Engine for Embodied Intelligence

[arxiv](https://arxiv.org/abs/2506.10600), [pdf](https://arxiv.org/pdf/2506.10600)
[prj](https://horizonrobotics.github.io/robot_lab/embodied_gen/index.html)

#WFM/WorldFoundataModel

---
**_EmbodiedGen은_** 생성적 AI를 활용하여 체현 지능 관련 연구에서 일반화 과제를 해결하고, 타당한 물리 법칙을 기반으로 하는 생성적 3D 자산으로 구성된 다양하고 상호작용적인 3D 세계를 생성하는 툴킷입니다. 

**_EmbodiedGen은_** _이미지-3D 변환_ , _텍스트-3D 변환_ , _텍스처 생성_ , _관절 객체 생성_ , _장면 생성_ , _레이아웃 생성의_ 6가지 핵심 모듈로 구성됩니다 .


![그림1](https://horizonrobotics.github.io/robot_lab/embodied_gen/static/images/overall_method.jpg)


---





