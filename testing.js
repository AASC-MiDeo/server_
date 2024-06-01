const axios = require('axios');

const testData = {
  helmet: 0,
  temperature: 38,
  sound: 50,
  gas: 7000
};

axios.post('http://localhost:3000/', testData)
  .then(response => {
    //console.log(response.data);
    console.log('완료');
  })
  .catch(error => {
    console.error(error);
  });
