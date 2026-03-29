# 회귀 분석 (Regression) 핵심 정리

## 1. 선형 회귀 (Linear Regression)
선형 회귀는 종속 변수 $y$와 독립 변수 $x$ 사이의 관계를 선형 결합으로 표현하는 모델입니다.

### 모델 수식
$$y = w_0 + w_1x_1 + w_2x_2 + \dots + w_nx_n + \epsilon$$

* **Linear Model의 정의**: $y$가 가중치($w$)와 특성($x$)의 **선형 결합**으로 표현됨을 의미합니다.
* **주의사항**: 특성 변수 $x_i$ 자체가 비선형 결합일 수 있으나(Feature Engineering), $w$에 대해 선형이라면 여전히 Linear Model입니다.
    * **Linear Model 예시**: $y = w_0 + w_1\log(x_1) + 2w_2\sqrt{x_2}$
    * **Nonlinear Model 예시**: $y = w_0 + \exp(w_1x_1) + \log(w_2 + x_2)$ (가중치 $w$가 지수나 로그 안에 있음)

---

## 2. 일반화 선형 모델 (Generalized Linear Model, GLM)
정답 $y$의 분포 가정에 따라 다양한 회귀 모델을 사용할 수 있습니다.

| 분포 가정 (Distribution) | 예측값의 범위 (Real) | 모델 종류 |
| :--- | :--- | :--- |
| **Normal distribution** | $(-\infty, +\infty)$ | Linear Regression |
| **Bernoulli** | Binary: $\{0, 1\}$ | Logistic Regression |
| **Categorical** | Multiclass: $\{0, 1, 2, \dots, n\}$ | Softmax Regression |

---

## 3. 비용 함수 (Cost Function) 정의
모델의 예측값과 실제값의 차이를 측정하기 위해 **평균 제곱 오차(MSE)**를 사용합니다.

### Mean Squared Error (MSE)
$$J(w) = \frac{1}{m} \sum_{j=1}^{m} (\hat{y}^{(j)} - y^{(j)})^2 = \frac{1}{m} \sum_{j=1}^{m} (h(x^{(j)}) - y^{(j)})^2$$

* **행렬 표현**: $J(w) = \frac{1}{m} \sum_{j=1}^{m} (x^{(j)} \cdot w^T - y^{(j)})^2$
* **목표**: 비용 함수 $J(w)$를 최소화하는 최적의 가중치 $w^*$를 찾는 것
    $$w^* = \arg\min_{w} J(w)$$

---

## 4. 최적의 가중치 $w^*$를 찾는 방법
단순히 무작위로 찾는 것(Random Search)보다 수학적인 방법을 사용합니다.

1.  **정규 방정식 (Normal Equation)**:
    * $\frac{\partial}{\partial w}J(w) = 0$이 되는 지점을 직접 계산
    * $w^* = (X^T X)^{-1} X^T y$
2.  **경사하강법 (Gradient Descent)**:
    * 기울기를 따라 점진적으로 하강하며 최솟값을 탐색
    * **전제 조건**: $J(w)$의 대부분의 점이 **미분 가능**해야 함

---

### 💡 보충 설명
* **$x \cdot w^T$**: 가설 함수 $h(x)$를 행렬의 내적으로 표현한 것입니다.
* **$\epsilon$ (에러)**: 모델이 설명하지 못하는 잔차(Residual)를 의미합니다.
* **MSE 그래프**: ```

이미지 속의 핵심적인 구분(Linear vs Nonlinear의 차이 등)을 명확히 포함했습니다. 특히 **가중치 $w$를 기준으로 선형성을 판단한다**는 점이 시험이나 면접에서 자주 나오는 포인트니 블로그에 강조해 두시면 좋을 것 같아요!

사회과학 데이터 분석(가령 '집값 예측'이나 '팬덤 활동량 분석')을 할 때 어떤 변수를 로그 변환($\log(x)$)해서 넣을지 결정하는 과정이 바로 이미지에 나온 **Feature Engineering**의 사례입니다. 

더 궁금한 수식이나 개념이 있으신가요? Would you like me to explain why the Normal distribution leads specifically to Linear Regression?