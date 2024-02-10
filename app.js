/** @type {number} */
let secretNumber = 0;

/** @type {number} */
let attempts = 0;

/** @type {number[]} */
const drawnNumbers = [];

/** @type {number} */
const maxNumber = 10;

/**
 * Set the text of an HTML element.
 * @param {string} element - The selector of the HTML element.
 * @param {string} text - The text to set.
 */
function setText(element, text) {
    const htmlElement = document.querySelector(element);
    htmlElement.textContent = text;
}

/**
 * Check the user's guess.
 */
function checkGuess() {
    const userNumber = parseInt(document.getElementById('userValue').value);
    
    if (isNaN(userNumber)) {
        setText('p', 'Please enter a valid number');
        return;
    }
    
    if (userNumber === secretNumber) {
        setText('p',`You guessed the number in ${attempts} ${(attempts === 1) ? 'time' : 'times'}`);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        setText('p', userNumber > secretNumber ? 'The secret number is lower' : 'The secret number is higher');
        attempts++;
        clearInput();
    }
}

/**
 * Clear the input box.
 */
function clearInput() {
    document.querySelector('#userValue').value = '';
}

/**
 * Generate a secret number.
 * @returns {number} The generated secret number.
 */
function generateSecretNumber() {
    const generatedNumber =  Math.floor(Math.random() * maxNumber) + 1;

    if (drawnNumbers.length === maxNumber) {
        setText('p','All possible numbers have been drawn');
    } else if (drawnNumbers.includes(generatedNumber)) {
        return generateSecretNumber();
    } else {
        drawnNumbers.push(generatedNumber);
        return generatedNumber;
    }
}

/**
 * Set the initial conditions for the game.
 */
function setInitialConditions() {
    setText('h1','Secret Number Game!');
    setText('p',`Enter a number from 1 to ${maxNumber}`);
    secretNumber = generateSecretNumber();
    attempts = 1;
}

/**
 * Restart the game.
 */
function restartGame() {
    clearInput();
    setInitialConditions();
    document.querySelector('#restart').setAttribute('disabled','true');
}

setInitialConditions();