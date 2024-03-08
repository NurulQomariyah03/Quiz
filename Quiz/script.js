const quizData = [
    {
      question: 'Apa bahasa tersulit di dunia?',
      options: ['China Mandarin', 'Inggris', 'Jerman', 'Spanyol'],
      answer: 'China Mandarin',
    },
    {
      question: '6 × 0 + 1 - 5 + 10 × 2 = ?',
      options: ['0', '10', '16', '21'],
      answer: '16',
    },
    {
      question: 'Hormon pada tanaman yang berfungsi dalam proses pematangan buah adalah?',
      options: ['Auksin', 'Etilen', 'Kalin', 'Sitokinin'],
      answer: 'Etilen',
    },
    {
      question: 'Manakah hewan asli Indonesia yang telah punah?',
      options: ['Harimau Jawa', 'Cendrawasih', 'Tarsius', 'Badak bercula satu'],
      answer: 'Harimau Jawa',
    },
    {
      question: 'Manakah yang merupakan samudra terluas di bumi?',
      options: [
        'Samudra Pasifik',
        'Samudra Hindia',
        'Samudra Atlantik',
        'Samudra Arktik',
      ],
      answer: 'Samudra Pasifik',
    },
    {
      question: 'Apa simbol unsur kimia untuk Helium?',
      options: ['He', 'H', 'Cu', 'Fe'],
      answer: 'He',
    },
    {
      question: 'Apa arti dari kata Knuckle?',
      options: [
        'Buku',
        'Ruas jari',
        'Pukulan',
        'Duduk',
      ],
      answer: 'Buku',
    },
    {
      question: 'Planet manakah diantara ini yang berwarna merah?',
      options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
      answer: 'Mars',
    },
    {
      question: 'Apa kepanjangan dari singkatan NASA?',
      options: [
        'National Astronot and Space Admiration',
        'National Aero and Space Administration',
        'National Aeronautics and Space Administration',
        'National Aeronautics and Science Administration',
      ],
      answer: 'National Aeronautics and Space Administration',
    },
    {
      question: 'Apa negara terkecil di dunia?',
      options: ['Singapura', 'Vatikan', 'Timore Leste', 'Jerman'],
      answer: 'Vatikan',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();