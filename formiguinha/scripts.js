/* scripts.js
   Controle de abas, typing effect, fundo estrelado, frases interativas e galerias
*/

// ---------- ELEMENTOS QUE APARECEM DEPOIS DA SAUDAÇÃO ----------
const elementosDepoisSaudacao = [
  ...document.querySelectorAll(".center-card"), // botões de frases
  document.getElementById("tab-coisas"),
  document.getElementById("tab-cartinhas")
];

// Esconder tudo inicialmente
elementosDepoisSaudacao.forEach(el => el.classList.add("hidden"));

// ---------- ABAS ----------
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    panels.forEach(p => p.classList.add("hidden"));
    const panel = document.getElementById("tab-" + tab.dataset.tab);
    if(panel) panel.classList.remove("hidden");

    if(tab.dataset.tab === "coisas") carregarGaleria();
    if(tab.dataset.tab === "cartinhas") carregarCartinhas();
  });
});

// ---------- SAUDAÇÃO ----------
const typingText = document.getElementById("typing-text");
const btnContinuar = document.getElementById("btn-continuar");
let typingIndex = 0;
let fraseIndex = 0;

const hoje = new Date();
let hora = hoje.getHours();
let saudacao = (hora>=5 && hora<12) ? "Bom dia gatinha" :
               (hora>=12 && hora<18) ? "Boa tarde gatinha" : "Boa noite gatinha";

const frases = [
  saudacao,
  
    "Já te chamei de tanta coisa, né?",
   "Senhorita Esla Santos...",
   "Rabudinha...",
   "Formiguinha🐜...",
   "Gatinha...",
   "Deusa do Egito...",
   "Razão das minhas noites sem sono...",
   "A maçã mais bela do meu jardim proibido...",
   "São tantos nomes que já perdi a conta...",
   "Mas nenhum deles chega perto do que você realmente significa.",
   "Tu sabe que sou criativo nessas horas",
   "Dai então pensei...",
   "em fazer esse cantinho só pra ti.",
   "Um site feito de lembranças,viadagens ,zoeiras e umas coisinhas",
   "Pra tu entender como fuciona mais minha cabeça",
   "Já que você sabe...",
   "Que tu vives nela...",
   "Clique em Continuar"

  ];
function typeWriter() {
  if(typingIndex < frases[fraseIndex].length){
    typingText.textContent += frases[fraseIndex][typingIndex];
    typingIndex++;
    setTimeout(typeWriter, 60);
  }
}

typeWriter();

btnContinuar.addEventListener("click", () => {
  if(fraseIndex < frases.length -1){
    fraseIndex++;
    typingIndex = 0;
    typingText.textContent = "";
    typeWriter();
  } else {
    document.getElementById("dialog-card").classList.add("hidden");
    // Mostrar os elementos que estavam escondidos
    elementosDepoisSaudacao.forEach(el => el.classList.remove("hidden"));
  }
});

// ---------- SISTEMA DE ELEMENTOS LIMITADOS ----------
const ativos = [];
const LIMITE = 100;
const DURACAO = 15000; // 15 segundos

function adicionarElemento(el) {
  sky.appendChild(el);
  ativos.push(el);

  // Se ultrapassar o limite, remove o mais antigo com animação
  if (ativos.length > LIMITE) {
    const velho = ativos.shift();
    velho.style.transition = "transform 1s ease, opacity 1s ease";
    velho.style.transform = "scale(0)";
    velho.style.opacity = "0";
    setTimeout(() => velho.remove(), 1000);
  }

  // Remove sozinho depois de 15s
  setTimeout(() => {
    if (el.parentNode) {
      el.style.transition = "transform 1s ease, opacity 1s ease";
      el.style.transform = "scale(0)";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 1000);
      const index = ativos.indexOf(el);
      if (index !== -1) ativos.splice(index, 1);
    }
  }, DURACAO);
}

// ---------- FUNDO ESTRELADO ----------
const sky = document.getElementById("sky");
const emojis = ["⭐","✨","🌙","🪐"];

function criarEstrela(){
  const e = document.createElement("div");
  e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  e.style.position = "absolute";
  e.style.left = Math.random()*window.innerWidth + "px";
  e.style.top = "-20px";
  e.style.fontSize = (10+Math.random()*15)+"px";
  e.style.opacity = Math.random();

  let top = -20;
  const speed = 0.5 + Math.random();
  function anim(){
    top += speed;
    e.style.top = top + "px";
    if(top < window.innerHeight){
      requestAnimationFrame(anim);
    }
  }
  anim();

  adicionarElemento(e);
}
setInterval(criarEstrela,200);

