const questionText = document.getElementById('question-text');
const factButton = document.getElementById('fact-button');
const capButton = document.getElementById('cap-button');
const scoreDisplay = document.getElementById('score');
const feedbackElement = document.getElementById('feedback'); // Get the feedback element

let score = 0;
let currentQuestionIndex = 0;
let triviaData = [];
let skipsRemaining = 3;
const skipButton = document.getElementById('skip-button');
const skipsDisplay = document.getElementById('skips');

const exampleTrivia = [
  {
    question: "The term 'no cap' means someone is lying.",
    answer: false,
    explanation: "Cap! 'No cap' means someone is telling the truth - it's the opposite of lying."
  },
  {
    question: "BeReal notifications can come at any random time of the day.",
    answer: true,
    explanation: "Fact! BeReal sends a notification at a different random time each day."
  },
  {
    question: "The 'Devious Lick' TikTok trend involved stealing from schools.",
    answer: true,
    explanation: "Fact! This controversial trend involved students stealing or vandalizing school property."
  },
  {
    question: "The term 'bussin' means something is disgusting.",
    answer: false,
    explanation: "Cap! 'Bussin' means something is really good, especially when talking about food."
  },
  {
    question: "Renegade was originally a TikTok dance.",
    answer: false,
    explanation: "Cap! It was created by Jalaiah Harmon on Instagram before going viral on TikTok."
  },
  {
    question: "The 'It's Corn' song originated from a professional musician.",
    answer: false,
    explanation: "Cap! It came from a young boy's interview on 'Recess Therapy' that went viral."
  },
  {
    question: "The term 'mid' means something is average or mediocre.",
    answer: true,
    explanation: "Fact! 'Mid' is used to describe something that's just okay or not that great."
  },
  {
    question: "Spotify Wrapped is released every month.",
    answer: false,
    explanation: "Cap! Spotify Wrapped is an annual feature released at the end of the year."
  },
  {
    question: "The 'Little Miss' trend started on LinkedIn.",
    answer: false,
    explanation: "Cap! The trend started on TikTok and spread to other platforms."
  },
  {
    question: "Among Us became popular during the COVID-19 pandemic.",
    answer: true,
    explanation: "Fact! The game exploded in popularity during 2020's lockdowns."
  },
  {
    question: "The term 'caught in 4K' means someone was filmed in high quality.",
    answer: false,
    explanation: "Cap! It means someone was caught doing something embarrassing or wrong."
  },
  {
    question: "Wordle gives different words to different players each day.",
    answer: false,
    explanation: "Cap! Everyone gets the same Wordle word each day."
  },
  {
    question: "The 'Barbie' movie starring Margot Robbie was released in 2022.",
    answer: false,
    explanation: "Cap! The Barbie movie was released in 2023."
  },
  {
    question: "Discord was originally created for gamers.",
    answer: true,
    explanation: "Fact! Discord was initially made for gaming communities before becoming widely used."
  },
  {
    question: "The term 'POV' means 'pretty obvious vibes'.",
    answer: false,
    explanation: "Cap! POV means 'Point of View' and is often used in social media content."
  },
  {
    question: "The 'Rick Roll' meme started on YouTube.",
    answer: false,
    explanation: "Cap! It started on 4chan before becoming huge on YouTube."
  },
  {
    question: "Instagram removed the like count to reduce social pressure.",
    answer: true,
    explanation: "Fact! Instagram made likes private to help reduce social comparison."
  },
  {
    question: "The term 'ratio' means getting more likes than the original post.",
    answer: true,
    explanation: "Fact! Getting 'ratioed' means a reply gets more likes than the original post."
  },
  {
    question: "Vine videos could be up to 10 seconds long.",
    answer: false,
    explanation: "Cap! Vine videos were limited to exactly 6 seconds."
  },
  {
    question: "The 'Nah he tweakin' comment trend started on Twitter.",
    answer: false,
    explanation: "Cap! It started on Instagram, specifically on Tony Hawk's post about blood skateboards."
  },
  {
    question: "The term 'slay' originally meant to kill someone.",
    answer: false,
    explanation: "Cap! In Gen Z context, it means to do something exceptionally well or look amazing."
  },
  {
    question: "TikTok dances are always created by professional dancers.",
    answer: false,
    explanation: "Cap! Many viral TikTok dances are created by regular users."
  },
  {
    question: "The 'Gentleminions' trend involved wearing suits to see Minions.",
    answer: true,
    explanation: "Fact! Groups dressed in formal wear to watch 'Minions: The Rise of Gru'."
  },
  {
    question: "The term 'tea' means drama or gossip.",
    answer: true,
    explanation: "Fact! 'Spilling the tea' means sharing gossip or drama."
  },
  {
    question: "Snapchat's ghost logo is named 'Ghostface Chillah'.",
    answer: true,
    explanation: "Fact! The ghost mascot's name is a play on Ghostface Killah from Wu-Tang Clan."
  },
  {
    question: "The 'Grimace Shake' trend was planned by McDonald's.",
    answer: false,
    explanation: "Cap! The trend of pretending to fall after drinking it started organically on TikTok."
  },
  {
    question: "The term 'based' means something is bad.",
    answer: false,
    explanation: "Cap! 'Based' means someone is being themselves or speaking their truth."
  },
  {
    question: "Wednesday's dance scene was choreographed by Jenna Ortega.",
    answer: true,
    explanation: "Fact! Jenna Ortega choreographed the viral dance scene herself."
  },
  {
    question: "The 'Binley Mega Chippy' went viral because of their food.",
    answer: false,
    explanation: "Cap! It went viral randomly on TikTok for its catchy name and jingle."
  },
  {
    question: "The 'Corn Kid' was sponsored by Corn Industries.",
    answer: false,
    explanation: "Cap! Tariq's corn interview went viral organically before any sponsorships."
  },
  {
    question: "BeReal posts disappear after 24 hours.",
    answer: false,
    explanation: "Cap! BeReal posts stay on your profile unless you delete them."
  },
  {
    question: "The term 'W' stands for 'Wonderful'.",
    answer: false,
    explanation: "Cap! 'W' stands for 'Win' - it's the opposite of taking an 'L' (loss)."
  },
  {
    question: "Spotify Wrapped includes your listening stats from December.",
    answer: false,
    explanation: "Cap! It only counts until October 31st of each year."
  },
  {
    question: "The 'Barbie' movie was banned in Vietnam.",
    answer: true,
    explanation: "Fact! The movie was banned due to a scene showing a map with the 'nine-dash line'."
  },
  {
    question: "The term 'rizz' was coined by Kai Cenat.",
    answer: true,
    explanation: "Fact! Streamer Kai Cenat popularized the term 'rizz' on Twitch."
  },
  {
    question: "TikTok's original name in China is 'Douyin'.",
    answer: true,
    explanation: "Fact! TikTok is called Douyin in China and operates as a separate app."
  },
  {
    question: "The 'Little Miss/Mr.' trend was created by Roger Hargreaves.",
    answer: false,
    explanation: "Cap! While based on the books, the meme trend started independently on social media."
  },
  {
    question: "Instagram's original name was 'Burbn'.",
    answer: true,
    explanation: "Fact! Instagram was originally called Burbn before being renamed."
  },
  {
    question: "The term 'skibidi' comes from a K-pop song.",
    answer: false,
    explanation: "Cap! It comes from a Russian music video that became a meme."
  },
  {
    question: "Discord's mascot is named 'Wumpus'.",
    answer: true,
    explanation: "Fact! The Discord mascot is officially named Wumpus."
  },
  {
    question: "The 'Crop' trend on TikTok started in farming communities.",
    answer: false,
    explanation: "Cap! It started as a way to reveal unexpected endings in videos."
  },
  {
    question: "BeReal was created by French developers.",
    answer: true,
    explanation: "Fact! BeReal was developed in France in 2020."
  },
  {
    question: "The term 'fr fr' means 'friends forever'.",
    answer: false,
    explanation: "Cap! 'Fr fr' means 'for real, for real' - used for emphasis."
  },
  {
    question: "Vine was shut down because of TikTok's competition.",
    answer: false,
    explanation: "Cap! Vine was shut down in 2016, before TikTok became popular."
  },
  {
    question: "The 'Teenage Dirtbag' trend was started by the band Wheatus.",
    answer: false,
    explanation: "Cap! While using their song, the photo trend started organically on TikTok."
  },
  {
    question: "The 'Roman Empire' trend revealed men think about ancient Rome daily.",
    answer: true,
    explanation: "Fact! The trend revealed many men frequently think about the Roman Empire."
  },
  {
    question: "The term 'Sneaky Link' means a secret study buddy.",
    answer: false,
    explanation: "Cap! A 'Sneaky Link' refers to a secret romantic meetup."
  },
  {
    question: "Instagram's first photo was of a dog.",
    answer: false,
    explanation: "Cap! The first Instagram photo was of a dog at a taco stand."
  },
  {
    question: "The 'Quiet Luxury' trend promotes minimalist fashion.",
    answer: true,
    explanation: "Fact! The trend promotes understated, high-quality fashion without obvious branding."
  },
  {
    question: "TikTok's algorithm is based on watch time only.",
    answer: false,
    explanation: "Cap! It considers many factors including engagement, shares, and user preferences."
  },
  {
    question: "The term 'Rizz' was Oxford's word of the year 2023.",
    answer: true,
    explanation: "Fact! 'Rizz' was chosen as Oxford's word of the year for 2023."
  },
  {
    question: "The 'Tube Girl' trend was a paid marketing campaign.",
    answer: false,
    explanation: "Cap! Sabrina Bahsoon started the trend organically on the London Underground."
  },
  {
    question: "The 'Girl Dinner' trend promotes unhealthy eating habits.",
    answer: false,
    explanation: "Cap! It showcases casual, unconventional meals people eat alone."
  },
  {
    question: "The term 'Delulu' comes from K-pop fan culture.",
    answer: true,
    explanation: "Fact! 'Delulu' (delusional) originated in K-pop fan communities."
  }
];

