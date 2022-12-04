/**
 *  BugFix
 */
import random from 'lodash/random';
import {message} from "./message";
import {sleep} from '@hudiemon/utils'
import * as service from './services';

export const bugFix = async () => {
    const {data: {notCollect}} = await service.notCollectBug({});
    for (let i = 0; i < notCollect.length; i++) {
        const {bug_type, bug_time} = notCollect[i];
        await service.collectBug({bug_type, bug_time});
        await sleep(500, 1000)
    }
    message.info(`🐛【BugFix】收集了${notCollect.length}个bug`);
}