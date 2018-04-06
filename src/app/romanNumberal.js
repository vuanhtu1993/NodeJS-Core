function convertToRoman(num) {
    if (!+num)
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;

    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("")+1).join("M") + roman;
}

const whatIsInAName = (collection, source) => {
    const srKeys = Object.keys(source);

    return collection.filter( e =>
        srKeys.map( key => (e.hasOwnProperty(key) && (e[key] === source[key])) )
            .reduce((acc, cur) => acc && cur) );
};
console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));
module.exports = {
    convertToRoman,
    whatIsInAName,
};