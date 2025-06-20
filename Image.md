# Video Object Segmentation
## OSVOS(One-Shot Video Object Segmentation) [[Paper]](https://arxiv.org/pdf/1611.05198.pdf)
- 각 frame을 독립적으로 연산하며 Time sequence상에서 continuous하게 correlation을 활용하지 않는다.

Frame-based processing introduces temporal inconsistencies 

![캡처1](https://user-images.githubusercontent.com/74402562/117539295-fc2cef00-b044-11eb-85d3-437cbdd2a27f.PNG)

But results are still very convincing

![캡처2](https://user-images.githubusercontent.com/74402562/117539299-fe8f4900-b044-11eb-9cac-7df6a49b0101.PNG)

------------------------------------------
## MaskTrack(Learning Video Object Segmentation from Static Images) [[Paper]](https://arxiv.org/pdf/1612.02646.pdf)
- Input fame과 이전 mask estimate를 concatenate해서 네트워크를 통과시키면 이전 mask를 refine하여 input frame에 맞는 mask를 생성한다.
- 이전 영상과 다음 frame의 연관성을 활용하여 mask를 생성한다.

The ConvNet is trained to refine the previous mask to the current frame

![캡처3](https://user-images.githubusercontent.com/74402562/117539300-ffc07600-b044-11eb-93e6-e9163ff956a7.PNG)

---------------------------------------
## RGMP(Fast Video Object Segmentation by Reference-Guided Mask Propagation) [[Paper]](https://openaccess.thecvf.com/content_cvpr_2018/papers/Oh_Fast_Video_Object_CVPR_2018_paper.pdf)
- 이전 frame과 mask뿐만 아니라 Reference frame과 mask(첫번째 frame의 이미지와 mask정보)를 함께 넘겨준다.

![캡처4](https://user-images.githubusercontent.com/74402562/117539303-018a3980-b045-11eb-850d-41412f1e72bf.PNG)

----------------------------------------


