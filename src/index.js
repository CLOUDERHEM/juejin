const axios = require('axios');

axios.defaults.headers.common['content-type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';
axios.defaults.headers.common['accept-encoding'] = 'gzip, deflate, br';
axios.defaults.headers.common['accept-language'] = 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7';
axios.defaults.headers.common['sec-ch-ua'] = '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"';
axios.defaults.headers.common['sec-ch-ua-mobile'] = '?0';
axios.defaults.headers.common['referer'] = 'https://juejin.cn/';
axios.defaults.headers.common['accept'] = '*/*';
axios.defaults.headers.common['accept'] = '*/*';
axios.defaults.headers.common['cookie'] = process.env.COOKIE;



axios.post('https://api.juejin.cn/growth_api/v1/check_in', {}, {
    headers: {
        "content-type": "application/json",
        "cookie": process.env.COOKIE,
    }
}).then((res) => console.log(res));
