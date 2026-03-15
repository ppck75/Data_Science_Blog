# 딥러닝의 이해: PyTorch RNN Time Series Model

이번 글은 **`8_Pytorch Fundamentals_Time Series Model.pdf`**의 RNN 파트를 중심으로 정리한다.  
핵심은 **시계열 데이터의 성격**, **RNN의 동작 원리**, **PyTorch에서의 입력/출력 텐서 구성**이다.

---

## 1. Time Series란?

시계열(Time Series)은 시간 순서가 있는 데이터다.  
즉, 각 샘플이 독립이 아니라 **이전 시점 정보와 연결**되어 있다.

- Sequence Data / Temporal Data
- 예측(Forecasting) 문제에 주로 사용
- 보통 `Trend`, `Seasonality`, `Residual` 관점으로 해석

전통 시계열 분석에서는 `AR`, `MA`, `ARIMA`, `SARIMA` 같은 모델도 사용하지만,  
복잡한 비선형 패턴에서는 딥러닝 기반 시계열 모델이 자주 쓰인다.

---

## 2. RNN(Recurrent Neural Network) 핵심 개념

RNN은 순차 데이터를 처리하기 위해 **hidden state(은닉 상태)**를 시간축으로 전달한다.

\[
h_t = f(W_{xh}x_t + W_{hh}h_{t-1} + b_h), \quad
y_t = g(W_{hy}h_t + b_y)
\]

- `x_t`: t 시점 입력
- `h_t`: t 시점 은닉 상태
- `h_{t-1}`: 이전 시점 정보(메모리 역할)

즉, RNN은 현재 입력만 보는 것이 아니라, 이전 상태를 함께 사용해 예측한다.

---

## 3. RNN의 장점과 한계

### 3.1. 장점

- 시퀀스 길이에 따라 입력을 자연스럽게 처리 가능
- 텍스트 분류, 시계열 예측 등 순서 의존 문제에 적합

### 3.2. 한계

RNN은 긴 시퀀스에서 **Long-term Dependency**를 잘 못 잡는 문제가 있다.

- Vanishing Gradient
- Exploding Gradient

특히 초기 시점 정보가 뒤로 갈수록 약해져 장기 패턴 학습이 어려워진다.  
이 한계를 보완하기 위해 LSTM이 등장한다.

---

## 4. PyTorch에서 RNN 시계열 모델 구성

PDF 파트에서 강조된 구현 포인트는 아래 흐름이다.

1. `train/test` 분리
2. 슬라이딩 윈도우 생성 (`input_window`, `output_window`)
3. RNN Layer 정의
4. 입력 텐서 shape 맞추기
5. 학습 후 시계열 예측

### 4.1. 입력 텐서 shape

PyTorch RNN 기본 입력 형태:

\[
(batch,\ seq\_len,\ input\_size) \quad \text{(batch\_first=True)}
\]

출력은 시퀀스 전체 출력과 마지막 hidden state를 함께 다룬다.

### 4.2. 미니멀 예시 구조

- `nn.RNN(input_size, hidden_size, num_layers, batch_first=True)`
- 마지막 시점 hidden output -> `nn.Linear` -> 예측값

---

## 5. 정리

RNN 기반 시계열 모델의 핵심은 다음 세 가지다.

1. 시계열을 순서 정보가 있는 sequence로 다루기  
2. `input_window`/`output_window`로 학습 샘플 만들기  
3. RNN의 장기 의존성 한계(gradient vanishing/exploding)를 이해하고 모델 선택하기

다음 글에서는 같은 PDF의 LSTM 파트를 정리해, RNN 한계를 어떻게 보완하는지 연결해서 보겠다.
