const loginEmail = document.getElementById('login-email');
const loginSenha = document.getElementById('login-senha');
const login = document.getElementById('login');
const form = document.getElementById('evaluation-form');
const inputName = document.getElementById('input-name');
const inputLastname = document.getElementById('input-lastname');
const inputEmail = document.getElementById('input-email');
const house = document.getElementById('house');
const family = document.querySelectorAll('.family');
const subjects = document.querySelectorAll('.subject');
const rate = document.querySelectorAll('.rate');
const textArea = document.getElementById('textarea');
const check = document.getElementById('agreement');
const submit = document.getElementById('submit-btn');
const alertMsg = document.getElementById('alert');
const trybewartsImg = document.getElementById('trybewarts-img');
const gitnoriaImg = () => imgLoad('images/gitnoria.png');
const reactpuffImg = () => imgLoad('images/reactpuff.png');
const corvinodeImg = () => imgLoad('images/corvinode.png');
const pytherinaImg = () => imgLoad('images/pytherina.png');
// Requisito 3: verifica se foi dado o Email e Senha esperados
function loginAcess() {
  if (loginEmail.value === 'tryber@teste.com' && loginSenha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}
// Requisito 20: Cria um countdown ligado ao número de caracteres em textArea
function count() {
  const inputArea = textArea.value;
  const inputLength = inputArea.length;
  const spanCount = document.getElementById('counter');
  spanCount.innerHTML = 500 - inputLength;
}
// Requisito 18
function checkStatus() {
  if (check.checked) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', true);
  }
}
// Cria uma ' div > p ' com um conteúdo innerHTML a ser informado.
function createElement(textContent) {
  const div = document.createElement('div');
  const par = document.createElement('p');
  div.className = 'section';
  par.innerHTML = textContent;
  div.appendChild(par);
  form.appendChild(div);
}
// Verifica uma Array de elementos (Node List a ser informado) e retorna, dentre eles, os com atributo 'checked'
function checkedValue(element) {
  const arrayElements = Array.from(element);
  const arrayOfValues = [];
  arrayElements.reduce((acc, curEl) => { // reduce() foi uma sugestão do aluno Diogo Sant'Anna da Turma 12.
    if (curEl.checked) {
      arrayOfValues.push(` ${curEl.value}`);
    }
    return false;
  });
  if (arrayOfValues.length === 0) return ' -Não definido-';
  return arrayOfValues;
}
// Verifica se não foi declarado texto algum em um elemento 'input.text', caso True, retorna uma string especificada.
function inputVerify(element) {
  const inputValue = (element.value === '') ? '-Não declarado-' : element.value;
  return inputValue;
}
// Requisito 21: Limpa todo innerHTML de 'form' e 'div > p' com um conteúdo especificado.
function rebuildForm() {
  form.innerHTML = '';
  const fullName = `Nome: ${inputName.value} ${inputLastname.value}`;
  createElement(fullName);
  const email = `Email: ${inputEmail.value}`;
  createElement(email);
  const casa = `Casa: ${house.value}`;
  createElement(casa);
  const familia = `Família:${checkedValue(family)}`;
  createElement(familia);
  const materias = `Matérias:${checkedValue(subjects)}`;
  createElement(materias);
  const avaliacao = `Avaliação:${checkedValue(rate)}`;
  createElement(avaliacao);
  const obs = `Observações: ${inputVerify(textArea)}`;
  createElement(obs);
}
// Retira 'style.display: none' do elemento com mensagem de alerta já presente em 'HTML.body' e desfaz após um Timeout.
const displayAlert = () => { // Lembrete => Refatorar esta para inserir elemento dinamicamente.
  alertMsg.className = 'alertOff alertOn';
  setTimeout(() => { alertMsg.className = 'alertOff'; }, 6000);
};
// Verifica 'value' de inputs(vazio ou não?) específicados e escolhe uma ação a ser tomada se True ou False.
const onClickSubmit = () => {
  const filledForm = (inputName.value && inputEmail.value) === '';
  return filledForm ? displayAlert() : rebuildForm();
};

function imgLoad(url) {
  const image = new Image();
  image.src = url;
  return image;
}

function imgChange() {
  const selectedHouse = house.value;
  switch (selectedHouse) {
  case 'Gitnória':
    trybewartsImg.style.backgroundImage = `url("images/gitnoria.png")`;
    break;
  case 'Reactpuff':
    trybewartsImg.style.backgroundImage = 'url("images/reactpuff.png")';
    break;
  case 'Corvinode':
    trybewartsImg.style.backgroundImage = 'url("images/corvinode.png")';
    break;
  case 'Pytherina':
    trybewartsImg.style.backgroundImage = 'url("images/pytherina.png")';
    break;
  default:
    trybewartsImg.style.backgroundImage = 'url("images/trybewarts-colored.svg")';
  }
}

function Events() {
  login.addEventListener('click', loginAcess);

  check.addEventListener('click', checkStatus);

  textArea.addEventListener('input', count);

  submit.addEventListener('click', (event) => {
    event.preventDefault();
    onClickSubmit();
  });

  house.addEventListener('input', imgChange);
}

window.onload = () => {
  Events();

  gitnoriaImg();
  reactpuffImg();
  corvinodeImg();
  pytherinaImg();

};
