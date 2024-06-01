const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; //3000번 사용

const admin = require('firebase-admin');
const serviceAccount = require('./aasc-mideo-firebase-adminsdk-1hkif-155f22fce3.json');
let registrationTokens;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const validateInputs = require('./validators'); //데이터 입력값 유효성 검사 인자 ->(helmet, temperature, sound, gas)
const checkWarnings = require('./warnings'); //입력 받은 데이터 값이 안전 기준 내에 있는지를 검사한 후 초과하면 경고 출력

// JSON 요청 본문을 파싱
app.use(bodyParser.json());

// POST 요청 처리
app.post('/', (req, res) => {
  const { helmet, temperature, sound, gas } = req.body;

  console.log('Helmet:', helmet);
  console.log('Temperature:', temperature);
  console.log('Sound:', sound);
  console.log('Gas:', gas);

  if(validateInputs(helmet, temperature, sound, gas)) { //유효성 검사 이후
    let [errNum, warnings] = checkWarnings(helmet, temperature, sound, gas); //경고 메시지 생성
    if(errNum.length === 0) console.log('이상 X');
  }
  
  // HW단으로 응답
  res.send('to HW : Data received successfully');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// 클라이언트로부터 FCM 등록 토큰을 받기 위한 POST 요청 처리
app.post('/register', async (req, res) => {
  registrationTokens = req.body.token; // 클라이언트로부터 받은 토큰
  console.log('Received FCM Token:', registrationTokens);

  // 이곳에서 받은 토큰을 데이터베이스에 저장하거나, 바로 푸시 알림을 보낼 수 있습니다.
  // 성공적으로 토큰을 받았다는 응답을 클라이언트에게 보냅니다.
  res.status(200).send('Token registered successfully');
});
