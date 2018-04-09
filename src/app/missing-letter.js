String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

function fearNotLetter(str) {
    for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i);
        if (code !== str.charCodeAt(0) + i) {
            str = str.insert(i, String.fromCharCode(code - 1));
            return str;
        }
    }
    return undefined
}


console.log(fearNotLetter('abde'));