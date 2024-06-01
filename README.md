# AASC-MiDeo/server


## 실행 
  1. Node.js 설치
    - https://nodejs.org/en //node.js 설치
  2. 초기화 : `$ npm install`
  3. 실행명령어 -> `$ nodemon server.js`


## 변경사항
  1. checkWarnings 모듈 수정 
  2. server.js 에서 유효성 검사 후 경고 메시지 생성 모듈 호출
  3. nodemon 설치 해놨으니까 `$ nodemon server.js` 로 실행해주세요
     - nodemon 으로 실행 시에 파일 수정하면 재시작할 필요 없이 즉각 변동
  4. HTTP post 테스팅용 파일 작성 
    - testing.js
  5. node_modules 폴더 전체가 올라가지 않도록 .gitignore 작성해놨음
    - `$ git add * `


## 이후 백에서 진행해야할 Task 정리
  1. FCM :: 플러터 푸시 알림 가는지 확인
     - firebase 프로젝트 만들어 놓음
     - 액세스 권한 수리 해야함
  2. 이미지 API
     - 받아와서 firebase storage에 저장


*2024-05-30*
