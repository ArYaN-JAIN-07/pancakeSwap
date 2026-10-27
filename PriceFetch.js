import { ethers } from 'ethers';

import { factoryAddress , routerAddress , fromAddress , toAddress } from './AddressList.js';
import { erc20ABI , factoryABI , pairABI , routerABI } from './AbiInfo.js';

const provider = new ethers.providers.JsonRpcProvider (
    "https://bsc-dataseed1.binance.org/"
)

const factoryInstance = new ethers.Contract(
        factoryAddress , factoryABI , provider
)


const routerInstance = new ethers.Contract(
    routerAddress , routerABI , provider
)


const priceFetch = async(humanFormat) => {
    const token1 =  new ethers.Contract(
        fromAddress, erc20ABI , provider
)
    const token2 =  new ethers.Contract(
        toAddress , erc20ABI, provider
)

    const decimal1 = await token1.decimals()
    const decimal2 = await token2.decimals();
    // console.log(decimal1);
    const amountIn = ethers.utils.parseUnits(humanFormat, decimal1).toString();

    const amountOut = await routerInstance.getAmountsOut(amountIn, [
    fromAddress,
    toAddress
]);

    const humanOutput = ethers.utils.formatUnits(
        amountOut[1],
        decimal2
    )

    console.log(humanOutput);
}


// priceFetch();

const humanFormat = "100";
priceFetch(humanFormat)
