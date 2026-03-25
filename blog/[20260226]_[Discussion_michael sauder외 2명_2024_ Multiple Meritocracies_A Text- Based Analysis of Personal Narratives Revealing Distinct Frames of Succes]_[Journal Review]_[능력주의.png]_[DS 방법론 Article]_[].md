# 데이터사이언스 논문 리뷰 소모임_20260226
## Pardo-Guerra and Pahwa _The Extended Computational Case Method A Framework for Research Design(2022)
### 경희대학교 전혁식 교수님


**Computational Science 또는 Data Science 관련 논문을 리뷰하는 소모임에서 토론한 내용과 저의 생각을 자유롭게 정리한 글입니다.**

michael sauder, yonGren shi, and Freda lynn의 'Multiple Meritocracies: A Text- Based Analysis of Personal Narratives Revealing Distinct Frames of Succes'를 리뷰하였습니다. 

**논문 정리 게시글 바로가기 -> [michael sauder, yonGren shi, and Freda lynn의 'Multiple Meritocracies: A Text- Based Analysis of Personal Narratives Revealing Distinct Frames of Succes'논문정리](https://ppck75.github.io/Data_Science/?post=%5B20260224%5D_%5Bmichael+sauder%EC%99%B8+2%EB%AA%85_2024_+Multiple+Meritocracies_A+Text-+Based+Analysis+of+Personal+Narratives+Revealing+Distinct+Frames+of+Succes%5D_%5BData+Science+Journal+Review%5D_%5B%EB%8A%A5%EB%A0%A5%EC%A3%BC%EC%9D%98.png%5D_%5BDS+%EB%B0%A9%EB%B2%95%EB%A1%A0+Article%5D_%5B%5D.md)

---

## 1. 방법론적 한계점에 대한 토론

---


### 1.1 데이터 선택: 설문 대신 인터뷰(AVP 데이터)

> “Rather than analyze what individuals have to say about meritocracy directly (such as ‘To what extent do you believe in the importance of hard work for getting ahead’), we pay close attention to how they invoke or do not invoke meritocratic ideology when narrating life events.” (Sauder, Shi, & Lynn, 2024, p. 88) 

설문조사에는 항상 **의도 편향(intentional bias)**이 개입될 위험이 존재한다.  
응답자는 질문을 받는 순간 이미 자신의 입장을 성찰하고 정당화하려는 방향으로 사고를 조정할 수 있기 때문이다.

이 연구는 이러한 한계를 피하기 위해 설문이 아니라 **American Voices Project(AVP) 인터뷰 데이터**를 활용한다.  
즉, 사람들이 특정 가치에 대해 “직접적으로 답하는 상황”이 아니라, **자신의 삶을 서사화하는 과정에서 자연스럽게 사용하는 언어**를 분석 대상으로 삼는다.

---

## 2. 이 논문의 분석 방식: 감정 분석이 아니다

이 연구는 감정 분석(sentiment analysis)이 아니다.  
**단순 frequency 기반 dictionary matching 방식**이다.

> “By counting the terms associated with one kind of get-ahead outlook, we can estimate the relative importance of the outlook in the conversations regarding the life histories and day-to-day experiences in which respondents engaged in the interviews.” (Sauder, Shi, & Lynn, 2024, p. 89) 

즉,

- 문맥 이해 ❌  
- 긍정/부정 판단 ❌  
- 단어가 등장하면 카운트 ⭕  

예:

> "I don't believe in luck."  
→ `luck` 1회 카운트됨

따라서 이 방식은 다음과 같은 **장점과 한계를 동시에 가진다.**

### 2.1 장점

- 재현 가능성 확보  
- 대규모 데이터 처리 가능  
- 변수 정의 명확  
- 연구자가 개념 통제 가능  
- 분석 과정이 투명함  

Dictionary는 이론적으로 정의된 범주(education, work, luck, religion, structure 등)에 따라 구성되며, 그 구성 과정도 명시된다.

> “A dictionary is a list of keywords and their synonyms that conveys the meanings of a specific category or theoretical construct.” (Sauder, Shi, & Lynn, 2024, p. 90) 

---

## 3. 방법론적 한계: 정서적 가치(Affective Valence)의 문제

논문은 명시적으로 다음과 같은 접근을 취한다.

> “To clarify, our approach does not imply cause-and-effect connections between meritocratic factors and life outcomes.” (Sauder, Shi, & Lynn, 2024, p. 89)  

그리고 단어 사용은 해당 구성요소의 **상대적 중요성(relative importance)**을 추정하기 위한 지표로 사용된다.

> “We operate under the assumption that if an interviewee has been primarily exposed to a certain kind of meritocratic ideology… they will be more likely to use words and phrases related to hard work or effort…” (Sauder, Shi, & Lynn, 2024, p. 89) 

하지만 이 방식은 다음의 한계를 가진다.

### 3.1 정서적 가치(Affective Valence) 파악의 어려움

단어가 등장한다고 해서, 그것이 긍정인지 부정인지 알 수 없다.

예를 들어:

- “교육은 성공의 열쇠다”
- “교육은 과대평가되었다”

두 문장 모두 `education`으로 카운트된다.  
즉, **후자이든 전자이든 동일하게 1회 등장으로 처리된다.**

이는 dictionary 기반 분석의 구조적 한계다.  
문맥, 반어, 의미 반전은 포착하지 못한다.

---

## 4. 그렇다면 왜 LLM을 쓰지 않았는가?

이 지점에서 중요한 질문이 생긴다.

> LLM을 활용하면 문맥과 뉘앙스를 파악할 수 있는데, 왜 이 논문은 LLM을 사용하지 않았는가?

이 논문의 접근은 명확히 **사전(dictionary) 기반 측정**에 근거한다.

> “Implicit in this approach is the premise that the use of outlook-related vocabularies can be used to infer the cultural disposition of a group of individuals…” (Sauder, Shi, & Lynn, 2024, p. 89)  

즉, 연구 설계 자체가 **이론적으로 정의된 범주를 측정하는 것**에 초점이 있다.

---

## 5. 이 논문과 LLM 접근의 차이

### 🔥 차이 1: 해석 가능성(Interpretability)

| Dictionary 방식 | LLM 방식 |
|----------------|----------|
| 변수 정의 명확 | 내부 표현 불투명 |
| 연구자가 개념 통제 | 어떤 dimension이 작동했는지 명확히 알기 어려움 |
| 재현 가능 | 블랙박스 문제 |
| 투명한 구성 과정 | 내부 알고리즘 설명 어려움 |

사회학 연구에서 **설명 가능성과 재현 가능성**은 핵심적이다.  
이 논문은 범주 정의 → 사전 구성 → 단어 카운트 → 표준화 → 군집화라는 과정을 명시적으로 제시한다.

> “The k-means is an unsupervised learning method, and the only prior information that needs to be provided by the researcher is the number of clusters…” (Sauder, Shi, & Lynn, 2024, p. 93) 

즉, 분석 절차는 비교적 투명하게 공개되어 있다.

---

### 🔥 차이 2: 이론 주도 vs 데이터 주도

이 논문은 다음과 같은 범주로 출발한다.

- Luck  
- Religion  
- Education  
- Work  
- Structure (ascription / state)

> “We constructed six dictionaries to assess the degree to which interviews align with particular get-ahead outlooks.” (Sauder, Shi, & Lynn, 2024, p. 89)

즉,

> 이론 → 측정 → 군집

반면 LLM 접근은 일반적으로:

> 데이터 → 패턴 → 사후 해석

의 흐름을 가진다.

---

## 6. LLM을 연구에 쓰면 인정받을 수 있을까?

제기된 질문은 다음과 같다.

- LLM은 블랙박스인데 연구로 인정받을 수 있는가?
- 재현 가능성은 어떻게 확보하는가?
- 내부 분류 기준을 설명할 수 있는가?

이 논문은 LLM을 사용하지 않았지만, **이론적으로 통제된 개념 측정과 재현 가능한 절차**를 선택했다는 점에서 사회과학적 기준에 부합한다.

---

## 7. 이 논문의 위치

이 연구는 다음과 같은 특징을 가진다.

✔ 개념 명확성  
✔ 이론 주도적 범주 설정  
✔ 재현 가능한 측정 절차  
✔ 표준화 및 군집화 과정 명시  

대신 포기한 것:

✖ 문맥 해석 능력  
✖ 의미 반전 감지  
✖ 정서적 태도 구분  

이는 “기술 부족”이 아니라 **방법론적 선택의 문제**로 볼 수 있다.

---

## 8. 핵심 통찰

이 논문은 meritocracy를 단일한 이데올로기로 보지 않고,  
언어 패턴을 통해 **서로 다른 ‘meritocratic constellations’**을 식별한다.

> “Our findings suggest that the idea of meritocracy hides meaningful variations and nuances in the ways people construct visions of what meritocracy means and how it is constituted.” (Sauder, Shi, & Lynn, 2024, p. 86) :contentReference[oaicite:8]{index=8}

따라서 이 연구는 단순히 단어를 세는 연구가 아니라,  
**문화적 프레임의 조합을 계량적으로 포착하려는 시도**로 이해할 수 있다.



## 2. WordNet과 Word Embedding & 논문의 질문

# WordNet과 Word Embedding: 사전 확장의 핵심 메커니즘

이 연구에서 사용된 **WordNet**과 **Word Embedding**은 단순히 단어를 세는 것을 넘어, 사람들이 ‘성공’을 이야기할 때 담긴 미묘한 의미 차이와 맥락을 정교하게 포착하기 위해 도입된 핵심 NLP 기법이다.

논문에서 연구진은 사전(dictionary)을 구성하는 과정에서 다음과 같이 설명한다.

> “Two sources of word synonyms were used. The first source is WordNet… The second source of synonyms is derived from word similarity scores acquired through a word embedding technique (Mikolov et al. 2013).” (Sauder, Shi, & Lynn, 2024, p. 90) :contentReference[oaicite:0]{index=0}

또한,

> “We used a semi-automated method developed by Gandalf Nicolas, Xuechunzi Bai, and Susan Fiske (2021), which uses WordNet and word embeddings to expand the lists of terms.” (Sauder, Shi, & Lynn, 2024, p. 90) :contentReference[oaicite:1]{index=1}

---

## 1. WordNet (유의어 사전 데이터베이스)

WordNet은 단어 간의 의미론적 관계(유의어, 상위어, 하위어 등)를 정리한 거대한 언어 데이터베이스다.

### ● 다의어 구분 (Word Sense)

논문에서는 ‘luck’ 예시를 통해 WordNet 활용 방식을 설명한다.

> “For example, the word luck has three word senses listed in WordNet…” (Sauder, Shi, & Lynn, 2024, p. 90) :contentReference[oaicite:2]{index=2}

연구진은 각 시드 단어의 의미(sense)를 수동으로 지정하고, 해당 연구 맥락(성공 담론)에 적합한 의미에 해당하는 동의어만 추출했다.

### ● 사전의 일관성 확보

사전 구성의 핵심 기준은 다음 두 가지였다.

> “Two indicators of quality are of central importance to the construction of a dictionary: coverage and internal validity.” (Sauder, Shi, & Lynn, 2024, p. 90) :contentReference[oaicite:3]{index=3}

- **Coverage**: 개념을 충분히 포괄하는가  
- **Internal Validity**: 의미적으로 일관된 단어들만 포함되는가  

WordNet은 특히 **내적 타당성(Internal Validity)**을 확보하는 데 기여한다.

---

## 2. Word Embedding (단어 임베딩)

Word Embedding은 단어를 고차원 벡터로 변환하여, 단어 간의 **맥락적 유사도**를 계산할 수 있게 하는 기술이다.

논문은 이를 다음과 같이 설명한다.

> “Word embedding is a language model that learns vector representations of words by analyzing the contexts in which they appear…” (Sauder, Shi, & Lynn, 2024, p. 90) :contentReference[oaicite:4]{index=4}

### ● 맥락적 유사도 포착

임베딩 모델은 단어 자체가 달라도, 유사한 맥락에서 쓰이면 벡터 공간에서 가깝게 위치하도록 학습한다.

논문 예시:

> “words with inherently similar meanings but infrequent coappearance in the same sentences (for example, mayor and head) can have similar representations because they have common contextual words.” (Sauder, Shi, & Lynn, 2024, p. 90) :contentReference[oaicite:5]{index=5}

### ● 잠재적 단어 발굴

WordNet이 사전적 동의어를 확장한다면,  
임베딩은 실제 인터뷰(구어체)에서 사용되는 표현까지 포착한다.

즉, 사전적 정의는 다르지만 문맥상 유사한 단어를 추가로 발굴할 수 있다.

---

## 3. 두 기법의 결합: 반자동(semi-automated) 확장

연구진은 WordNet과 Word Embedding을 결합한 **반자동 방식(semi-automated method)**을 사용했다.

그리고 중요한 단계는 다음이다.

> “In the third step, we each independently evaluated the validity of each term in the expanded list… Terms were kept in the dictionaries only if we reached a consensus.” (Sauder, Shi, & Lynn, 2024, p. 91) :contentReference[oaicite:6]{index=6}

### 절차 정리

1. **WordNet 기반 확장**
2. **임베딩 기반 후보 단어 추가**
3. **연구자 3인의 독립 검토**
4. **3인 모두 동의한 단어만 최종 포함**

즉, 기계가 확장하고, 인간이 최종 필터 역할을 수행한다.

이 방식은 다음의 균형을 목표로 한다.

- Coverage 확대
- Internal Validity 유지

---

# 사전 기반 분석은 어떻게 작동하는가?

## “운 관련 단어가 많이 나오면 운을 중요하게 본 것인가?”

네, 기본적으로 그렇다.

논문은 다음과 같이 전제한다.

> “We make the standard assumption that the greater the number of dictionary terms present in an interview, the higher the likelihood of the construct of interest appearing.” (Sauder, Shi, & Lynn, 2024, p. 91) :contentReference[oaicite:7]{index=7}

즉,

- 특정 사전 단어가 많이 등장할수록
- 해당 개념을 삶을 설명하는 프레임으로 더 많이 사용한다고 본다.

하지만 단순 카운트만 하지 않는다.

---

## 데이터 보정 과정

논문에 명시된 처리 과정은 다음과 같다.

> “The resulting raw count was then normalized by the total number of the words articulated by the interviewee.” (Sauder, Shi, & Lynn, 2024, p. 91) :contentReference[oaicite:8]{index=8}  

> “we applied a logarithmic transformation…” (Sauder, Shi, & Lynn, 2024, p. 91) :contentReference[oaicite:9]{index=9}  

> “Next, we standardized the measurements…” (Sauder, Shi, & Lynn, 2024, p. 91) :contentReference[oaicite:10]{index=10}  

### 1. 정규화 (Normalization)
인터뷰 길이 차이를 보정

### 2. 로그 변환 (Log Transformation)
빈도 분포의 왜도(skewness) 완화

### 3. Z-score 표준화
일상적으로 자주 쓰이는 개념(work 등)과
상대적으로 드물게 쓰이는 개념(luck 등)을 공정하게 비교

결국 측정하는 것은:

> 평균적인 미국인에 비해 해당 인터뷰이가 특정 개념을 얼마나 상대적으로 많이(또는 적게) 사용하는가

---

# 토론거리

## 1. WordNet + 임베딩 결합 방식의 장점은 무엇인가?

핵심은 **Coverage와 Internal Validity 사이의 균형**이다.

- WordNet → 의미론적 정확성 확보
- Word Embedding → 실제 맥락 기반 확장
- 연구자 합의 → False Positive 제거

즉, 전통적 사전 방식의 정확성과
기계 학습 기반 확장성을 동시에 확보한다.

---

## 2. WordNet과 임베딩을 많이 쓰는가?

전통적 수작업 사전 구축은 비용이 높고,
임베딩만 사용하면 맥락과 무관한 단어가 포함될 위험이 있다.

이 논문이 채택한 반자동 방식은:

- 효율적 확장
- 타당성 보장
- 인간 판단과 기계 연산의 결합

이라는 점에서 합리적인 선택으로 이해할 수 있다.

---

# Latent Class란 무엇인가?

이 논문에서는 k-means로 분류된 집단을 **잠재 계층(Latent Classes)**이라고 부른다.

> “Our objective is to classify the interviewees into k distinct clusters…” (Sauder, Shi, & Lynn, 2024, p. 93) :contentReference[oaicite:11]{index=11}

여기서 “잠재(latent)”라는 표현은

- 사람들이 직접 자신을 유형화하지 않았지만
- 텍스트 속 언어 패턴을 통해
- 통계적으로 숨겨진 신념 구조를 발견했기 때문이다.

---

# Figure 1의 2차원 시각화는 어떻게 가능한가?

논문은 6개 사전(6차원 데이터)을 사용한다.

> “clusters in a six-dimensional space in which each dimension represents a dictionary.” (Sauder, Shi, & Lynn, 2024, p. 93) :contentReference[oaicite:12]{index=12}

Figure 1은 이를 2차원 평면으로 시각화한 것이다.

> “Figure 1 displays the distributions of all the interviewees (points) in a two-dimensional space, with the dimensions having no inherent meaning, but the distances between points implying the overall difference in the six get-ahead outlooks.” (Sauder, Shi, & Lynn, 2024, p. 94) :contentReference[oaicite:13]{index=13}

핵심은 다음과 같다.

- Dim1 (25.5%), Dim2 (20.8%)
- 각 축은 고유한 의미는 없음
- 점 사이 거리 = 6개 성공 프레임 전반의 차이

논문 본문 어디에도 “PCA”라는 용어는 명시적으로 등장하지 않는다.  
다만, 전체 분산을 설명하는 2개 축으로 시각화했다는 점에서 차원 축소 기법이 사용되었음을 추론할 수 있다.

---

# 정리

이 연구는 단순 단어 카운트가 아니라,

1. 이론 기반 사전 구성  
2. WordNet + Word Embedding 결합  
3. 인간 검증을 통한 타당성 확보  
4. 정규화 + 로그 변환 + Z-score 표준화  
5. k-means 군집화  

를 거쳐, 사람들의 성공 담론 속에 숨어 있는 **잠재적 능력주의 유형**을 밝혀낸다.


## 3. k-means와 LLM (내 연구 아이디어 메모)

# 질문 2: Figure 1의 차원 축소와 시각화 해석

## 1. 6차원 데이터를 왜 2차원으로 표현했을까?

이 논문은 6개의 사전 빈도 데이터(education, work, luck, religion, structure 1, structure 2)를 사용하여 **6차원 공간에서 k-means 클러스터링**을 수행했다.

논문에서 명확히 언급하듯이,

> “clusters in a six-dimensional space in which each dimension represents a dictionary.” (Sauder, Shi, & Lynn, 2024, p. 93) :contentReference[oaicite:0]{index=0}

그런데 Figure 1에서는 이를 2차원 평면으로 시각화한다.

> “Figure 1 displays the distributions of all the interviewees (points) in a two-dimensional space, with the dimensions having no inherent meaning, but the distances between points implying the overall difference in the six get-ahead outlooks.” (Sauder, Shi, & Lynn, 2024, p. 94) :contentReference[oaicite:1]{index=1}

### ✔ 핵심 포인트

- 6차원 → 2차원으로 차원 축소하여 시각화
- Dim1 (25.5%), Dim2 (20.8%)
- 두 축은 **고유한 의미(no inherent meaning)**는 없음
- 점 사이 거리 = 6개 성공 담론에 대한 전반적 차이

논문 본문에는 차원 축소를 어떤 기법으로 수행했는지 명시적 설명은 없다.  
그러나 분산 설명 비율(25.5%, 20.8%)이 제시된 점을 보면, 전체 변동성을 가장 잘 설명하는 두 축을 사용했음을 알 수 있다.

---

## 2. 45% 설명력(25.5% + 20.8%)은 의미 있는가?

현재 시각화는 약 46%의 분산을 설명한다.  
즉, 6차원 정보를 2차원으로 줄이면서 약 54%의 정보는 시각화에 반영되지 않았다.

### 🎯 결론부터

✔ 설명력이 높아질수록  
→ 2차원 그림이 6차원 구조를 더 정확히 반영

하지만  
❗ 반드시 군집이 더 뚜렷해지는 것은 아니다.

---

## 3. 왜 설명력과 군집 분리는 동일하지 않을까?

### 1️⃣ 차원 축소 축은 "분산"을 최대화하는 축

차원 축소는 군집을 잘 나누는 축을 찾는 것이 아니라  
**데이터의 전체 분산을 가장 많이 설명하는 축**을 찾는다.

즉,

- 군집 차이가 전체 분산의 주요 원인이라면 → 분리가 선명
- 군집 차이가 분산의 주요 원인이 아니라면 → 설명력과 무관

---

## 4. 경우를 나누어 생각해보자

### 🔵 경우 1: 군집 차이가 주요 분산 원인일 때

예를 들어,

- cluster 1 → education 높음  
- cluster 2 → religion 높음  
- cluster 3 → luck 높음  

이 차이가 전체 분산의 대부분을 차지한다면,

→ 차원 축이 그 차이를 반영  
→ Dim1 + Dim2 설명력 증가  
→ 2차원에서도 군집이 또렷하게 분리  

이 경우는:

Between-cluster variance ≫ Within-cluster variance

✔ k-means 결과가 데이터 구조의 핵심 패턴  
✔ 재현성 높음  
✔ 해석 용이  
✔ “자연스럽게 존재하는 구조”에 가까움  

---

### 🔴 경우 2: 내부 분산이 클 때

- 군집 내부 분산 큼  
- 군집 간 차이 작음  

Between-cluster variance ≈ Within-cluster variance

이 경우,

→ 차원 축이 내부 분산을 설명할 수도 있음  
→ 설명력 높아도 군집은 겹칠 수 있음  

✔ 군집 경계 인위적일 가능성  
✔ 작은 데이터 변화에도 군집 변경 가능  
✔ 해석 애매  

이 경우는 “연속적 분포를 억지로 나눈 것”일 가능성도 있다.

---

## 5. 중요한 점: PCA 시각화 ≠ 군집 강도

2D에서 분리가 잘 보인다고 해서  
군집이 통계적으로 강하다는 뜻은 아니다.

군집의 강도는 보통 다른 지표로 판단한다:

- Silhouette score  
- Calinski–Harabasz index  
- Dunn index  
- Gap statistic  

Figure 1은 **보조적 시각화 도구**일 뿐이다.

---

## 6. 논문 맥락에서의 의미

이 논문은 “Multiple Meritocracies”라는 프레임을 주장한다.

- 경우 1에 가까우면  
  → “서로 다른 인지 프레임이 구조적으로 존재한다”  

- 경우 2에 가까우면  
  → “연속적 스펙트럼을 세 구간으로 나눈 것”  

이 둘은 이론적으로 매우 다른 주장이다.

---

# 내 연구 메모: Trade-off에 대한 고민

나도 비슷하게 해볼 수 있을까?

1. K-means 클러스터링  
2. 인간 언어의 미묘한 차이 구분 한계  
3. LLM을 활용해볼까 고민  
4. 하지만 설명 가능성? 재현 가능성? 블랙박스 문제?

이 과정에서 **trade-off**를 배웠다.

---

## 1️⃣ k-means는 블랙박스인가?

엄밀히 말하면 아니다.

알고리즘은 완전히 투명하다.

목적 함수:

\[
\min \sum_{k=1}^{K} \sum_{i \in C_k} \|x_i - \mu_k\|^2
\]

- 거리 기준: 보통 Euclidean distance  
- 업데이트 규칙: centroid 재계산  

“왜 저 점이 저 군집에 들어갔는가?”  
→ 그 군집 중심과의 거리가 가장 가까웠기 때문.

✔ 알고리즘 자체는 수학적으로 투명  

---

## 2️⃣ LLM은?

“왜 그렇게 분류했는가?”  
→ 내부 attention 구조 때문  

해석이 어렵다.  

---

## 3️⃣ 더 근본적인 질문

완전히 설명 가능한 모델은 존재하는가?

- 로지스틱 회귀도 상관 구조 복잡하면 해석 어려움  
- Random forest는 반(半) 블랙박스  
- 딥러닝은 더 불투명  

설명 가능성은 이분법이 아니라 **연속체**다.

- k-means → 수학적으로 투명하지만 직관적으로는 복잡  
- LLM → 내부 표현이 고차원적이고 불투명  

성격이 다르다.

---

# 최종 정리

이 질문을 통해 배운 것:

✔ 설명력 ↑ = 정보 손실 ↓  
✔ 하지만 설명력 ↑ ≠ 군집 분리도 ↑  
✔ 군집의 강도는 별도 지표로 판단해야 함  
✔ 방법론은 항상 trade-off의 문제  

k-means는 단순하고 설명 가능하지만  
문맥의 미묘함을 포착하기 어렵다.

LLM은 문맥 이해에 강하지만  
설명 가능성과 재현 가능성에서 도전이 있다.

결국 연구 설계는  
**이론적 통제 vs 의미 정밀성** 사이의 선택이라는 점을 배웠다.