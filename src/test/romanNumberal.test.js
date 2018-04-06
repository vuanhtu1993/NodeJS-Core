const testCase = require('../app/romanNumberal');


describe('Convert to Roman number',() => {
   test('run test return XII', () => {
       expect(testCase.convertToRoman(12)).toBe('XII');
   });
   test('run test return DCCCXCI', () => {
       expect(testCase.convertToRoman(891)).toBe('DCCCXCI');
   });
   test('run test return MIV', () => {
       expect(testCase.convertToRoman(1004)).toBe('MIV');
   });
   test('run test return MXXIII', () => {
       expect(testCase.convertToRoman(1023)).toBe('MXXIII');
   });
   test('run test return MMXIV', () => {
       expect(testCase.convertToRoman(2014)).toBe('MMXIV');
   });
   test('run test return MMMCMXCIX', () => {
       expect(testCase.convertToRoman(3999)).toBe('MMMCMXCIX');
   });
});

describe('What is an name', () => {
   test('test 1', () => {
       expect(testCase.whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }))
           .toEqual([{ first: "Tybalt", last: "Capulet" }]);
   });
   test('test 2', () => {
       expect(testCase.whatIsInAName([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "c": 2 }))
           .toEqual([{ "a": 1, "b": 2, "c": 2 }]);
   });
   test('test 3', () => {
       expect(testCase.whatIsInAName([{ "a": 1, "b": 3, "c": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "c": 2 }))
           .toEqual([{ "a": 1, "b": 3, "c": 2 }, { "a": 1, "b": 2, "c": 2 }]);
   });
});