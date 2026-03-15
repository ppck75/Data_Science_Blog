# 딥러닝의 이해: PyTorch Vision Classification

이번 글은 **`7_Pytorch Fundamentals_Vision Classification.pdf`** 내용을 바탕으로  
Vision Classification의 핵심 개념과 PyTorch 구현 흐름을 정리한다.

---

## 1. Vision Classification이란?

Vision Classification은 이미지 입력을 받아 클래스(label)를 예측하는 문제다.  
대표적으로 Computer Vision의 기본 과제이며, ImageNet(ILSVRC) 이후 CNN 기반 접근이 크게 발전했다.

- 입력: 이미지(픽셀 데이터)
- 출력: 클래스 확률 또는 클래스 인덱스
- 활용: 의류 분류, 객체 분류, 의료 영상 분류 등

---

## 2. CNN(Convolutional Neural Network) 핵심 구조

PDF에서 강조된 CNN 기본 블록은 아래 두 단계다.

1. `Convolutional Layer + Pooling Layer`  
2. `FC Layer(Classifier)`

즉, 앞단은 feature extractor, 뒷단은 classifier 역할을 한다.

### 2.1. Convolution Layer

- 필터(커널)로 국소 영역 특징 추출
- 출력은 Feature Map
- 주요 하이퍼파라미터: `kernel size`, `stride`, `padding`

일반적으로 커널 크기(예: 3x3, 5x5), 스트라이드, 패딩 조합이 출력 크기와 정보 보존량을 결정한다.

### 2.2. Pooling Layer

- 공간 차원 축소(down sampling)
- 연산량 감소 + 과적합 완화
- 대표 방식: `Max Pooling`, `Average Pooling`

Pooling은 feature map의 가로/세로 크기를 줄이고, 중요한 정보를 요약한다.

---

## 3. 데이터셋: FashionMNIST

강의 예시는 FashionMNIST를 사용한다.

- `28 x 28` 크기
- `grayscale`(단일 채널) 이미지
- torchvision에서 쉽게 로드 가능

PyTorch에서는 보통 다음 전처리를 사용한다.

- `transforms.ToTensor()`
- `transforms.Normalize(...)`

ToTensor로 텐서화하고, Normalize로 입력 범위를 스케일링해 학습 안정성을 높인다.

---

## 4. CNN in PyTorch 구현 흐름

PDF의 구현 파트는 아래 순서를 따른다.

1. Dataset/DataLoader 구성 (`torchvision.datasets`)
2. Conv Layer 블록 정의
3. ReLU + MaxPooling 적용
4. Flatten
5. FC Layer로 분류
6. Softmax(또는 학습 시 CrossEntropyLoss 내부 처리)로 클래스 예측

### 4.1. 전형적인 모델 흐름

`Conv -> ReLU -> MaxPool -> Conv -> ReLU -> MaxPool -> Flatten -> FC -> ReLU -> FC`

### 4.2. 텐서 shape 체크

Vision 모델에서는 `Input Tensor shape`와 `Output shape`를 확인하는 습관이 중요하다.  
특히 Conv/Pooling을 거치며 크기가 바뀌므로, Flatten 이전 차원 계산이 맞아야 FC layer가 정상 동작한다.

---

## 5. 정리

Vision Classification의 핵심은 다음 세 가지다.

1. CNN 앞단(Conv/Pooling)에서 유의미한 특징을 추출하고  
2. 뒷단(FC)에서 클래스를 예측하며  
3. 데이터 전처리(ToTensor/Normalize)와 shape 관리를 정확히 수행하는 것

실전에서는 AlexNet, VGG, ResNet 같은 사전 구조를 참고하거나 전이학습으로 확장하는 방식이 가장 효율적이다.

---

## 6. 한눈에 보는 요약 표

| 구분 | 핵심 내용 | 실무 포인트 |
|---|---|---|
| 문제 정의 | 이미지 -> 클래스 예측 | label 체계와 클래스 불균형 먼저 점검 |
| 입력 데이터 | FashionMNIST (28x28, grayscale) | 채널 수(1채널/3채널) 확인 필수 |
| 특징 추출 | Convolution + Pooling | kernel/stride/padding 설계가 성능 영향 큼 |
| 차원 축소 | Max/Average Pooling | 연산량 감소, 과적합 완화 |
| 분류기 | Flatten -> FC Layer | Flatten 후 차원 오류 방지 |
| 활성화 함수 | ReLU, (출력단 Softmax) | 학습 시 CrossEntropyLoss와 함께 사용 |
| PyTorch 전처리 | ToTensor, Normalize | 입력 스케일 정규화로 학습 안정화 |
| 모델 확장 | AlexNet, VGG, ResNet 등 | 전이학습으로 빠른 성능 확보 가능 |
