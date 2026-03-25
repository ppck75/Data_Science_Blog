# Multiple Meritocracies: A Text- Based Analysis of Personal Narratives Revealing Distinct Frames of Succes
**michael sauder, yonGren shi, and Freda lynn (2024)**

---

**Computational Science 또는 Data Science 관련 논문을 요약하고, 논문 리뷰 소모임에서 토론한 내용을 함께 정리한 글입니다.**
michael sauder, yonGren shi, and Freda lynn의 'Multiple Meritocracies: A Text- Based Analysis of Personal Narratives Revealing Distinct Frames of Succes'를 리뷰하였습니다. 


---

# Multiple Meritocracies: 개인 서사에 나타난 성공 프레임의 다중성  
**Sauder, Shi, & Lynn (2024)**  
*RSF: The Russell Sage Foundation Journal of the Social Sciences, 10(5): 86–117*

---

## 1. 연구 문제 제기: 능력주의는 정말 하나인가?

미국 사회에서 능력주의(meritocracy)는 “시대의 자기 이미지(self-image of the age)”를 지탱하는 핵심 이념으로 간주된다 (Markovits, 2019, ix).

일반적으로 능력주의는 다음과 같이 이해된다.

- **노력(hard work)**  
- **재능(skill/talent)**  
→ 이 둘이 결합하면 **보상과 성공으로 이어진다**

보다 공식적으로는 다음과 같이 정의된다.

> a “social system in which advancement in society is based on an individual’s capabilities and merits rather than on the basis of family, wealth, or social backgrounds” (Kim & Choi, 2017, p. 12; Sauder et al., 2024, p. 86).

---

## 2. 기존 능력주의 논의에 대한 비판

저자들은 기존 능력주의 비판조차도 능력주의를 지나치게 단일하게 가정한다고 지적한다.

> These critiques of meritocracy are well founded, but they also tend to use the term meritocracy uncritically … nearly always discussing meritocracy as if its meaning is consistent or monolithic across members of society (Sauder et al., 2024, p. 87).

즉 문제는 단순히 “능력주의가 지배적이다”가 아니라,  
**능력주의의 의미가 사회 구성원들 사이에서 동일하다고 전제하는 것**이다.

---

## 3. 단수의 Meritocracy에서 복수의 Meritocracies로

논문의 핵심 질문은 다음과 같다.

> Does meritocracy mean different things to different people? (Sauder et al., 2024, p. 87)

그리고 이 연구의 핵심 결론은 다음 문장에 집약된다.

> Our findings suggest that the idea of meritocracy hides meaningful variations and nuances in the ways people construct visions of what meritocracy means and how it is constituted (Sauder et al., 2024, p. 86).

능력주의는 하나의 일관된 이념이 아니라,  
사람들이 서로 다르게 구성하는 **“성공의 레시피(recipes)”**다.

---

## 4. 이 연구에서 사용된 연구방법론

이 논문의 가장 큰 강점은 **질적 인터뷰 자료를 자연어 기반 계량 분석과 결합한 설계**에 있다.

### 4.1 데이터: American Voices Project (AVP)

- 전국 대표 표본 기반 심층 인터뷰 자료
- 최종 분석 표본: 1,569명 (5,000자 이상 인터뷰만 포함)
- 저소득층 과대표집 설계
- 인구통계 정보 포함

이 데이터는 개인의 삶의 궤적을 서사적으로 기술한 방대한 텍스트 자료라는 점에서, 단순 설문 응답과는 질적으로 다르다.

---

### 4.2 사전(Dictionary) 기반 텍스트 분석

저자들은 “성공 프레임(get-ahead outlooks)”을 측정하기 위해  
6개의 개념 사전을 구축하였다.

| 범주 | 성격 | 사전 출처 |
|------|------|------------|
| Work | 전통적 능력주의 | LIWC |
| Education | 전통적 능력주의 | 저자 구성 |
| Luck | 비합리적 요인 | 저자 구성 |
| Religion | 비합리적 요인 | LIWC |
| Structure 1 | 인종·계급·성별 | 저자 구성 |
| Structure 2 | 정부·정치 | 저자 구성 |

