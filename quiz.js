<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Тест по программированию</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            text-align: center;
        }
        .quiz-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        h1 {
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .question {
            margin: 25px 0;
            font-size: 1.3em;
            line-height: 1.5;
        }
        .options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 25px 0;
        }
        button {
            padding: 15px;
            font-size: 1.1em;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
        button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        button.correct {
            background: #4CAF50;
            border-color: #45a049;
        }
        button.wrong {
            background: #f44336;
            border-color: #da190b;
        }
        .score {
            font-size: 1.5em;
            margin: 20px 0;
            font-weight: bold;
        }
        .hidden {
            display: none;
        }
        .result {
            font-size: 1.8em;
            margin-top: 30px;
            padding: 20px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.15);
        }
        .progress {
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            margin: 20px 0;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: #4CAF50;
            width: 0%;
            transition: width 0.5s ease;
        }
    </style>
</head>
<body>
    <div class="quiz-container">
        <h1>🚀 Тест по программированию</h1>
        <div class="progress">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        <div id="questionContainer"></div>
        <div class="score">Счет: <span id="score">0</span>/5</div>
        <div class="result hidden" id="result"></div>
    </div>

    <script>
        const questions = [
            {
                question: "Что выведет console.log(typeof NaN)?",
                options: ["'number'", "'NaN'", "'undefined'", "'object'"],
                correct: 0,
                explanation: "NaN технически является числовым типом, хотя и представляет 'Не-Число'"
            },
            {
                question: "Какой метод массива добавляет элемент в конец?",
                options: [".push()", ".pop()", ".shift()", ".unshift()"],
                correct: 0,
                explanation: ".push() добавляет элемент в конец массива"
            },
            {
                question: "Что такое CSS?",
                options: [
                    "Каскадные таблицы стилей",
                    "Компьютерная система стилей",
                    "Центральный сервер стилей",
                    "Язык программирования"
                ],
                correct: 0,
                explanation: "CSS расшифровывается как Cascading Style Sheets"
            },
            {
                question: "Как объявить переменную в ES6+?",
                options: ["var", "let", "const", "Все варианты верны"],
                correct: 3,
                explanation: "В современном JS можно использовать var, let и const"
            },
            {
                question: "Какой оператор используется для строгого сравнения?",
                options: ["==", "===", "=", "!="],
                correct: 1,
                explanation: "=== проверяет равенство без приведения типов"
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        const totalQuestions = questions.length;

        const questionContainer = document.getElementById('questionContainer');
        const scoreElement = document.getElementById('score');
        const resultElement = document.getElementById('result');
        const progressBar = document.getElementById('progressBar');

        function showQuestion() {
            const q = questions[currentQuestion];
            
            let html = `
                <div class="question">${currentQuestion + 1}. ${q.question}</div>
                <div class="options">
            `;
            
            q.options.forEach((option, index) => {
                html += `<button onclick="checkAnswer(${index})">${option}</button>`;
            });
            
            html += `</div><p id="explanation" class="hidden" style="font-style: italic; margin-top: 15px;"></p>`;
            
            questionContainer.innerHTML = html;
            updateProgress();
        }

        function checkAnswer(selectedIndex) {
            const q = questions[currentQuestion];
            const buttons = document.querySelectorAll('.options button');
            const explanation = document.getElementById('explanation');
            
            buttons.forEach(button => {
                button.disabled = true;
                button.style.transform = 'none';
                button.style.boxShadow = 'none';
            });
            
            if (selectedIndex === q.correct) {
                buttons[selectedIndex].classList.add('correct');
                score++;
                scoreElement.textContent = score;
            } else {
                buttons[selectedIndex].classList.add('wrong');
                buttons[q.correct].classList.add('correct');
            }
            
            explanation.textContent = q.explanation;
            explanation.classList.remove('hidden');
            
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < totalQuestions) {
                    showQuestion();
                } else {
                    showResult();
                }
            }, 2000);
        }

        function updateProgress() {
            const progress = ((currentQuestion) / totalQuestions) * 100;
            progressBar.style.width = `${progress}%`;
        }

        function showResult() {
            questionContainer.classList.add('hidden');
            document.querySelector('.score').classList.add('hidden');
            
            let message = '';
            let emoji = '';
            
            if (score === totalQuestions) {
                message = 'Идеально! Ты настоящий эксперт! 🎯';
                emoji = '🏆';
            } else if (score >= totalQuestions * 0.7) {
                message = 'Отлично! Хорошие знания! 👍';
                emoji = '⭐';
            } else if (score >= totalQuestions * 0.5) {
                message = 'Неплохо, но есть куда расти! 📚';
                emoji = '🔍';
            } else {
                message = 'Попробуй еще раз! Учиться - это круто! 💪';
                emoji = '🚀';
            }
            
            resultElement.innerHTML = `
                ${emoji}<br>
                <strong>${message}</strong><br><br>
                Твой результат: <strong>${score}/${totalQuestions}</strong><br><br>
                <button onclick="restartQuiz()" style="margin-top: 15px;">Пройти еще раз</button>
            `;
            resultElement.classList.remove('hidden');
            progressBar.style.width = '100%';
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            scoreElement.textContent = '0';
            resultElement.classList.add('hidden');
            questionContainer.classList.remove('hidden');
            document.querySelector('.score').classList.remove('hidden');
            showQuestion();
        }

        // Запускаем тест
        showQuestion();
    </script>
</body>
</html>ы