// ---------- CHUVA DE PALAVRINHAS ----------
const toggleChuva = document.getElementById("btn-chuva");
const palavrinhas = ["Gatinha 💖", "Totosa", "✨", "pretinha safada", "Princesa 👑", "Charmosa 🌸", "Demaaaiss", "Cavala", "Musa 🎶","Delicia","Dengosa" ,"Deusa do egito","Deusa grega" ,"🌹"];
let intervaloChuva = null;

function criarPalavrinha() {
  const p = document.createElement("div");
  p.textContent = palavrinhas[Math.floor(Math.random()*palavrinhas.length)];
  p.style.position = "absolute";
  p.style.left = Math.random()*window.innerWidth + "px";
  p.style.top = "-20px";
  p.style.fontSize = (14+Math.random()*22)+"px";
  p.style.opacity = 0.9;
  p.style.color = "#fff";

  let top = -20;
  const speed = 0.5 + Math.random()*1.5;
  function anim(){
    top += speed;
    p.style.top = top + "px";
    if(top < window.innerHeight){
      requestAnimationFrame(anim);
    }
  }
  anim();

  adicionarElemento(p);
}

toggleChuva.addEventListener("change", () => {
  if (toggleChuva.checked) {
    intervaloChuva = setInterval(criarPalavrinha, 200);
  } else {
    clearInterval(intervaloChuva);
  }
});

// ---------- FRASES INTERATIVAS ----------
function criarFraseRandom(frasesArray){
  const f = document.createElement("div");
  f.textContent = frasesArray[Math.floor(Math.random()*frasesArray.length)];
  f.style.position = "absolute";
  f.style.left = Math.random()*window.innerWidth + "px";
  f.style.top = "-10px";
  f.style.fontSize = (10+Math.random()*15)+"px";
  f.style.opacity = 0.9;
  f.style.color = "#fff";

  let top = -20;
  const speed = 0.5 + Math.random()*1.5;
  function anim(){
    top += speed;
    f.style.top = top + "px";
    if(top < window.innerHeight){
      requestAnimationFrame(anim);
    }
  }
  anim();

  adicionarElemento(f);
}

document.getElementById("btn-cabelo").addEventListener("click", () => criarFraseRandom(["Não decide a cor ","💖","Bonita até careca","😍","Nem sei que cor ta agora","Usa pantene"," ✨","Deixa eu puxar ele?", "🌷"]));
document.getElementById("btn-sorriso").addEventListener("click", () => criarFraseRandom(["Me deixa todo sem jeito","💖","teus dentes são fofinhos","😍","🐜","Quero te ver sorrindo sempre"," ✨", "🌷"]));
document.getElementById("btn-corpo").addEventListener("click", () => criarFraseRandom(["Que parece até que foi esculpido","💖","Gostosona","😍","Teus revelos me deixam sem direção🌍","Delicia, pisa em mim","Cavala🐴"," ✨","Mais curvas que estrada de serra.", "🌸"]));

function addBounceEffect(buttonId){
  const btn = document.getElementById(buttonId);
  if(!btn) return;
  btn.addEventListener("click", () => {
    btn.classList.remove("bounce");
    void btn.offsetWidth;
    btn.classList.add("bounce");
  });
}
["btn-cabelo","btn-sorriso","btn-corpo"].forEach(addBounceEffect);

// ---------- GALERIA "COISAS QUE ME LEMBRAM TU" ----------
const btnNewCoisa = document.getElementById("new-coisa");
const formCoisa = document.getElementById("form-coisa");
const galeriaFull = document.getElementById("galeria-full");
const btnSaveCoisa = document.getElementById("save-coisa");
const btnCancelCoisa = document.getElementById("cancel-coisa");

btnNewCoisa.addEventListener("click", () => {
  formCoisa.classList.remove("hidden");
  formCoisa.setAttribute("aria-hidden", "false");
});

btnCancelCoisa.addEventListener("click", (e) => {
  e.preventDefault();
  formCoisa.classList.add("hidden");
  formCoisa.setAttribute("aria-hidden", "true");
  formCoisa.reset();
});

