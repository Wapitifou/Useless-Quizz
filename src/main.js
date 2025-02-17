class Question {
  constructor(text, choices, answer, explanation) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.explanation = explanation;
  }
  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "In a deck of cards, only one king doesn't have a mustache. Which one is it ?",
    ["King of Hearts", "King of Spades", "King of Diamonds", "King of Clubs"],
    "King of Hearts",
    "This lack of mustache is due to a re-design mistake. Yes, the same you had last time you went to the hairdresser. Don't lie, everybody knows."
  ),
  new Question(
    "Which of the following is NOT allowed to enter the Pentagon?",
    ["E.T.", "Barbie", "Furby", "Tamagotchi"],
    "Furby",
    "Well, it should be because they are terrifying, but the American government mentioned a spying threat through their recording device instead. Let's be honest, it's the eyes, c'mon."
  ),
  new Question(
    "What was the nationality of the man that created the Hawaiian pizza ?",
    ["Italian", "American", "Greek", "Polish"],
    "Greek",
    "Yes, he was Greek and living in Canada. Might explain this nonsense..."
  ),
  new Question(
    "One of the following animal can hold their breath longer than dolphins. Which is it?",
    ["Sheep", "Sloth", "Snake", "Seal"],
    "Sloth",
    "What for? I mean, really is there any reason?"
  ),
  new Question(
    "One of these animals can actually dive to pick up food, which one?",
    ["Deer", "Horse", "Seahorse", "Moose"],
    "Moose",
    "Yes, they can go down to 6 meters."
  ),
  new Question(
    "What piranhas can do aside from eating a buffalo in seconds?",
    [
      "Purr like a cat",
      "Bark like a dog",
      "Sing like a bird",
      "Float like an otter",
    ],
    "Purr like a cat",
    "Their way to communicate stress. But stress of what? Ripping things apart too fast? Seriously."
  ),
  new Question(
    "What do penguins do to seduce their partner?",
    [
      "Start a mating dance",
      "Bring them twigs to help with the nest",
      "Show dominance over other rivals by sliding the furthest",
      "Bring them a pebble",
    ],
    "Bring them a pebble",
    "How could you possibly refuse a pebble? It's nice smooth and stylish."
  ),
  new Question(
    "Which one of these animals has a striped skin under the fur?",
    ["Tiger", "Tamia", "Zebra", "Kudu"],
    "Tiger",
    "If you disagree feel free to go shave a tiger and let me know."
  ),
  new Question(
    "We have fingerprints and so do other animals. Which one has almost identical ones to humans?",
    ["Koala Bear", "Chimpanzee", "Lemur", "Orangutan"],
    "Koala Bear",
    "Who has two thumbs up? The koala bear. In one hand."
  ),
  new Question(
    "Other that normal rain, it could be raining something else, but what?",
    ["Cats and Dogs", "Men", "Purple", "Fish and frogs"],
    "Fish and frogs",
    "Yes it is a strange fact, but it happens. Go check it's actually interesting!"
  ),
];

class Quizz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.goodAnswer = this.goodAnswer;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    let currentQuestion = this.getCurrentQuestion();
    let isCorrect = currentQuestion.isCorrectAnswer(answer);
    let buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
      if (button.innerText === currentQuestion.answer) {
        button.style.background = "#3b7053";
        button.style.Color = "whitesmoke";
      } else if (button.innerText === answer) {
        button.style.background = "#923838";
        button.style.color = "whitesmoke";
      }
      button.disabled = true;
    });

    if (isCorrect) {
      this.score++;
    }

    display.showAnswer(currentQuestion, answer);

    setTimeout(() => {
      this.currentQuestionIndex++;
      display.elementShown("answer", "");
      buttons.forEach((button) => {
        button.style.backgroundColor = "";
        button.style.color = "";
        button.disabled = false;
      });
      quizzApp();
    }, 5000);
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Quizz display
const display = {
  // Creation de elementShown --> outil
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  question: function () {
    this.elementShown("question", quizz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quizz.getCurrentQuestion().choices;

    const guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quizz.guess(guess);
        quizzApp();
      };
    };
    // Affichage des choix + prise en compte de la réponse
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quizz.currentQuestionIndex + 1} / ${quizz.questions.length} `
    );
  },
  showAnswer: function (question, isCorrect) {
    let answerHTML = `
    <span><strong>${question.answer}. </strong></span>
      <span>${question.explanation}</span>
    `;

    this.elementShown("answer", answerHTML);

    setTimeout(() => {
      let explanation = document.getElementById("answer");

      if (userChoice === question.answer) {
        explanation.style.color = "#3b7053";
      } else {
        explanation.style.color = "#923838";
      }
    }, 50);
  },
  endQuizz: function () {
    let endQuizzHTML = `
    <h1>Finish!</h1>
    <h3>Your score: ${quizz.score} / ${quizz.questions.length}</h3>
    `;
    this.elementShown("quizz", endQuizzHTML);
  },
};

// Game Logic
const quizzApp = () => {
  if (quizz.hasEnded()) {
    display.endQuizz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};

// Create Quizz
let quizz = new Quizz(questions);
quizzApp();
