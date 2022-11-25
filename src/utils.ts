export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const toMoney = (mineral: number) => `${mineral / 10000 * 3.3458856345885635}元`