사전 구축 절차는 다음 3단계를 따른다 (Sauder et al., 2024, pp. 90–91).

1. Seed term 선정  
2. WordNet + Word Embedding 기반 확장  
3. 3인 코더 합의 검증 (Fleiss’ kappa 사용)

여기서 중요한 개념은:

- **Coverage**: 해당 개념을 충분히 포괄하는가  
- **Internal validity**: 의미적 일관성이 유지되는가  

즉, 이 연구는 단순 단어 카운트가 아니라  
이론적으로 정교화된 사전 구축 과정을 거친다.

---

### 4.3 측정 절차: 정규화와 표준화

각 인터뷰에 대해 다음 절차를 수행한다.

1. 사전 단어 빈도 계산  
2. 인터뷰 길이로 정규화  
3. 로그 변환 (왜도 보정)  
4. z-score 표준화  

이 과정은 서로 다른 사전 간 빈도 차이(예: work vs luck)의 왜곡을 방지하기 위한 조치다.

---

### 4.4 군집 분석: K-means Clustering

저자들은 6차원 공간(6개 사전 점수)에서 인터뷰를 군집화한다.

- 방법: K-means clustering (Lloyd, 1982)
- 최적 군집 수: k = 3 (30개 지표 기준)
- 목표: **유사한 성공 프레임을 사용하는 사람들의 잠재적 집단(latent classes) 탐색**

여기서 핵심은, 능력주의를 단일 평균값으로 보는 것이 아니라  
**패턴화된 조합 구조를 탐색한다는 점**이다.

---

### 4.5 방법론적 의의

이 연구는 다음과 같은 방법론적 기여를 가진다.

- 질적 인터뷰를 계량적 텍스트 분석과 결합
- “belief constellation”을 경험적으로 모델링
- 태도 조사 대신 서사 기반 언어 사용 분석

즉, 이 연구는 **질적 자료를 양적 구조로 변환하여 문화적 신념의 패턴을 탐색하는 혼합 방법론적 접근**이다.

---

## 5. “무엇을 믿는가”가 아니라 “어떻게 말하는가”

저자들은 설문에서 능력주의 태도를 직접 묻지 않는다. 대신 다음과 같은 접근을 취한다.

> Rather than analyze what individuals have to say about meritocracy directly … we pay close attention to how they invoke or do not invoke meritocratic ideology when narrating life events (Sauder et al., 2024, p. 87).

즉, 이 연구는 태도(attitude) 분석이 아니라  
**서사 속 언어 사용 분석**이다.

---

## 6. 결과 요약: 세 가지 능력주의 유형

| 유형 | 특징 | 해석 |
|------|------|------|
| Frustrated Meritocracy | 노력·교육 강조 + 구조·운 언급 | 능력주의와 현실의 괴리 |
| Complex Meritocracy | 노력 + 구조 + 운 + 종교 혼합 | 다층적 성공 이해 |
| Detached Meritocracy | 능력주의 언어 전반적으로 낮음 | 성공 담론과 거리두기 |

---

## 7. 정책적 함의

> individual perceptions play a key role in determining both support for existing redistributive policies and the viability of future policy alternatives (Sauder et al., 2024, p. 89).

능력주의의 다중성은 문화 분석을 넘어  
정치적 태도와 정책 정당성 문제로 이어진다.

---

# 요약

능력주의는 단수가 아니라 복수이며,  
이 연구는 자연어 분석과 군집 분석을 통해 그 **신념 조합의 구조**를 실증적으로 드러낸다.

---

# References

Sauder, Michael, Yongren Shi, and Freda Lynn. 2024.  
“Multiple Meritocracies: A Text-Based Analysis of Personal Narratives Revealing Distinct Frames of Success.”  
*RSF: The Russell Sage Foundation Journal of the Social Sciences* 10(5): 86–117.  
https://doi.org/10.7758/RSF.2024.10.5.04

--- 