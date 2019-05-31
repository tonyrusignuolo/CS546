const questionOne = function questionOne(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i] * arr[i];
    }
    return sum;
}

const questionTwo = function questionTwo(num) { 
    if (num < 1){
        return 0;
	}
	else if (num === 1){
		return num;
	}
    else {
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

const questionThree = function questionThree(text) {
    var vowels = ['a', 'e', 'i', 'o', 'u'];
    var numVowels = 0;
    for (i = 0; i < text.length; i++) {
        if (vowels.includes(text[i])) {
            numVowels++;
        }
    }
    return numVowels;
}

const questionFour = function questionFour(num) {
    if (num < 0) {
        return NaN
    }
    else if (num <= 1) {
        return 1;
    }
    else {
        return num * questionFour(num - 1);
    }
}

module.exports = {
    firstName: "Anthony", 
    lastName: "Rusignuolo", 
    studentId: "10374903",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};