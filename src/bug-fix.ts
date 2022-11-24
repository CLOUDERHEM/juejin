/**
 *  BugFix
 */
import {sleep} from './utils';
import {random} from 'lodash';
import {message} from "./message";
import * as service from './services';

export const bugFix = async () => {
    const notCollect = await service.notCollectBug({});
    for (let i = 0; i < notCollect.length; i++) {
        const {bug_type, bug_time} = notCollect[i];
        await service.collectBug({bug_type, bug_time});
        await sleep(random(500, 1000))
    }
    message.info(`🐛【BugFix】收集了${notCollect.length}个bug`);
}