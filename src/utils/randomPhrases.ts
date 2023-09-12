const phrases = {
    correctAnswer: [
        "Correcto-mundo!",
        "A tip of the hat to you!",
        "Hooray! Another point for you.",
        "Nailed it!",
        "You got it right!",
        "Well done, that's correct!",
        "Bingo!",
        "You're in the zone! That's the correct answer.",
        "Right on the money! That's correct."
    ],
    win: [
        "You've aced it, way to go, quiz champion!",
        "You're the champion of this round, your quiz game is strong!",
        "Outstanding! Hats off to you!",
        "Well played, you've aced it!",
        "Congratulations, you're in a league of your own! Your high score speaks volumes."
    ],
    wrongAnswer: [
        "Oops, not quite right, but don't worry, you'll get the next one!",
        "Close, but not quite! ",
        "Not the correct answer, but keep trying.",
        "That wasn't it, but keep trying!",
        "Oops, not this time!",
        "Incorrect, but keep your chin up! Your next answer might be spot-on.",
        "Not quite there, but don't lose heart!",
        "Not the right one, but the next question is your opportunity to bounce back.",
        "Not quite, but keep that brain working."
    ],
    lose: [
        "Oops, it looks like you didn't answer enough questions to win this time. No worries, though! You can always play again and aim for a higher score.",
        "Almost there! To win the game, you'll need to answer a few more questions correctly. Try to play again!",
        "Sorry, you didn't answer enough questions to win this round, but you're getting closer! Why don't you try again?",
        "Unfortunately, you didn't answer enough questions to win this time, but your determination is commendable. Play again to improve!"
    ]
};

type phraseType = keyof typeof phrases;

export const getRandomPhrase: (type: phraseType) => string = (type) => {
    const selectedPhrases = phrases[type];
    const randomIndex = Math.floor(selectedPhrases.length * Math.random());
    return selectedPhrases[randomIndex];
}

