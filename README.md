# Full Stack PROJECT 
## [Nextjs, AWS, EC2, Cognito, Shadcn, RDS, S3, Node, React]

![image](https://github.com/user-attachments/assets/70ee3017-20af-420b-91c6-0c658b20ab08)

### 4월9일 시작
랜딩페이지, 버튼 기능, 검색 기능 추가</br>
에러 : tailwind css 설정 문제, 버전 호환, content 경로 설정 문제</br>
해결 : mjs -> js, tailwind css 버전 다운그레이드, 경로 설정 변경</br>

### 4월10일.
NEXT.JS 캐싱 문제</br>

### 4월11일
TypeScript 설정의 이해와 중요성</br>
TS 백엔드 package.json 설정</br>
prisma 활용</br>

### 4월12일
![image](https://github.com/user-attachments/assets/8c468005-d22f-497a-8869-5d0a03bd043d)
![image](https://github.com/user-attachments/assets/0e20122e-bcf9-4ba1-a1a6-a9878340a805)</br>
AWS cognito</br>
amplify 인증 설정</br>
인증 흐름 최적화하기</br>

### 4월 13일 ~ 15일
- AWS cognito 인증 구현 학습 및 적용하기

### 4월 18

Settings 페이지 UI가 표시되지 않는 문제 해결

#### 문제 상황
- 대시보드에서 Settings 페이지로 이동 시 UI가 완전히 표시되지 않음
- API 요청은 성공적으로 이루어졌으나 화면이 비어있음
- 서버는 정상 작동하고 로그인도 정상적으로 되는 상태였음

#### 원인 분석
- 데이터 구조 불일치
- API에서 반환하는 사용자 데이터 구조와 컴포넌트에서 기대하는 데이터 구조가 달랐음
- 중첩된 객체 구조(cognitoInfo, userInfo)에 대한 접근 방식이 잘못됨
- Null 체크 로직 문제
- 사용자 정보가 없는 경우에 대한 처리가 너무 엄격했음
- 부분적인 데이터만 있는 경우에도 UI가 완전히 차단됨
- 기본값 처리 부재
- 일부 데이터가 없는 경우에 대한 대체값(fallback) 처리가 되어있지 않았음

#### 해결 방법
- 안전한 데이터 접근
- 옵셔널 체이닝을 사용하여 중첩된 객체 안전하게 접근
- 각 필드에 대한 기본값 설정으로 undefined 방지
- 유연한 상태 처리
- 전체 사용자 데이터가 없는 경우만 UI 블록
- 부분적인 데이터는 허용하고 기본값으로 대체

#### 교훈
- 중첩된 객체 구조를 다룰 때는 항상 안전한 접근 방식을 사용해야 합니다.
- API 응답 데이터 구조와 프론트엔드 컴포넌트 간의 일관성 확인이 중요합니다.
- 부분적인 데이터로도 UI가 작동할 수 있도록 유연한 설계가 필요합니다.
- 적절한 기본값 설정으로 사용자 경험 개선 가능합니다.
- 이러한 해결 과정을 통해 더 안정적이고 사용자 친화적인 설정 페이지를 구현할 수 있었습니다.