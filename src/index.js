const axios = require('axios');
const get_mineral = require('./get-mineral');
const sign_in = require('./sign-in');
const luck_draw = require('./luck-draw');
const dip_lucky = require('./dip-lucky');

axios.defaults.headers.common['content-type'] = 'application/json; charset=utf-8';
axios.defaults.headers.common['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';
axios.defaults.headers.common['accept-encoding'] = 'gzip, deflate, br';
axios.defaults.headers.common['accept-language'] = 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7';
axios.defaults.headers.common['sec-ch-ua'] = '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"';
axios.defaults.headers.common['sec-ch-ua-mobile'] = '?0';
axios.defaults.headers.common['referer'] = 'https://juejin.cn/';
axios.defaults.headers.common['accept'] = '*/*';
axios.defaults.headers.common['accept'] = '*/*';
axios.defaults.headers.common['cookie'] = process.env.COOKIE ?? "_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%7B%22user_unique_id%22%3A%227137577210785367593%22%2C%22web_id%22%3A%227137577210785367593%22%2C%22timestamp%22%3A1662379457989%7D; _ga=GA1.2.1462673365.1663228605; MONITOR_WEB_ID=4271e7f1-b443-40c0-9a1c-6a6e40ee3105; passport_csrf_token=468766e85c6ec1919584dd3ca1f37186; passport_csrf_token_default=468766e85c6ec1919584dd3ca1f37186; _tea_utm_cache_2018=undefined; n_mh=rZbLvuXyRyiN7VCxvrqeeK_L419A7HUwPpGO0twgduE; passport_auth_status=81d9d23f508a4f11d558b33485d1b082,; passport_auth_status_ss=81d9d23f508a4f11d558b33485d1b082,; sid_guard=0bf5921da3f95d14327972dd526dcaa3|1667790292|31536000|Tue,+07-Nov-2023+03:04:52+GMT; uid_tt=987f8617af5be8402e0819bf2e2df18e; uid_tt_ss=987f8617af5be8402e0819bf2e2df18e; sid_tt=0bf5921da3f95d14327972dd526dcaa3; sessionid=0bf5921da3f95d14327972dd526dcaa3; sessionid_ss=0bf5921da3f95d14327972dd526dcaa3; sid_ucp_v1=1.0.0-KDA5NzM4NDNkYzc5OGI4YWU3ODA2MTQ1NDlhMTI1OTExNzA4ODNiODIKFwjd-fDA_fXFARDU66GbBhiwFDgCQPEHGgJsZiIgMGJmNTkyMWRhM2Y5NWQxNDMyNzk3MmRkNTI2ZGNhYTM; ssid_ucp_v1=1.0.0-KDA5NzM4NDNkYzc5OGI4YWU3ODA2MTQ1NDlhMTI1OTExNzA4ODNiODIKFwjd-fDA_fXFARDU66GbBhiwFDgCQPEHGgJsZiIgMGJmNTkyMWRhM2Y5NWQxNDMyNzk3MmRkNTI2ZGNhYTM; _gid=GA1.2.1633988174.1667887065";

(async () => {
    //查询当前矿石数
    await get_mineral();
    sign_in();
    luck_draw();
    dip_lucky();
})()

