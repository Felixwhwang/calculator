# Calculator
A JavaScript calculator application, all devices oriented.
## Features
- AC Button for clear all input and reset the calculator
- C Button for delete the last number or operator user just input
- Basic Operations

| Testing       | Keys Pressed  | Expected Result |
| :------------ | ------------- | --------------- |
| Addition      | 1 + 2 =       | 3               |
| Multiplication| 2 * 3 =       | 6               |
| Division      | 1 / 2 =       | 0.5             |
| Subtraction   | 1 - 2 =       | -1              |

- Comprehensive Operations

| Testing              | Keys Pressed         | Expected Result   |
| :------------------- | -------------------- | ----------------- |
| Successive operation | 1 + 1 + 2 =          | 4                 |
| Decimals             | 1 . 1 + 1 . 1 =      | 2.2               |
| Multiple decimals    | 1 ... 1 + 1 ... 1 =  | 2.2               |
| Multiple operation   | 1 +++++++ 2 =        | 3                 |
| Changing operation   | 1 + - * 2 =          | 2                 |
| Division by zero     | 1 / 0 =              | Error             |

- Advanced Operations

| Testing                       | Keys Pressed       | Expected Result   |
| :---------------------------- | ------------------ | ----------------- |
| Premature operation           | ++++ 1 * 3 =       | 3                 |
| Partial operand               | 3 * =              | 9                 |
| Missing operation             | 3 =                | 3                 |
| Missing operands              | = = = =            | Ready             |
| Func calculator: order of ops | 1 + 3 / 4 + 10 * 2 | 21.75             |

- Extra Operations

| Testing            | Keys Pressed   | Expected Result   |
| :----------------- | -------------- | ----------------- |
| Operation repeat   | 1 + 1 = = =    | 4                 |
| Operation rollover | 1 + 1 + = + =  | 8                 |

## Preview
![calculator](https://user-images.githubusercontent.com/31264160/70873207-926dfa00-1fa4-11ea-8085-a87bd624038e.gif)

## Technologies
- JavaScript
- jQuery
- HTML5
- CSS3

## Live Demo
Try the application live at https://calculator.wenhaowang.net
