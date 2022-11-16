import {sleep} from './utils';
import {random} from 'lodash';
import {message} from "./message";
import {instanceAxios} from './axios';
// import {getCookieParams} from "./utils";

export const bugFix = async () => {
    // const {aid, uuid} = getCookieParams();
    // const {competition_id} = await axios.post("/user_api/v1/bugfix/competition", {});
    // await axios.post("/user_api/v1/bugfix/user", {competition_id});
    const notCollect = await instanceAxios.post("/user_api/v1/bugfix/not_collect", {});
    for (let i = 0; i < notCollect.length; i++) {
        const {bug_type, bug_time} = notCollect[i];
        await instanceAxios.post("/user_api/v1/bugfix/collect", {bug_type, bug_time});
        await sleep(random(500, 1000))
    }
    message.push(`🐛【BugFix】收集了${notCollect.length}个bug`);
}