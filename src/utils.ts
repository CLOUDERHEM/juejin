import {entries} from "lodash";

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const getCookieParam = () => {
    const cookieJSON = process.env.COOKIE?.split("; ")
        .map(string => string.split("="))
        .reduce((result: any, [key, value]) => {
            result[key] = value;
            return result
        }, {});
    const reg = /^__tea_cookie_tokens_(\d+)$/;
    const result = {
        aid: "",
        uuid: "",
        user_unique_id: "",
        web_id: ""
    };
    for (const [key, value] of (entries(cookieJSON) as any)) {
        if (reg.test(key)) {
            result.aid = key.match(reg)[1];
            const json = JSON.parse(decodeURIComponent(decodeURIComponent(value)));
            result.uuid = json.user_unique_id;
            result.user_unique_id = json.user_unique_id;
            result.web_id = json.web_id;
            break;
        }
    }
    return result
}