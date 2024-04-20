let nameUser

function userName() {
    let title = "Введите ваше имя";
    nameUser = prompt(title);
}

userName();

//  Массив с вопросами, вариантами и правильными ответами
let questions = [
    {
        question: "После какого класса вы хотите уйти?",
        options: ["9 класс", "11 класс"],
        correctAnswer: "11 класс"
    },
    {
        question: "Какое вы выбрали направление?",
        options: ["Физ-мат", "Хим-био", "Гуманитарное", "Архитектурное"],
        correctAnswer: "Физ-мат"
    },
    {
        question: "В какой город вы хотите поступить?",
        options: ["Тюмень", "Санкт-Петербург", "Москва"],
        correctAnswer: "Тюмень"
    },
    {
        question: "Какой университет вы выбрали?",
        options: ["МГУ", "ТюмГУ", "СПБГУ"],
        correctAnswer: "ТюмГУ"
    },
    {
        question: "Какой предмет вы сдеаете?",
        options: ["Химия", "Физика", "Обществознание"],
        correctAnswer: "Физика"
    },
    {
        question: "Сколько балов вам надо?",
        options: ["170", "210", "290"],
        correctAnswer: "210"
    }
]

let uncorrectQuestions = [];



let currentQuestion = 0 // Текущий вопрос
let correctAnswers = 0 // Кол-во правильных ответов

// функция для отображения текущего вопроса и вариантов ответов
function displayQuestion() {
    let questionElement = document.getElementById("question"); // Получить блок для размещения вопросами
    // Размещаем вопрос на стрранице
    questionElement.textContent = `Вопрос ${currentQuestion + 1}: ${questions[currentQuestion].question} `;
    let optionsElements = document.getElementById("options"); // Получить блок для размещения кнопок
    optionsElements.innerHTML = " ";// Отчищаем содержимое блока optionsElements

    // Получить массив ответов
    let optionsArray = questions[currentQuestion].options;

    // Создать кнопки с вариантами ответов и привязать к ним функцию перехода к следуйщему опросу
    optionsArray.forEach((option) => {
        let button = document.createElement("button");
        optionsElements.append(button);
        button.textContent = option;
    });

    // Добавляем обработчик события на блок с кнопками
    optionsElements.addEventListener("click", (e) => {
        // Записать в переменную элемент на который кликнули 
        let target = e.target;
        // Вызвать функцию перехода к следуйщему вопросу и передать ей  текстовое содержимое кнопки по которой кликнули
        nextQuestion(target.textContent);
    }, { once: true });
}
// Функция перехода к следуйщему вопросу
function nextQuestion(answer) {

    // Если кликнули на правильный ответ то
    if (answer === questions[currentQuestion].correctAnswer) {
        // Увеличим на единицу счетчик правильных ответо
        correctAnswers++;
    } else {
        uncorrectQuestions.push(questions[currentQuestion].question);
    }
    currentQuestion++; // Перейти к следуйщему вопросу 
    if (currentQuestion < questions.length) {
        displayQuestion(); // Отобразить следуйщий вопрос
    } else {
        displayResult(); // отобразить результаты теста
    }
}

// Функция отображения результата теста
function displayResult() {
    let questionElement = document.getElementById("question"); // Получить блок для размещения вопросами
    let optionsElements = document.getElementById("options"); // Получить блок для размещения кнопок
    let resultElement = document.getElementById("result"); // Получить блок для отображения результата
    let percent = (correctAnswers / questions.length) * 100
    questionElement.style.display = "none"; // Выключить видимость блока вопросов
    optionsElements.style.display = "none"; // Выключить видимость блока ответов
    if (percent < 50) {
        mark = 2;
    } else if (percent >= 50 && percent < 65) {
        mark = 3;
    } else if (percent >= 65 && percent < 85) {
        mark = 4;
    } else {
        mark = 5;
    }
    resultElement.innerHTML =
        `${nameUser}, ваша оценка ${mark}, <br>
    правильных ответов ${correctAnswers} из ${questions.length} (${Math.round(percent)} %) <br>
    Вопросы на которые вы ответили непраивльно:`

    uncorrectQuestions.forEach((uncorrectQuestion) => {
        let div = document.createElement("div")
        div.append(uncorrectQuestion);
        resultElement.append(div);
    });
}


displayQuestion();
