# Machine Learning 개요  


머신러닝(machine learning)은 **명시적인 규칙을 일일이 프로그래밍하지 않아도**,  
데이터로부터 **패턴과 관계를 학습하여 예측이나 의사결정을 수행하는 인공지능의 한 분야**이다.  
데이터가 축적될수록 모델의 성능이 향상된다는 점에서 전통적인 프로그래밍 방식과 구별된다.




---

## 1. 머신러닝이란 무엇인가?

머신러닝의 핵심은 다음과 같다.

- 데이터로부터 **패턴, 추세, 관계**를 자동으로 학습
- 새로운 데이터에 대해 **예측(prediction)** 또는 **결정(decision)** 수행
- 경험(데이터)이 쌓일수록 성능이 개선됨

### 대표적인 활용 사례
- **추천 시스템**: Netflix, Amazon의 영화·상품 추천
- **회귀 문제**: 주택 가격 예측 (면적, 위치 등 활용)
- **금융 분야**: 실시간 사기 거래 탐지

머신러닝 기법은 단순한 **선형회귀(linear regression)**부터  
**딥러닝(deep neural networks)**과 같은 복잡한 모델까지 매우 다양하다.

---

## 2. 머신러닝과 고전적 통계 분석의 관계

### Relationship between Machine Learning and Classic Statistical Analysis

머신러닝과 고전 통계학은 모두 **데이터 기반 분석**이라는 공통점을 갖지만,  
**목표와 접근 방식**에는 차이가 있다.

### 고전적 통계 분석 (Classical Statistics)
- **목표**: 추론(inference)
- 변수 간 관계 이해, 가설 검정
- 엄격한 가정 필요
  - 선형성, 정규성, 등분산성 등
- 예: t-test, ANOVA, 회귀분석

### 머신러닝 (Machine Learning)
- **목표**: 예측 정확도(prediction accuracy)
- 새로운 데이터에 대한 일반화 성능 중시
- 비선형 관계, 변수 간 상호작용 허용
- 가정이 비교적 자유로움


But, prediction and flexibility in machine learning versus inference and interpretability in classical statistics - they are deeply connected.


