/**
 *  BugFix
 */
import {message} from "./message";
import {sleep} from '@hudiemon/utils'
import {notCollectBug,collectBug} from './services';

export const bugFix = async () => {
    const {data} = await notCollectBug({});
    for (let i = 0; i < data.length; i++) {
        const {bug_type, bug_time} = data[i];
        await collectBug({bug_type, bug_time});
        await sleep(500, 1000)
    }
    message.info(`🐛【BugFix】收集了${data.length}个bug`);
}