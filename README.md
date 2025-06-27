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

[[Align Your Flow Scaling Continuous-Time Flow Map Distillation]]
[[Adversarial Diffusion Distillation]]



