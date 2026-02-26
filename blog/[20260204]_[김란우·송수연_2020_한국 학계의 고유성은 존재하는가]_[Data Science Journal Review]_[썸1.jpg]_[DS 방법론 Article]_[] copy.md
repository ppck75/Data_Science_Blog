# Corpus Modeling and the Geometries of Text Meaning Spaces_Meaning Spaces as Metaphor and Method
**Dustin S. Stoltz, Marissa A. Combs, and Marshall A. Taylor (2025)**

---

**Computational Science 또는 Data Science 관련 논문을 요약하고, 논문 리뷰 소모임에서 토론한 내용을 함께 정리한 글입니다.**
Dustin S. Stoltz, Marissa A. Combs, and Marshall A. Taylor의 'Corpus Modeling and the Geometries of Text Meaning Spaces_Meaning Spaces as Metaphor and Method(chapter 4)'를 리뷰하였습니다. 

*Corpus Modeling and the Geometries of Text Meaning Spaces as Metaphor and Method*  
In *The Oxford Handbook of the Sociology of Machine Learning*

---

## 1. 논문 핵심 주장

> 임베딩과 LLM이 만드는 “의미 공간”은 객관적 진실이 아니라,  
> **코퍼스 선택 + 목표함수 설정 + 공간(거리) 가정**이 결합되어 만들어진 지도(map)다.  
> 따라서 모델 성능은 정확도(accuracy)가 아니라 **누구와의 합의(agreement)**인가로 이해해야 한다.

---

## 2. 문제의식: 우리는 너무 빨리 달리고 있다

저자들은 계산 텍스트 분석의 “spatial turn”을 다음과 같이 경고하며 시작한다.

> “The spatial turn in computational text analysis is inciting a sprightly interdisciplinary passion that seems, at times, to entail sprinting when we ought to mosey.”  
> (Stoltz, Combs, and Taylor 2025, 59)

임베딩·트랜스포머 모델은 빠르게 발전하고 있지만,  
그 기반이 되는 **공간 은유(spatial metaphor)**와 이론적 전제는 충분히 점검되지 않았다.

이 장은 세 가지 질문을 중심으로 전개된다.

1. **What is the Space?** — 의미를 ‘공간’으로 본다는 것은 무엇인가  
2. **What is the Objective?** — 목표함수는 무엇을 특권화하는가  
3. **What is the Corpus?** — 코퍼스 구성은 의미 공간을 어떻게 재구성하는가  

---

# 3. What Is the Space? — 의미는 채굴되는가, 구성되는가

## 3.1 Mining 은유 비판과 관계론적 전환

텍스트 분석은 흔히 “mining(채굴)”이라는 은유를 사용한다.  
이 은유는 단어를 신호와 잡음으로 나누고 의미를 추출 가능한 대상으로 본다.

하지만 저자들은 다음과 같이 말한다.

> “Mining is arguably the most common metaphor for text analysis… Mining, then, is a poorly suited metaphor for sociological text analysis.”  
> (Stoltz, Combs, and Taylor 2025, 60)

대신 이들은 **관계론(relationalism)**을 취한다.

> “Meaning spaces are fundamentally relational.”  
> (Stoltz, Combs, and Taylor 2025, 60)

### 핵심 전환

| 실체론적 관점 | 관계론적 관점 |
|--------------|--------------|
| 의미는 단어 내부에 존재 | 의미는 관계 속에서 발생 |
| 신호 vs 잡음 | 위상(topology) |
| 변수 접근 | 공간/그래프 접근 |

의미는 단어 안에 “들어 있는 것”이 아니라,  
**전체 공간 속 위치(position)**에서 형성된다.

---

## 3.2 거리와 연속성 — 연속 공간의 존재론

임베딩은 이산적 단어를 연속 공간에 배치한다.  
저자들은 이렇게 표현한다.

> “The space between elements is no less meaning-full.”  
> (Stoltz, Combs, and Taylor 2025, 61)

이는 기술적 선택이 아니라 존재론적 가정이다.

- 단어 = 점(point)  
- 의미 관계 = 거리(distance)  
- 코퍼스 = 하나의 연속적 위상(topology)  

이때 관측되지 않은 “사이” 또한 의미를 가진다.  
임베딩은 곧 **잠재 의미(latent meaning)**의 가정이다.

---

## 3.3 고차원 공간과 차원의 저주

임베딩 공간은 보통 100~768차원 이상이다.  
저자들은 “차원의 저주”를 경고한다.

> “Each new dimension increases the overall ‘volume’ of the space.”  
> (Stoltz, Combs, and Taylor 2025, 63)

차원이 증가하면:

- 공간의 부피는 커지고  
- 점들은 서로 멀어지며  
- 결국 상대적 차이가 희석될 수 있다  

또한 과도한 복잡성은 이론 형성을 방해한다.

> “Demands for more nuance actively inhibit the process of abstraction that good theory depends on.”  
> (Healy 인용, Stoltz, Combs, and Taylor 2025, 63)

### 정리

| 차원 증가의 효과 | 이론적 함의 |
|------------------|------------|
| 계산 복잡성 증가 | 재현성 저하 |
| 거리 균질화 | 의미 구별력 감소 |
| 뉘앙스 집착 | 추상화 저해 |

---

# 4. What Is the Objective? — 정확도인가, 합의인가

## 4.1 지도는 영토가 아니다

저자들은 Korzybski를 인용하며 이렇게 말한다.

