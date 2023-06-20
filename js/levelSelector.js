var levels = [
  {
    level: 1,
    title: 'Desafio dos Continentes:',
    body: 'Os jogadores terão que responder a uma série de perguntas de escolha múltipla relacionadas aos sete continentes do mundo.',
  },
  {
    level: 2,
    title: 'Enigmas Geográficos:',
    body: 'Os jogadores terão que preencher as frases em branco com as respostas corretas relacionadas aos diferentes países do mundo.',
  },
  {
    level: 3,
    title: 'Mapa Interativo:',
    body: 'Testa tuas habilidades de geografia e arrasta os nomes dos países para suas localizações corretas no mapa, neste desafio interativo e educativo!',
  },
  {
    level: 4,
    title: 'Pertence ou não pertence?:',
    body: 'Os jogadores terão que escolher as opções corretas de um conjunto de opções relacionadas a monumentos famosos e locais turísticos de todo o mundo.',
  },
  {
    level: 5,
    title: 'Desvenda a nação:',
    body: 'Desafia as tuas habilidades e encontra a bandeira que representa o país certo, desvendando a identidade oculta das nações!',
  },
];

function levelSelector() {
  var level = localStorage.getItem('level');
  var levelTitle = document.getElementById('level-title');
  var levelDesc = document.getElementById('level-description');
  var levelButton = document.getElementById('target-level');

  if (level == 1) {
    levelTitle.innerHTML = levels[0].title;
    levelDesc.innerHTML = levels[0].body;
    levelButton.href = './lvl-escolhaMultipla.html';
  }
  if (level == 2) {
    levelTitle.innerHTML = levels[1].title;
    levelDesc.innerHTML = levels[1].body;
    levelButton.href = './lvl-preencherEspaco.html';
  }
  if (level == 3) {
    levelTitle.innerHTML = levels[2].title;
    levelDesc.innerHTML = levels[2].body;
  }
  if (level == 4) {
    levelTitle.innerHTML = levels[3].title;
    levelDesc.innerHTML = levels[3].body;
    levelButton.href = './lvl-opcao.html';
  }
  if (level == 5) {
    levelTitle.innerHTML = levels[4].title;
    levelDesc.innerHTML = levels[4].body;
    levelButton.href = './lvl-bandeiras.html';
  }

  levelButton.addEventListener('click', function () {
    window.location.href = `./level${level}.html`;
  });
}

levelSelector();
