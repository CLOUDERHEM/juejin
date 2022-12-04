import BigNumber from "bignumber.js";

export const toMoneyUnit = (mineral: number) => `${new BigNumber(mineral).div(10000).times(3.3458856345885635).toFixed(3)}元`

