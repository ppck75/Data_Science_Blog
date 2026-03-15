# 딥러닝의 이해: PyTorch LSTM Time Series Model

이번 글은 **`8_Pytorch Fundamentals_Time Series Model.pdf`**의 LSTM 파트를 정리한다.  
핵심은 **RNN의 한계를 왜 LSTM이 해결하는지**, 그리고 **PyTorch LSTM 레이어를 시계열에 적용하는 방법**이다.

---

## 1. 왜 LSTM이 필요한가?

RNN은 시퀀스 처리에 적합하지만, 긴 구간에서는 정보가 잘 전달되지 않는다.

- Long-term Dependency 문제
- Vanishing/Exploding Gradient 문제

LSTM은 내부 메모리 구조를 추가해 중요한 정보를 오래 보존하도록 설계됐다.

---

## 2. LSTM 핵심 구조

LSTM은 `hidden state(h_t)`와 별도로 `cell state(c_t)`를 둔다.  
그리고 게이트를 통해 정보 흐름을 조절한다.

- Forget Gate: 이전 셀 상태에서 버릴 정보 선택
- Input Gate: 새로 저장할 정보 선택
- Output Gate: 현재 출력으로 보낼 정보 선택

$$
\begin{aligned}
f_t &= \sigma(W_f[h_{t-1},x_t] + b_f) \\
i_t &= \sigma(W_i[h_{t-1},x_t] + b_i) \\
\tilde{c}_t &= \tanh(W_c[h_{t-1},x_t] + b_c) \\
c_t &= f_t \odot c_{t-1} + i_t \odot \tilde{c}_t \\
o_t &= \sigma(W_o[h_{t-1},x_t] + b_o) \\
h_t &= o_t \odot \tanh(c_t)
\end{aligned}
$$

이 구조 덕분에 장기 패턴을 RNN보다 안정적으로 학습한다.

---

## 3. PyTorch LSTM Layer 포인트

PDF의 구현 파트에서 반복적으로 강조되는 흐름:

1. `train/test` 분할
2. 시계열 윈도우 구성 (`input_window`, `output_window`)
3. `nn.LSTM` 레이어 구성
4. 입력/출력 shape 정합
5. 예측 및 성능 확인

### 3.1. 입력/출력 텐서 형태

$$
input:\ (batch,\ seq\_len,\ input\_size) \quad \text{(batch\_first=True)}
$$

`nn.LSTM`은 출력으로
- 시퀀스 출력 `output`
- 마지막 hidden state `h_n`
- 마지막 cell state `c_n`

을 함께 반환한다.

### 3.2. 미니멀 예시 구조

- `nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)`
- 마지막 시점 output 선택
- `nn.Linear(hidden_size, output_size)`로 예측값 생성

---

## 4. RNN vs LSTM (시계열 관점)

| 비교 항목 | RNN | LSTM |
|---|---|---|
| 메모리 구조 | hidden state 중심 | hidden + cell state |
| 장기 의존성 처리 | 취약 | 상대적으로 강함 |
| 학습 안정성 | gradient 이슈 큼 | 게이트 구조로 완화 |
| 계산량 | 적음 | 더 큼 |
| 추천 상황 | 짧은 시퀀스, 빠른 베이스라인 | 긴 시계열, 복잡 패턴 |

---

## 5. 정리

LSTM 시계열 모델의 핵심은 다음이다.

1. RNN의 장기 의존성 한계를 이해하기  
2. LSTM의 `cell state + gate` 구조로 정보 보존하기  
3. PyTorch에서 `input_window/output_window`와 텐서 shape를 정확히 맞추기

실무에서는 보통 **RNN을 베이스라인으로 먼저 확인**하고, 성능/안정성이 부족하면 **LSTM으로 확장**하는 흐름이 가장 효율적이다.
