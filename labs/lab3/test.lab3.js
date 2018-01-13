import {lab3} from './lab3';

let testInstance = new lab3();

console.log('testDefaultParameters(50) (should print 50/100)');
let defaultParamsResult = testInstance.testDefaultParameters(50);
console.log(defaultParamsResult.first);
console.log(defaultParamsResult.second);

console.log('testDefaultParameters(50,75) (should print 50/75)');
defaultParamsResult = testInstance.testDefaultParameters(50, 75);
console.log(defaultParamsResult.first);
console.log(defaultParamsResult.second);

console.log("testTemplateLiterals('Jane', 'Johnson', 'Doe') (should print Jane, Johnson, Doe)");
console.log(testInstance.testTemplateLiterals('Jane', 'Johnson', 'Doe'));

console.log('testMultilineStrings() (should print a string at least 4 lines long)');
console.log(testInstance.testMultilineStrings());

console.log('testSortWithArrowFunction([1, 2, 3]) (should print [3, 2, 1])');
console.log(testInstance.testSortWithArrowFunction([1, 2, 3]));