btnSaveCoisa.addEventListener("click", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("coisa-titulo").value.trim();
  const texto = document.getElementById("coisa-texto").value.trim();
  const imagemInput = document.getElementById("coisa-imagem");
  if(!titulo || !texto) return;

  const itemDiv = document.createElement("div");
  itemDiv.className = "item-galeria";

  if(imagemInput.files && imagemInput.files[0]){
    const reader = new FileReader();
    reader.onload = function(event){
      itemDiv.innerHTML = `<h3>${titulo}</h3><p>${texto}</p><img src="${event.target.result}" alt="${titulo}">`;
      galeriaFull.appendChild(itemDiv);
    }
    reader.readAsDataURL(imagemInput.files[0]);
  } else {
    itemDiv.innerHTML = `<h3>${titulo}</h3><p>${texto}</p>`;
    galeriaFull.appendChild(itemDiv);
  }

  formCoisa.classList.add("hidden");
  formCoisa.setAttribute("aria-hidden", "true");
  formCoisa.reset();
});

// Dados iniciais das coisas
const coisasIniciais = [
  { titulo: "Elma - Dragon Maid", texto: "Além do cabelo curto e colorido (que acho que combinaria contigo), ambas são malucas e engraçadinhas. Mas o detalhe mais incomum: tu e ela adoram doces e come igual um pedreiro.", imagem: "img/elma_dm.jpg" },
  { titulo: "Girlfriend – FNF", texto: "Nem joguei muito pq meu reflexo era péssimo, mas falando dela. Ela tm aquele jeitinho misterioso e sedutor, que é impossivel não lembrar de ti.", imagem: "img/Girlfriend.jpg" },
  { titulo: "FNaF", texto: "Nem preciso falar o porquê, né.", imagem: "img/fnaf.jpg" },
  { titulo: "Hello Kitty", texto: "Sei que tu gosta dela e tbm a imagem ja é autoexplicativa", imagem: "img/kitty.jpg" },
  { titulo: "Giovanna - Guilty Gear", texto: "Guilty gear eu joguei so o de portátil uns anos atrás, mas até hoje acompanho a lore. Uma das personagens atuais me lembrou foi ela. Tu tbm fica um mulherão com cabelo curto e tbm talvez pela forma bruta que ao mesmo tempo que atrai, intimida...", imagem: "img/gigi.jpg" },
  { titulo: "Ramona", texto: "Além de ter mais de 7 ex namorados, toda hora muda a cor do cabelo e é meio doida. Mas o carro chefe aqui é o jeitinho confuso que só dá mais charme e tira noites de sono.", imagem: "img/୨☆୧.jpg" },
  { titulo: "Aurora – LoL", texto: "Não lembro bem pq relacionei, mas tu e ela usam óculos (mesmo que os teus não sejam redondos) e as duas têm uns coxão… mas o teu é mais gostoso, rs rs rs (me esmaga com elas)", imagem: "img/Aurora - League of Legends by Jennifer Wuestling.jpg" },
  { titulo: "Velma – Scooby-Do", texto: "Eu não vou repetir o que falei no vídeo.", imagem: "img/Velma Dinkley.jpg" },
  { titulo: "Makima - Chaisaw Man", texto: "Vai muito da cor do cabelo dela, já que vermelho me faz lembrar de ti. Mas o detelhe em especial é que na obra, ela tem poderes de controle e manipulação, coisa que tu consegue fazer sempre, me colocar na sua mão so fzd charminho (eu que sou otário mesmo).", imagem: "img/makima.webp" },
  { titulo: "Esquilinha – Era do Gelo", texto: "Eu nem ia falar isso. Mas tu que falou aql dia lá. Tu e ela têm um rabão, e também por causa do detalhe no olho que lembra o delineado que tu faz.", imagem: "img/esquilinha.jpg" },
  { titulo: "Pera", texto: "Bem, acho que ta mais ligado a forma da tua silhueta,já que ate a cintura é uma graça, delicada, mas daí pra baixo… uau, é quase impossível não imaginar todas as coisas que eu queria fazer ctg.(😈Capetinha roxo)", imagem: "img/pera.jpg" },
  { titulo: "Formiga", texto: "Dei esse apelido por ti por 3 motivos ele é bonitinho de pronunciar, tem uma formiga da especie atta cephalotes, que a rainha delas tem uma caracteristica muito marcante que tu tbm tem(sim tu vai procurar) e tbm o mais obvio é que tu adora doces. ", imagem: "img/formiga.jpg" },
  { titulo: "Fusca", texto: "Apenas aceite", imagem: "img/fusca.jpg" },
  { titulo: "Essa imagem ai", texto: "Nessa imagem, reflete muito da minha humilhação, menosprezo, e lugar como capacho, que vive sendo ignorado, negligenciado, provocado e atormentado. Tento mudar essa hierarquia injusta. mas em questão de segundos,com apenas com uma mera frase, ou só um ‘oi’, lembro da thuthuca que tu é e quando me pego,  já estou de joelhos perante a ti. ", imagem: "img/joelhos.webp" },
  { titulo: "Tulipa", texto: "Paia q tua flor favorita nem nasce nesse calor do caralho, pq tu sabe que eu ia atrás. Não achei muita coisa especial sobre o significado dela, é o mesmo clichê de beleza e harmonia. Única coisa que ela serve pra mim é aparecer do nada no Minecraft e ficar me dando gatilho.", imagem: "img/tulipa.jpg" },
  { titulo: "Bruxinha – ScoobyDoo", texto: "Além da aparencia pega um pouco de outra personagem que eu falei, tu e ela tem aql jeitimnho sedutor misterioso, só que tu é mais alegre…e mais interessante🫦.", imagem: "img/bruxinha.jpg" }
];