*머신러닝에서 다중공선성이 문제가 될까? 머신러닝은 상관없다. 고전통계학에서는 큰 문제였던        다중공선성이!!(multicolli는 머신러닝에서 문제가 되지 않는다*

### 핵심 차이 요약

| 구분 | 고전 통계 | 머신러닝 |
|----|----|----|
| 초점 | 추론, 해석 | 예측, 성능 |
| 가정 | 엄격함 | 비교적 자유 |
| 평가 | 신뢰구간, 유의성 | 정확도, 오류 |
| 데이터 사용 | 전체 데이터 | 학습/검증 분리 |
| 용어 | 독립/종속 변수 | Feature / Label |

👉 **머신러닝은 통계학 위에서 발전한 분야**이며,  
로지스틱 회귀, SVM 등은 통계 모델의 확장으로 볼 수 있다.

 
**Consider confidence intervals when estimating populations VS Consider model accuracy onl**

독립변수 - feature, input, predictor 

종속변수 - outcome variable, label, target variable

---

## 3. 머신러닝의 유형: 지도학습 vs 비지도학습


![머신러닝1_2](img/머신러닝1_2.jpg)


### 1) 지도학습 (Supervised Learning)

- **라벨이 있는 데이터** 사용
- 입력 → 출력의 매핑 학습
- 목표: 새로운 데이터에 대한 예측

**대표 알고리즘**
- Linear Regression
- Logistic Regression
- Decision Tree
- KNN, SVM

**활용 예**
- 콘텐츠 추천
- 광고 타겟팅
- 감성 분석(sentiment analysis)

---

### 2) 비지도학습 (Unsupervised Learning)

- **라벨이 없는 데이터** 사용
- 데이터 내부 구조 탐색

**대표 알고리즘**
- K-means Clustering
- Hierarchical Clustering
- PCA

**활용 예**
- 고객·시청자 군집화
- 콘텐츠 자동 분류

지도학습: x와 y를 다 준다.(입력 x와 정답 y를 모두 준다)
비지도학습: x만 주고 y(input에 대응되는 output)는 주지 않는다. 

비지도학습은 x만있고(입력 특징들) y가 없다(정답)

---

## 4. 머신러닝의 주요 목표

머신러닝은 크게 다음 세 가지 목표를 가진다.

### 1) 예측 (Prediction)
- 연속형 값 예측
- 예: 조회 수, 클릭 수, 가격 예측
- 지도학습

### 2) 분류 (Classification)
- 범주형 결과 예측
- 예: 긍정/부정 감성 분류, 이탈 여부 예측
- 지도학습

### 3) 군집화 (Clustering)
- 데이터 내 자연스러운 그룹 발견
- 예: 시청자 유형 분류, 콘텐츠 묶음
- 비지도학습


- prediction(지도학습) - 유튜브 콘텐츠 추천, 광고 마케팅
    Prediction involves forecasting a continuous variable based on input data. For 
    example, prediction plays a crucial role in content recommendation systems, such as 
    those used by Netflix and YouTube. These platforms predict which articles or videos 
    a user is likely to engage with based on their past behavior, such as viewing history 
    and interaction patterns


- classification(지도학습) - 감정분석


- clustering(비지도학습) - 스트리밍 서비스 군집화 , 미디어 콘텐츠 군집화
---

## 5. 머신러닝 프로세스

![머신러닝1_1](img/머신러닝1_1.jpg)


머신러닝 프로젝트는 다음과 같은 단계로 진행된다.

### 1) 데이터 준비 (Data Preparation)
- 결측치 처리, 중복 제거
- 정규화·표준화
- 범주형 변수 인코딩
- 특징 공학(feature engineering)

---

### 2) 데이터 분할 (Train / Test Split)
- 학습 데이터: 모델 학습
- 테스트 데이터: 일반화 성능 평가
- 일반적으로 **70~80% / 20~30%** 분할

👉 과적합(overfitting) 여부 판단에 필수
    너의 모델은 너에 데이터에만 fit할 수 있다. 근데 내 목표는 미래를 보다 더 잘 예측하는 것이기 때문에
    우리는 모델을 만들고 이것은 우리가 쓴 데이터에 fit할 것이다. 근데 미래 특징도 잘 설명해야 한다.

    즉, 테스트 데이터뿐 아니라 트레이닝 데이터에도 우리 모델이 잘 수행해야 한다.  겱국 우리는 미래 데이터에도 잘 수행해야 하니까.     
---

### 3) 알고리즘 선택
- 문제 유형에 따라 선택
  - 회귀 / 분류 / 군집
- 해석 가능성, 계산 비용, 데이터 구조 고려

---

### 4) 모델 학습 (Training)
- 학습 데이터로 모델 파라미터 추정
- 예측 오류 최소화 방향으로 학습

---

### 5) 모델 평가 (Evaluation)
- **테스트 데이터**로 성능 평가
- 과적합 / 과소적합 확인
- Because the test data was not used during training, it reflects how the model will behave in real applications.


**대표 평가 지표**
- 분류: Accuracy, Precision, Recall, F1, ROC/AUC
- 회귀: MSE, MAE 등

---

### 6) 모델 적용 및 업데이트
- 실제 서비스에 적용
- 새로운 데이터로 재학습 가능
- 지속적인 성능 유지 및 개선


![머신러닝1_3](img/머신러닝1_3.jpg)
---

## 6. Summary

- 머신러닝은 **데이터로부터 학습하는 알고리즘**
- 고전 통계는 **해석**, 머신러닝은 **예측**에 초점
- 지도학습과 비지도학습은 목적과 데이터 구조가 다름
- 핵심은 **일반화 성능과 평가**

---

📌 **한 줄 요약**  
> 머신러닝은 통계적 기반 위에서,  
> 예측과 확장성을 중심으로 발전한 데이터 기반 의사결정 도구이다.

