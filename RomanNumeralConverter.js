const romanNumerals = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
}

function convertToRoman(num) {
    const arr = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    let indexes = {};
    if (num >= 1000) {
        indexes[arr[arr.length - 1]] = Math.floor(num / 1000)
        num = num % 1000;
    }
    while(num != 0) {
        for (let j = 0; j < arr.length; j++) {
            if (num % arr[j] == num) {
                indexes[arr[j - 1]] = Math.floor(num / arr[j - 1]);
                num = num % arr[j-1];
                break;
            }
        }
    }
    let resStr = "";
    for (let e in indexes) {
        for (let i = 0; i < indexes[e]; i++) {
            resStr = romanNumerals[e] + resStr;
        }
    }
    return resStr;
}
convertToRoman(36);