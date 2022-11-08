console.log(process.env.COOKIE)
const axios = require('axios');

const cookie = "_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227137577210785367593%2522%252C%2522web_id%2522%253A%25227137577210785367593%2522%252C%2522timestamp%2522%253A1662379457989%257D; _ga=GA1.2.1462673365.1663228605; MONITOR_WEB_ID=4271e7f1-b443-40c0-9a1c-6a6e40ee3105; passport_csrf_token=468766e85c6ec1919584dd3ca1f37186; passport_csrf_token_default=468766e85c6ec1919584dd3ca1f37186; _tea_utm_cache_2018=undefined; n_mh=rZbLvuXyRyiN7VCxvrqeeK_L419A7HUwPpGO0twgduE; passport_auth_status=81d9d23f508a4f11d558b33485d1b082%2C; passport_auth_status_ss=81d9d23f508a4f11d558b33485d1b082%2C; sid_guard=0bf5921da3f95d14327972dd526dcaa3%7C1667790292%7C31536000%7CTue%2C+07-Nov-2023+03%3A04%3A52+GMT; uid_tt=987f8617af5be8402e0819bf2e2df18e; uid_tt_ss=987f8617af5be8402e0819bf2e2df18e; sid_tt=0bf5921da3f95d14327972dd526dcaa3; sessionid=0bf5921da3f95d14327972dd526dcaa3; sessionid_ss=0bf5921da3f95d14327972dd526dcaa3; sid_ucp_v1=1.0.0-KDA5NzM4NDNkYzc5OGI4YWU3ODA2MTQ1NDlhMTI1OTExNzA4ODNiODIKFwjd-fDA_fXFARDU66GbBhiwFDgCQPEHGgJsZiIgMGJmNTkyMWRhM2Y5NWQxNDMyNzk3MmRkNTI2ZGNhYTM; ssid_ucp_v1=1.0.0-KDA5NzM4NDNkYzc5OGI4YWU3ODA2MTQ1NDlhMTI1OTExNzA4ODNiODIKFwjd-fDA_fXFARDU66GbBhiwFDgCQPEHGgJsZiIgMGJmNTkyMWRhM2Y5NWQxNDMyNzk3MmRkNTI2ZGNhYTM; _gid=GA1.2.1633988174.1667887065";

console.log(cookie)

axios.post('https://api.juejin.cn/growth_api/v1/check_in',{}, {
  headers: {
    "content-type": "application/json",
    "cookie": cookie,
  }
}).then((res) => console.log(res));