let currentSlide = 0;

function carregarGaleria(){
  galeriaFull.innerHTML = '';
  coisasIniciais.forEach(item => {
    const slide = document.createElement("div");
    slide.className = "slide-item";
    slide.innerHTML = `
      ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}">` : ''}
      <div class="slide-content">
        <h3>${item.titulo}</h3>
        <p>${item.texto}</p>
      </div>
    `;
    galeriaFull.appendChild(slide);
  });

  mostrarSlide(0);
}

function mostrarSlide(index){
  const slides = document.querySelectorAll('.slide-item');
  if(index < 0) currentSlide = slides.length - 1;
  else if(index >= slides.length) currentSlide = 0;
  else currentSlide = index;

  slides.forEach((s, i) => {
    s.style.display = (i === currentSlide) ? 'flex' : 'none';
  });
}

document.querySelector('.prev').addEventListener('click', () => mostrarSlide(currentSlide - 1));
document.querySelector('.next').addEventListener('click', () => mostrarSlide(currentSlide + 1));


// ---------- GALERIA "CARTINHAS" ----------
const btnNewCarta = document.getElementById("new-carta");
const formCarta = document.getElementById("form-carta");
const cartasFull = document.getElementById("cartas-full");
const btnSaveCarta = document.getElementById("save-carta");
const btnCancelCarta = document.getElementById("cancel-carta");


btnCancelCarta.addEventListener("click", (e) => {
  e.preventDefault();
  formCarta.classList.add("hidden");
  formCarta.setAttribute("aria-hidden", "true");
  formCarta.reset();
});

btnSaveCarta.addEventListener("click", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("carta-titulo").value.trim();
  const mensagem = document.getElementById("carta-mensagem").value.trim();
  const decor = document.getElementById("carta-decor").value;
  const cor = document.getElementById("carta-cor").value;

  if(!titulo || !mensagem) return;

  const cartaDiv = document.createElement("div");
  cartaDiv.className = "carta-item";
  cartaDiv.style.backgroundColor = cor;
  cartaDiv.innerHTML = `<h3>${titulo} ${decor}</h3><p>${mensagem}</p>`;
  cartasFull.appendChild(cartaDiv);

  formCarta.classList.add("hidden");
  formCarta.setAttribute("aria-hidden", "true");
  formCarta.reset();
});

function carregarCartinhas(){
  cartasFull.innerHTML = '';
  cartinhasIniciais.forEach(item => {
    const div = document.createElement("div");
    div.className = "carta-item";
    div.style.backgroundColor = item.cor;
    div.innerHTML = `<h3>${item.titulo} ${item.decor}</h3><p>${item.mensagem}</p>`;
    cartasFull.appendChild(div);
  });
}

let cantadaIndex = 0;

// Função que exibe a cantada atual
function mostrarCantada() {
  document.getElementById("cantada-titulo").innerText = cantadas[cantadaIndex].titulo;
  document.getElementById("cantada-texto").innerText = cantadas[cantadaIndex].texto;
  document.getElementById("cantada-imagem").src = cantadas[cantadaIndex].imagem;
}

// Função para navegar
function mudarCantada(direcao) {
  cantadaIndex += direcao;
  if (cantadaIndex < 0) cantadaIndex = cantadas.length - 1;
  if (cantadaIndex >= cantadas.length) cantadaIndex = 0;
  mostrarCantada();
}

// Mostra a primeira cantada ao carregar
window.onload = mostrarCantada;




