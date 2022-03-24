// Make a random 4 different numbers
const MAX_NUMBER = 9;
const MIN_NUMBER = 1;
let guessArray = [];
let check = (arr) => {
    for(let x = 0; x < arr.length; x++){
        for(let y = 0; y < arr.length; y++){
            if(x != y) {
                if(arr[x] == arr[y]){
                    if(arr === guessArray){
                        arr[x] = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
                        check(arr);
                    } else {
                        return false;
                    }
                }            
            } 
        }
    }
};

let randomNumber = () => {
    let counter = 0;
    let guessNumber = 0;

    while(counter < 4) {
        guessNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
        guessArray.push(guessNumber);
        counter++;
    }
    check(guessArray);
};
randomNumber();

console.log(guessArray);

// Game contol
let guessInput = document.querySelector("#guess-input");
let guessButton = document.querySelector("#guess-button");
let resetButton = document.querySelector("#reset-button");
let red = document.querySelector(".red");
let green = document.querySelector(".green");
let bulls = document.querySelector("#bulls");
let cows = document.querySelector("#cows");
let gameCondition = document.querySelector("#game-condition");
let hidden= document.querySelector(".hidden");
let continueGame = true;
let bullsCounter = 0;
let cowsCounter = 0;
let preGuess = [];
let counter = 0;

// Reset function
let newGame = () => {
    resetButton.classList.toggle("hidden");
    guessButton.classList.toggle("hidden");
    guessArray = [];
    preGuess = [];
    printer.textContent = '';
    bulls.textContent = '';
    cows.textContent = '';
    gameCondition.textContent = '';
    guessInput.value = '';
    randomNumber();
    console.log(guessArray);
};

// Set color by the condition of the game
let colorByCondition = () => {
    gameCondition.classList.remove("red");
    gameCondition.classList.remove("green");
    if(continueGame){
        gameCondition.classList.toggle("green");
    } else {
        gameCondition.classList.toggle("red");
    }
};

// reset condition
let timer = () => {
    setTimeout(deleteCon, 3000);
};

let deleteCon = () => {
    gameCondition.textContent = '';
};

// Game guess button
guessButton.addEventListener('click', () => {
    bullsCounter = 0;
    cowsCounter = 0;
    continueGame = true;
    
    // Change the input number to array
    let inputHolder = guessInput.value;
    let yourGuess = Array.from(String(inputHolder), Number);
    console.log(yourGuess);

    if(yourGuess.length != 4){
        gameCondition.textContent = "Its must to be only 4 numbers";
        timer();
        continueGame = false;
        colorByCondition();
    } else {
        // Check if the Number all ready guessed or legal
        if (check(yourGuess) == false){
            continueGame = false;
            colorByCondition();
            console.log(continueGame);
            gameCondition.textContent = "You can not put the same number more than once";
            timer();
        } else {
            for(let x = 0; x < preGuess.length; x++){
                counter = 0;
                for(let y = 0; y < yourGuess.length; y++){
                    if (yourGuess[y] == 0){
                        continueGame = false;
                        gameCondition.textContent = "Not a legal number";
                        timer();
                    }else if(yourGuess[y] == preGuess[x][y]){
                            counter++;
                            if(counter == 4){
                                continueGame = false;
                                gameCondition.textContent = "You all ready tried this number";
                                timer();
                            }
                          }
                }
            }
            colorByCondition();
        }
    
        if(continueGame){
            preGuess.push(yourGuess);
            colorByCondition();
        
            
            // Number checker
            for(let x = 0; x < guessArray.length; x++){
                for(let y = 0; y < yourGuess.length; y++){
                    if(guessArray[x] == yourGuess[y]){
                        if(x == y){
                            bullsCounter++;
                        } else {
                            cowsCounter++;
                        }
                    }            
                }
            }
            
            // Print the guessed number
            if (bullsCounter == 4){
                gameCondition.textContent = "You Guessed right";
                resetButton.classList.toggle("hidden");
                guessButton.classList.toggle("hidden");
            } else {
                const div = document.createElement('div');
                const printer = document.querySelector("#printer");
                printer.appendChild(div);
                div.textContent = yourGuess;
            }
    
            // Print the results
            bulls.textContent = `Bulls: ${bullsCounter}`;
            cows.textContent = `Cows: ${cowsCounter}`;
        }

    }


});

resetButton.addEventListener('click', () => newGame());