> “A map is not the territory it represents.”  
> (Stoltz, Combs, and Taylor 2025, 64)

텍스트를 어떻게 지도화할 것인가는  
**목표함수(objective function)**에 의해 결정된다.

---

## 4.2 내부 목표 vs 외부 목표

텍스트 ML 알고리즘은 크게 두 범주로 나뉜다.

| 구분 | 예시 | 특권화되는 관점 |
|------|------|----------------|
| **내부 목표** | word2vec | 텍스트 생산자의 언어적 선택 |
| **외부 목표** | 로지스틱 회귀 | 분석가의 라벨링 규약 |

저자들은 날카롭게 묻는다.

> “Ground truth for whom?”  
> (Stoltz, Combs, and Taylor 2025, 66)

라벨은 “gold standard”처럼 보이지만,  
그 정답은 결국 **분석가의 정답**이다.

따라서 다음과 같이 제안한다.

> “We are better off speaking of agreement rather than accuracy.”  
> (Stoltz, Combs, and Taylor 2025, 66)

### 핵심 주장

모델은 진실을 발견하는 기계가 아니라,  
**특정 관점과의 합의를 생성하는 구조**다.

---

## 4.3 알고리즘보다 목표가 중요하다

GloVe, word2vec, transformer 기반 모델은  
결국 **점별 상호정보량(pointwise mutual information)**을 최적화한다.

> “Both methods are essentially trying to maximize… pointwise mutual information.”  
> (Stoltz, Combs, and Taylor 2025, 67)

따라서 대부분의 경우:

- 알고리즘 선택 < 목표 선택  
- 추정량 선택 < 변수 선택  

저자들의 질문은 명확하다.

> “What good is our map if we are mapping the wrong thing?”  
> (Stoltz, Combs, and Taylor 2025, 67)

---

# 5. What Is the Corpus? — 가장 중요한 질문

## 5.1 포함과 배제의 파급 효과

의미 공간은 관계적이기 때문에,  
포함과 배제의 모든 결정은 전체 공간에 영향을 미친다.

> “Each act of inclusion and exclusion in corpus construction ripples throughout the totality of that space.”  
> (Stoltz, Combs, and Taylor 2025, 60)

대표성은 표집, 기술적 조건, 조직적 맥락에 달려 있다.

> “Researchers… should acknowledge the inherent incompleteness of corpora.”  
> (Stoltz, Combs, and Taylor 2025, 68)

---

## 5.2 사전학습 모델과 헤게모니

Common Crawl과 같은 대규모 웹 코퍼스에 기반한 모델은  
대표성에 대한 검증되지 않은 가정을 내포한다.

> “Conclusions based on these models rest on unverified assumptions about representation and may reinforce hegemonic cultural understandings.”  
> (Stoltz, Combs, and Taylor 2025, 68)

또한,

> “All embedding models reflect the biases of their training corpora.”  
> (Stoltz, Combs, and Taylor 2025, 71)

임베딩은 중립적이지 않다.  
그것은 훈련 코퍼스의 세계관을 반영한다.

---

## 5.3 문서화와 제도적 책임

현재 ML 데이터셋과 모델에 대한 명확한 표준은 없다.

> “At present, there are no industry or disciplinary standards for documenting ML datasets and algorithms.”  
> (Stoltz, Combs, and Taylor 2025, 69)

저자들은 다음을 요구한다.

- Datasheets  
- Model cards  
- 코퍼스 공유  
- 제도적 인프라 구축  

---

# 6. 인식론적 결론

이 장의 가장 중요한 문장:

> “The machine does not ‘learn,’ and the AI does not ‘know’—we are the learners and knowers.”  
> (Stoltz, Combs, and Taylor 2025, 63)

이 논문은 기술을 부정하지 않는다.  
하지만 기술을 **과도하게 실재화하는 태도**를 비판한다.

임베딩은 자연적 구조가 아니라  
이론적 선택이 반영된 **설계된 공간**이다.

---

# 7. 비판적 논의

## 7.1 이 논문의 기여

1. 공간 은유의 철학적 전제 점검  
2. accuracy → agreement 전환 제안  
3. 알고리즘보다 목표·코퍼스의 중요성 강조  
4. 문서화의 제도적 필요성 제시  

---

## 7.2 확장 가능성

- LLM의 생성적 능력은 PMI 설명으로 충분한가?  
- “합의”를 실증적으로 어떻게 측정할 수 있는가?  
- 관계론적 의미론은 다중 해석 공동체를 어떻게 반영하는가?

---

# 8. 개인적 느낀점

이 논문은 묻는다.

- 우리는 무엇을 지도화하고 있는가?  
- 누구의 세계관이 공간에 반영되는가?  
- 이 모델은 누구와 합의하는가?  

결국 연구의 질은 모델의 복잡성보다  
**코퍼스를 얼마나 신중하게 구축하고 문서화했는가**에 달려 있다.

기술은 도구다.  
지도는 영토가 아니다.  
그리고 의미 공간은 자연물이 아니라,  
**이론적 선택이 빚어낸 설계물**이다.

---

# Reference

Stoltz, Dustin S., Marissa A. Combs, and Marshall A. Taylor. 2025.  
“Corpus Modeling and the Geometries of Text Meaning Spaces as Metaphor and Method.”  
In *The Oxford Handbook of the Sociology of Machine Learning*. Oxford: Oxford University Press.