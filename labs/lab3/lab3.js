export class lab3 {
    testDefaultParameters(a, b = 100) {
        return { "first": a, "second": b };
    }

    testTemplateLiterals(firstName, middleName, lastName) {
        return `${firstName}, ${middleName}, ${lastName}`;
    }

    testMultilineStrings() {
        return `This is a test multiline string.
        Here is the second line.
        Here's the third.
        Four lines!`;
    }

    testSortWithArrowFunction(array) {
        return array.sort((a, b) => b - a);
    }


}