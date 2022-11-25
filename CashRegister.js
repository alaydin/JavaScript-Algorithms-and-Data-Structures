const CURRENCY_UNIT = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
}

//Finds the change value in currency units
function findUnits(cidArr, num, unitObj, changeArr) {
    // Copying global value to prevent mutating
    let copyObj = { ...unitObj };

    cidArr.reduceRight((acc, curr, i, arr) => { // Looping the array from the end
        let sum = 0;
        // Finding the first currency unit value that is smaller than change value (num)
        // Making sure that CID has valid amount of currency unit (curr[1] >= copyObj[curr[0]])
        if (num % copyObj[curr[0]] != num && curr[1] >= copyObj[curr[0]]) {
            // Basically, doing the same thing above in the if statement with Math.round to prevent JS precision issues
            // Iterating until currency unit value is bigger than exchange value
            // Consider the whole block as making payment one by one for each currency unit
            while (Math.round(num % copyObj[curr[0]] * 100) / 100 != num && curr[1] >= copyObj[curr[0]]) {
                num = num - copyObj[curr[0]];   // Getting the remaining change value after payment
                num = Math.round(num * 100) / 100;
                curr[1] -= copyObj[curr[0]];    // Reducing CID value for the specific currency unit
                curr[1] = Math.round(curr[1] * 100) / 100;
                sum += copyObj[curr[0]];        // Counting each payment of specific unit
                sum = Math.round(sum * 100) / 100;
            }
            changeArr.push([curr[0], sum]); // Pushing currency unit name and total payment in that unit
        }
    })

    return [cidArr, num, changeArr];
}

function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    let obj = {
        status: undefined,
        change: undefined
    }
    let cidCopy = [...cid];
    let changeInCoins = [];
    let balanceRemains = 0.00;

    // Finding change value in currency units and destructuring return values
    [cidCopy, change, changeInCoins] = findUnits(cidCopy, change, CURRENCY_UNIT, changeInCoins);
    change = Number(Number(change).toPrecision(100).substring(0, 4));
 
    // Finding the remainder balance of CID to reach the results
    balanceRemains = cidCopy.reduce((sum, unit) => sum + unit[1], 0);
    balanceRemains = Number(balanceRemains.toPrecision(100).substring(0, 4));
    if (change > 0) {
        obj.status = "INSUFFICIENT_FUNDS";
        obj.change = [];
        return obj;
    } else if (change == 0 && balanceRemains > 0) {
        obj.status = "OPEN";
        obj.change = changeInCoins;
        return obj;
    } else if (change == 0 && balanceRemains == 0) {
        obj.status = "CLOSED";
        obj.change = changeInCoins.concat(cid.filter((e) => !changeInCoins.reduce((e)=>e[0]).includes(e[0])));
        return obj;
    }

}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));