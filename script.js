const wordle = {}

const wordList = ["Apple", "Bagel", "Bacon", "Basil", "Berry", "Bread", "Chili", "Chips", "Cream", "Curry", "chive", "fruit", "filet", "grape", "gravy", "honey", "Jerky", "Lemon", "Mango", "Melon", "Olive", "Onion", "Pasta", "Peach", "Pizza", "Salad", "Salsa", "Sauce", "Steak", "Sugar", "Sushi", "Toast"]

let randomWord = wordList[Math.floor(Math.random() * wordList.length)];
let answer = randomWord.toUpperCase()

const form = document.querySelector('form');
const icon = document.querySelector('i');
const cancel = document.querySelector('#close')
const instructions = document.querySelector("#howTo")
const input = document.querySelector('#guess')
const guessContainer = document.querySelector('#guessContainer')
const gameContainer = document.querySelector('#gameContainer')
const resultsContainer = document.querySelector('#resultsContainer')
const replay = document.querySelector('#replay')
const resultsText = document.querySelector('#result');
const answerReveal = document.querySelector('h3');

let guessNumber = 0;
let remainingGuesses = 6


wordle.getGuess = function () {

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let guessInital = input.value
        let guess = guessInital.toUpperCase()

        let guessArray = guess.split("")

        if (guessArray.length !== 5) {
            alert("Your guess must be 5 letters!")

        } else if (guessArray.length === 5) {
            wordle.compare(guessArray, guess)
            input.value = ''
        }


    })
}

wordle.compare = function (array, word) {
    const answerArray = answer.split("")

    const wordDiv = document.createElement('div');
    guessContainer.appendChild(wordDiv)
    wordDiv.classList.add("guessRow")
    guessnumber = (guessNumber++)
    remainingGuesses = (remainingGuesses - 1)





    for (let i = 0; i < array.length; i++) {
        // const span = document.createElement('span');

        // span.textContent = array[i]

        let row = document.getElementsByClassName("letter-row")[guessNumber - 1]
        let box = row.children[i]

        if (array[i] === answerArray[i]) {
            box.classList.add('green')
        } else if (answerArray.includes(array[i])) {
            box.classList.add('yellow')
        } else {
            box.classList.add('grey')
        }
        // wordDiv.appendChild(span)


        box.textContent = array[i]
        box.classList.add("filled-box")
        // letterNumber = (letterNumber++)

    }
    if (word === answer) {

        resultsText.textContent = "You Win!"
        wordle.endGame()
    }

    if (guessNumber === 6 && word !== answer) {

        resultsText.textContent = "Game Over"
        wordle.endGame()

    }
}

wordle.endGame = function () {

    answerReveal.textContent = `Answer: ${answer}`
    form.classList.add('hide')
    replay.classList.remove('hide')
    guessNumber = 0



}

wordle.setGameBoard = function () {
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        guessContainer.appendChild(row)
    }
    icon.addEventListener('click', function () {

        instructions.classList.toggle('hide')
        gameContainer.classList.toggle('hide')


    })
    cancel.addEventListener('click', function () {

        instructions.classList.add('hide')
        gameContainer.classList.remove('hide')


    })


    wordle.getGuess()
}



wordle.init = function () {


    wordle.setGameBoard()



}

wordle.init()