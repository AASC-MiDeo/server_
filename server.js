const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; //3000번 사용

const admin = require('firebase-admin');
const serviceAccount = require('./aasc-mideo-d8cd478d2c48.json');
let registrationTokens = '';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const validateInputs = require('./validators'); //데이터 입력값 유효성 검사 인자 ->(helmet, temperature, sound, gas)
const checkWarnings = require('./warnings'); //입력 받은 데이터 값이 안전 기준 내에 있는지를 검사한 후 초과하면 경고 출력

// JSON 요청 본문을 파싱
app.use(bodyParser.json());

// POST 요청 처리
app.post('/', async (req, res) => {
  const { helmet, temperature, sound, gas } = req.body;
  console.log(req.body);

  if(validateInputs(helmet, temperature, sound, gas)) { //유효성 검사 이후
    let [errNum, warnings] = checkWarnings(helmet, temperature, sound, gas); //경고 메시지 생성
    if(errNum.length === 0) console.log('이상 X'); 

    //플러터로 보낼 payload
    
    const payload = {
      data: {
        helmet: `${helmet}`,
        Temperature: `${temperature}`,
        Sound: `${sound}`,
        Gas: `${gas}`, 
      },
      warnings : {
        errNum : `${errNum}`,
        warnings : `${warnings}`
      }
    };
    
    console.log(payload);
    admin.messaging().sendToDevice(registrationTokens, payload)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
    });
  }

    // HW단으로 응답
  res.send('to HW : Data received successfully');
});


app.post('/register', async (req, res) => {
  const token = req.body.token;
  if (!registrationTokens.includes(token)) {
    registrationTokens = token;
  }
  console.log('Received FCM Token:', registrationTokens);

  res.status(200).send('Token registered successfully');
});

// 서버 시작
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});