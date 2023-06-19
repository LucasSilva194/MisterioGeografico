var question = [
    {
        question:['A cidade de Lisboa é a capital de ','e está localizada na costa ','do país. Ela é banhada pelo rio ','e tem um clima mediterrâneo, com invernos suaves e verões quentes e secos. A cidade é famosa por suas atrações históricas, como a Torre de ','e o Mosteiro dos ','que atraem milhões de turistas todos os anos.'],
        answers: ['Portugal', 'oeste' , 'Tejo' , 'Belém', 'Jerónimos'],
    },
    {
        question: ['O Porto é a segunda maior cidade de ','localizada no ','do país, na margem direita do rio ','. Ela é conhecida por seus edifícios históricos, como a Torre dos','e a ','da Sé, que datam da Idade Média.'],
        answers: ['Portugal', 'Norte', 'Douro', 'Clérigos', 'Catedral'],
    },
    {
        question: ['Londres é a capital da Inglaterra e do Reino ','. Localizada no sudeste do país, a cidade é atravessada pelo rio ','e tem uma rica história que remonta aos tempos romanos. Londres é conhecida por seus marcos icônicos, como o Big ','e o ','de Buckingham.'],
        answers: ['Unido', 'Tamisa', 'Ben', 'Palácio'],
    },
    {
        question: ['A cidade de Paris é a capital da ','e é conhecida por seus marcos icônicos, como a Torre ','e o ','do Triunfo. A cidade está localizada no centro do país e é atravessada pelo rio ','.'],
        answers: ['França', 'Eiffel', 'Arco', 'Sena'],
    },
    {
        question: ['Nova York é a maior cidade dos Estados Unidos e um importante centro financeiro, cultural e turístico. A cidade está localizada na costa ','do país e é atravessada pelo rio ','. Nova York é conhecida por seus marcos famosos, como a ','Square, o Central ','e a Estátua da Liberdade, e por seus arranha-céus icônicos, como o ','State Building e o One World Trade Center.'],
        answers: ['Este', 'Hudson', 'Times', 'Park', 'Empire'],
    },
];

var usedQuestions = [];

// Function to randomly select a question that has not been used before
function getRandomQuestion() {
    var randomIndex = Math.floor(Math.random() * question.length);
    if (usedQuestions.includes(randomIndex)) {
        return getRandomQuestion();
    } else {
        usedQuestions.push(randomIndex);
        return question[randomIndex];
    }
}
for (let index = 0; index < 5; index++) {
    console.log(getRandomQuestion())    
}