// Add a "Next Question" button (will be created in JavaScript)
let nextButton;

// Add sound effects
const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
const incorrectSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2007/2007-preview.mp3');

// Function to play sound with volume control
function playSound(sound) {
  sound.volume = 0.5; // Set volume to 50%
  sound.play().catch(error => {
    console.log('Error playing sound:', error);
  });
}

function loadTriviaData() {
  triviaData = exampleTrivia;
  shuffleArray(triviaData);
  displayQuestion();
}

function displayQuestion() {
  // Clear previous feedback
  feedbackElement.textContent = '';
  feedbackElement.className = 'feedback'; // Reset classes

  if (currentQuestionIndex < triviaData.length) {
    const currentQuestion = triviaData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    // Re-enable buttons if they were disabled
    factButton.disabled = false;
    capButton.disabled = false;
    skipButton.style.display = 'block'; // Show skip button for new question
    // Remove the next button if it exists
    if (nextButton) {
      nextButton.remove();
      nextButton = null; // Clear the variable
    }
  } else {
    // Game over or no more questions
    questionText.textContent = "Game Over! Your final score is " + score;
    factButton.style.display = 'none'; // Hide buttons
    capButton.style.display = 'none'; // Hide buttons
    skipButton.style.display = 'none'; // Hide skip button
    if (nextButton) {
      nextButton.remove(); // Ensure next button is gone at the end
    }
  }
}

