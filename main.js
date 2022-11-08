const axios = require('axios');

axios.post('https://api.juejin.cn/growth_api/v1/check_in',{}, {
  headers: {
    "content-type": "application/json",
    "cookie": process.env.COOKIE,
  }
}).then((res) => console.log(res));
