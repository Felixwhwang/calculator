$(document).ready(initializeApp);

function initializeApp () {
  applyClickHandlers();
}

var calculationArray = [];
var displayArray = [];
var stringNumberToPush = "";
var calculationResult = null;
var num1 = null;
var num2 = null;
var op = null;
var cArray = [];

var clickSound = new Audio();
clickSound.src = './assets/audio/click.mp3';

function applyClickHandlers () {
  $('#number-block').on('click', '.number', numberButtonHandler);
  $('#operator-column').on('click', '.operator', operatorButtonHandler);
  $('#number-block').on('click', '.decimal', decimalButtonHandler);
  $('#equals').on('click', equalsButtonHandler);
  $('#ac-button').on('click', acButtonHandler);
  $('#c-button').on('click', cButtonHandler);
}

function numberButtonHandler (event) {
  clickSound.play();
  checkReady();
  var inputtedNumber = '';
  inputtedNumber = $(event.currentTarget).find('p').text();
  stringNumberToPush += inputtedNumber;
  displayArray.push(inputtedNumber);
  updateDisplay();

}

function decimalButtonHandler (event) {
  checkReady();
  var inputtedDecimal = '';
  inputtedDecimal = $(event.currentTarget).find('p').text();
  if (stringNumberToPush.indexOf(inputtedDecimal) === -1) {
    stringNumberToPush += inputtedDecimal;
    displayArray.push(inputtedDecimal);
  }
  updateDisplay();
}

function operatorButtonHandler (event) {
  checkReady();
  if (stringNumberToPush !== '') {
    calculationArray.push(stringNumberToPush);
    stringNumberToPush = '';
  }

  if (checkOperator(calculationArray[calculationArray.length - 1])) {
    calculationArray.pop();
    displayArray.pop();
  }

  var inputtedOperator = '';
  inputtedOperator = $(event.currentTarget).find('p').text();
  displayArray.push(inputtedOperator);
  updateDisplay();

  // calculationArray.push(stringNumberToPush);
  calculationArray.push(inputtedOperator);
  stringNumberToPush = '';
  console.log(calculationArray);
}

function equalsButtonHandler (event) {
  //check the first input is + or -, and handle it
  if (calculationArray[calculationArray.length - 1] === '') {
    calculationArray.pop();
  }

  if (calculationArray[0] === '+' || calculationArray[0] === '-') {
    calculationArray.splice(0, 2, calculationArray[0] + calculationArray[1]);
  }

  if (stringNumberToPush !== '') {
    calculationArray.push(stringNumberToPush);
  }
  stringNumberToPush = '';
  displayArray = [];
  console.log(calculationArray);

  //operator higher order process
  while ((calculationArray.indexOf('*') !== -1 || calculationArray.indexOf('/') !== -1) && calculationArray.length > 3) {
    for(var index = 0; index < calculationArray.length; index++) {
      if (calculationArray[index] === '*' || calculationArray[index] === '/') {
        calculationArray.splice(index - 1, 3, calculate(calculationArray[index - 1], calculationArray[index + 1], calculationArray[index]));
        console.log(calculationArray);
        break;
      }
    }
  }
  //operator higher order process
  while ((calculationArray.indexOf('+') !== -1 || calculationArray.indexOf('-') !== -1) && calculationArray.length > 3) {
    for(var index = 0; index < calculationArray.length; index++) {
      if (calculationArray[index] === '+' || calculationArray[index] === '-') {
        calculationArray.splice(index - 1, 3, calculate(calculationArray[index - 1], calculationArray[index + 1], calculationArray[index]));
        console.log(calculationArray);
        break;
      }
    }
  }

  //for reserve three or two last data in array to calculate eg: 2+====
  if (calculationArray.length === 3) {
    num1 = calculationArray[0];
    num2 = calculationArray[2];
    op = calculationArray[1];
    calculationArray.splice(0, 3, calculate(num1, num2, op));
  } else if (calculationArray.length === 2) {
    num1 = calculationArray[0];
    num2 = num1;
    op = calculationArray[1];
    calculationArray.splice(0, 2, calculate(num1, num2, op));
  } else if (num2 !== null && op !== null) {
    calculationArray[0] = calculate(calculationArray[0], num2, op);
  }

  if (calculationArray[0] === 'Infinity') {
    displayArray.push('Error');
    updateDisplay();
    return;
  }

  if (calculationArray[0] === undefined) {
    displayArray.push('Ready');
    calculationArray = [];
    updateDisplay();
    return;
  }

  console.log(calculationArray[0]);
  displayArray.push(calculationArray[0]);
  updateDisplay();
}

function updateDisplay () {
  var displayText = displayArray.join('');
  $('#display-text').text(displayText);
}

//clear all data and display data
function acButtonHandler () {
  stringNumberToPush = '';
  displayArray = [];
  calculationArray = [];
  num1 = null;
  num2 = null;
  op = null;
  updateDisplay();
  $('#display-text').text('0');
}
//clear each single digit in display screen and if it is in claculationArray, delete it too
function cButtonHandler () {
  if (calculationArray[calculationArray.length - 1] === '') {
    calculationArray.pop();
  }

  if (stringNumberToPush.length !== 0) {
    stringNumberToPush = stringNumberToPush.slice(0, -1);
    displayArray.pop();
    updateDisplay();
  } else if (checkOperator(calculationArray[calculationArray.length - 1])) {
    calculationArray.pop();
    displayArray.pop();
    updateDisplay();
  } else {
    if(calculationArray.length !== 0){
      calculationArray[calculationArray.length - 1] = calculationArray[calculationArray.length - 1].slice(0, -1);
      displayArray.pop();
      updateDisplay();
    }
  }

}

function calculate (num1, num2, operator) {
  var number1 = parseFloat(num1);
  var number2 = parseFloat(num2);
  var result = null;

  if (num2 === undefined) {
    number2 = number1;
  }

  switch (operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      if (num2 === 0) {
        result = 'Error';
      } else {
        result = number1 / number2;
      }
      break;
  }
  return result + '';
}

function checkOperator (operator) {
  var result = null;
  switch (operator) {
    case '+':
      result = true;
      break;
    case '-':
      result = true;
      break;
    case '*':
      result = true;
      break;
    case '/':
      result = true;
      break;
    default:
      result = false;
      break;
  }
  return result;
}

//display screen to display ready to go for user
function checkReady () {
  var display = $('#display-text').text();
  if (display === 'Ready') {
    displayArray = [];
    updateDisplay();
  }
}
