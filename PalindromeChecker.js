function clearStr(str) {
    let newStr = "";
    for (let c = 0; c < str.length; c++) {
        if ((str.charCodeAt(c) >= 97 && str.charCodeAt(c) <= 122) || (str.charCodeAt(c) >= 48 && str.charCodeAt(c) <= 57)) {
            newStr += str[c];
        }
    }
    return newStr;
}

function palindrome(str) {
    // to lower case
    let resultStr = str.toLowerCase()

    //removing non-alphanumerics
    resultStr = clearStr(resultStr);

    let start = 0;
    let end = resultStr.length - 1;
    while (start < end) {
        if (resultStr[start] != resultStr[end]) {
            return false
        }
        start++;
        end--;
    }
    return true
}

console.log(palindrome("nope"));