function checkAnswer(userAnswer) {
  // Disable buttons after answering
  factButton.disabled = true;
  capButton.disabled = true;
  skipButton.style.display = 'none'; // Hide skip button after answering

  const currentQuestion = triviaData[currentQuestionIndex];
  const correctAnswer = currentQuestion.answer;

  // Display feedback and play sound
  if (userAnswer === correctAnswer) {
    score++;
    scoreDisplay.textContent = score;
    feedbackElement.textContent = "Correct! It's a " + (correctAnswer ? "Fact" : "Cap") + ". " + (currentQuestion.explanation || '');
    feedbackElement.classList.add('correct');
    playSound(correctSound);
  } else {
    feedbackElement.textContent = "Incorrect! It's a " + (correctAnswer ? "Fact" : "Cap") + ". " + (currentQuestion.explanation || '');
    feedbackElement.classList.add('incorrect');
    playSound(incorrectSound);
  }

  // Create and display the "Next Question" button
  nextButton = document.createElement('button');
  nextButton.textContent = "Next Question";
  nextButton.classList.add('next-button');
  document.querySelector('.buttons').appendChild(nextButton);

  // Add event listener for the next button
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
  });
}

// Event listeners for the Fact and Cap buttons remain the same
factButton.addEventListener('click', () => {
  checkAnswer(true); // True for Fact
});

capButton.addEventListener('click', () => {
  checkAnswer(false); // False for Cap
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateSkipsDisplay() {
  skipsDisplay.textContent = skipsRemaining;
  skipButton.disabled = skipsRemaining === 0;
}

function skipQuestion() {
  if (skipsRemaining > 0) {
    skipsRemaining--;
    updateSkipsDisplay();
    currentQuestionIndex++;
    displayQuestion();
    feedbackElement.textContent = "Question skipped!";
    feedbackElement.className = 'feedback';
  }
}

// Add skip button event listener
skipButton.addEventListener('click', skipQuestion);

// Update the start screen functionality to reset skips
document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const gameContainer = document.getElementById('game-container');
  const startButton = document.getElementById('start-button');

  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    skipsRemaining = 3;
    updateSkipsDisplay();
    loadTriviaData();
  });
});

// Add mouse-following effect
document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// Remove the particle effect code
// Create particles
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Call the function when the page loads
window.addEventListener('load', createParticles);
  