# 인구 성장률 정리  
_조성장률(CGR)과 순간성장률(Instantaneous Growth Rate)의 이해_

---

## 1. 인구성장이란 무엇인가?

인구성장이란 **주어진 두 시점 사이에서 인구수의 변동(감소 또는 증가)**를 의미한다.

두 시점 t와 t+n 사이의 인구 변화는 다음 요소로 분해할 수 있다.

- 출생 B
- 사망 D
- 유입 I
- 유출 O

이를 **두 시기 사이 인구년수(person-years lived)** $nPY_t$로 나누면,

$$\frac{P_{t+n}-P_t}{nPY_t} = \frac{nB_t}{nPY_t} - \frac{nD_t}{nPY_t} + \frac{nI_t}{nPY_t} - \frac{nO_t}{nPY_t}$$

---

## 2. 조성장률(Crude Growth Rate, CGR)

위 식은 다음과 같이 해석할 수 있다.

$$\text{조성장률} = \text{조출생률} - \text{조사망률} + \text{조유입률} - \text{조유출률}$$

<br>

### (1) 자연증가율

$$\frac{nB_t}{nPY_t} - \frac{nD_t}{nPY_t}$$

> 자연증가율 = 조출생률 - 조사망률

<br>

### (2) 조순이동률

$$\frac{nI_t}{nPY_t} - \frac{nO_t}{nPY_t} = \frac{nNM_t}{nPY_t}$$

즉,

$$\text{CGR} = \text{자연증가율} + \text{조순이동률}$$

---

## 3. 이산적 성장에서 연속적 성장으로

보통 인구성장률을 다음과 같이 정의한다.

$$r = \frac{P(T)-P(0)}{P(0)} \quad \Rightarrow \quad P(T) = P(0)(1+r)$$

1년의 성장률을 r이라 하고,  
1년을 n등분하면,

$$P(1) = P(0)\left(1+\frac{r}{n}\right)^n$$

여기서 $n \to \infty$로 보내면,

$$P(1) = P(0)e^r$$

---

## 4. 순간성장률(Instantaneous Growth Rate)

보다 일반적으로 **순간성장률 $r(t)$**를 정의하면,

$$r(t) = \lim_{\Delta t \to 0}\frac{P(t+\Delta t)-P(t)}{P(t)\Delta t} = \frac{1}{P(t)}\frac{dP(t)}{dt} = \frac{d\ln P(t)}{dt}$$

이를 적분하면,

$$\int_0^T r(t)\,dt = \ln P(T) - \ln P(0) = \ln\left(\frac{P(T)}{P(0)}\right)$$

따라서,

$$P(T) = P(0)e^{\int_0^T r(t)\,dt}$$

**👉 즉, 순간성장률을 이용해서 인구성장률을 구한다.**

---

## 5. 평균 연평균 성장률

두 시점 사이의 **평균 연평균 성장률**은 다음과 같이 정의된다.

$$\bar r = \frac{1}{T}\int_0^T r(t)\,dt = \frac{\ln\left(\frac{P(T)}{P(0)}\right)}{T}$$

이 값은 **인구 성장 곡선의 형태와 무관하게 동일**하다.

---

## 6. 성장률이 일정한 경우

만약 $r(t) = r^{\ast}$ (상수)라면,

$$P(T) = P(0)e^{r^{\ast}T}$$

이때,

$$r^{\ast} = \frac{\ln\left(\frac{P(T)}{P(0)}\right)}{T}$$

---

## 7. 인구가 2배가 되는 시간 (Doubling Time)

특정 인구가 2배가 되는 시간 T는,

$$T = \frac{\ln 2}{r^{\ast}} \approx \frac{0.693}{r^{\ast}}$$

### 예시

연평균 성장률이 $r^{\ast} = 0.03$이라면,

$$T = \frac{0.693}{0.03} \approx 23.1$$

👉 약 **23.1년 후 인구는 2배**가 된다.

---

## 8. 조성장률(CGR)과 순간성장률의 관계

**평균 연평균 성장률은 인구 성장곡선에 따라 달라지지 않는다.**

조성장률은 다음과 같이 정의된다.

$$\text{CGR} = \frac{P(T)-P(0)}{\int_0^T P(t)\,dt}$$

![인구사회1](img/인구사회1.jpg)

- 분모 $\int_0^T P(t)\,dt$는 **인구곡선 아래 면적** (특정곡선의 아래면적)
- 따라서 **조성장률은 인구 성장 경로에 따라 달라진다**

하지만 성장률이 일정하다면(즉, r* 이면), 

$$\int_0^T P(t)\,dt = \int_0^T P(0)e^{r^{\ast}t}\,dt = \frac{P(T)-P(0)}{r^{\ast}}$$

이를 CGR에 대입하면,

$$\text{CGR} = r^{\ast}$$

즉, 일정성장률 = 조성장률 (성장률이 일정하면 둘이 같다!)

또한,

$$\bar r = r^{\ast}$$

그러므로, **성장률이 일정하다면 $\text{CGR} = r^{\ast} = \bar r$ 이다.** (여기서 r* 은 일정한 인구성장률을 의미한다.)

![인구사회1](img/인구사회1.jpg)

위 그래프 세 곡선에서 조성장률은 모두 다르지만, 평균 성장률은 모두 같다.

---

## 9. 요약 정리

- 순간성장률 $r(t)$: **미분 기반, 연속적 개념**
- 평균 연평균 성장률 $\bar r$: **로그 비율**
- 조성장률(CGR): **인구곡선 면적 기반**
- 성장률이 일정하면:

$$\text{CGR} = \bar r = r^{\ast}$$

---

📌 **핵심 포인트** > 인구성장률을 어떻게 정의하느냐에 따라  
> “같은 성장”이라도 **해석과 계산 방식은 달라진다.**