let add = (a, b) => {
    return a + b;
};
let square = (a, b) => {
    let result = 1;
    for (let i = 0; i < b; i++) {
        result = result * a;
    }
    return result;
};
let setName = (user, fullName) => {
  let name = fullName.split(' ');
  user.firstName = name[0];
  user.lastName = name[1];
};
console.log(square(2, 3));
module.exports = {
    add,
    square,
    setName
};