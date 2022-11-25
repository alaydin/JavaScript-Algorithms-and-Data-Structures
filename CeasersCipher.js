const NumAlpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = NumAlpha.map((e) => String.fromCharCode(e))

const SHIFT = 13;

function rot13(str) {
    str = str.toUpperCase();
    let newStr = "";
    for (let c in str) {
        let index = alphabet.indexOf(str[c]);
        if (index != -1) {
            index = index + SHIFT;
            index = index % alphabet.length;
            newStr = newStr + String(alphabet[index]);
        } else {
            newStr += str[c];
        }
    }
    return newStr
}

console.log(rot13("SERR PBQR PNZC"));