// --- Datos de los menús ---
const menus = {
    aperitivos: [
        { nombre: "Bruschetta", precio: "9€", img: "./img/comida/Bruschetta.png" },
        { nombre: "Antipasto Misto", precio: "8€", img: "./img/comida/Antipasto Misto.png" },
        { nombre: "Mini Parmigiana", precio: "7€", img: "./img/comida/Mini Parmigiana.png" }
    ],
    pasta: [
        { nombre: "Arrabbiata", precio: "11.50€", img: "./img/comida/Arrabbiata.png" },
        { nombre: "Penne al Pesto Genovese", precio: "12.50€", img: "./img/comida/Penne al Pesto Genovese.png" },
        { nombre: "Tagliatelle al Ragù", precio: "10€", img: "./img/comida/Tagliatelle al Ragù.png" },
        { nombre: "Spaghetti alla Carbonara", precio: "14.50€", img: "./img/comida/Spaghetti alla Carbonara.png" }
    ],
    postres: [
        { nombre: "Profiteroles", precio: "6€", img: "./img/comida/profiteroles.png" },
        { nombre: "Sfogliatelle", precio: "5€", img: "./img/comida/Sfogliatelle.jpg" },
        { nombre: "Cannoli", precio: "5.50€", img: "./img/comida/CANNOLI.jpg" }
    ]
};

// --- Referencias ---
const btnAperitivos = document.getElementById('btn-aperitivos');
const btnPasta = document.getElementById('btn-pasta');
const btnPostres = document.getElementById('btn-postres');
const botonesMenu = [btnAperitivos, btnPasta, btnPostres];

const aperitivoItems = document.querySelectorAll('#aperitivos-footer nav p');
const aperitivoImg = document.getElementById('aperitivo-img');
const aperitivoNombre = document.getElementById('aperitivo-nombre');

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let items = [];
let itemWidth = 0;
let position = 0;

// --- Funciones ---
function refreshItems() {
    items = Array.from(track.children);
    if (items.length > 0) itemWidth = items[0].offsetWidth + 16;
}

function updatePosition() {
    track.style.transform = `translateX(${position}px)`;
}

// --- Carrusel ---
function moveNext() {
    position -= itemWidth;
    track.style.transition = 'transform 0.5s linear';
    updatePosition();

    setTimeout(() => {
        let first = track.firstElementChild;
        track.appendChild(first);
        position += itemWidth;
        track.style.transition = 'none';
        updatePosition();
        void track.offsetWidth;
        track.style.transition = 'transform 0.5s linear';
    }, 500);
}

function movePrev() {
    let last = track.lastElementChild;
    track.insertBefore(last, track.firstElementChild);
    position -= itemWidth;
    track.style.transition = 'none';
    updatePosition();
    void track.offsetWidth;
    track.style.transition = 'transform 0.5s linear';
    position += itemWidth;
    updatePosition();
}

nextBtn.addEventListener('click', moveNext);
prevBtn.addEventListener('click', movePrev);

// --- Menú carousel ---
function cargarMenuCarousel(categoria) {
    track.innerHTML = '';
    const menu = menus[categoria];
    const count = menu.length;
    menu.forEach(item => {
        const link = document.createElement('a');
        link.href = '../Productos/productos.html';
        const section = document.createElement('section');
        section.innerHTML = `<img src="${item.img}" alt="${item.nombre}"><p>${item.nombre}</p><p>${item.precio}</p>`;
        link.appendChild(section);

        link.style.flex = count >= 4 ? '0 0 23%' : `0 0 ${Math.floor(100 / count) - 2}%`;
        track.appendChild(link);
    });
    position = 0;
    track.style.transition = 'none';
    updatePosition();
    refreshItems();
}

// --- Botones menú ---
function activarBoton(boton){
    botonesMenu.forEach(b => b.classList.remove('active'));
    boton.classList.add('active');
}

btnAperitivos.addEventListener('click', ()=>{
    cargarMenuCarousel('aperitivos');
    activarBoton(btnAperitivos);
});
btnPasta.addEventListener('click', ()=>{
    cargarMenuCarousel('pasta');
    activarBoton(btnPasta);
});
btnPostres.addEventListener('click', ()=>{
    cargarMenuCarousel('postres');
    activarBoton(btnPostres);
});

// --- Footer aperitivos ---
function seleccionarAperitivo(item){
    aperitivoItems.forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    aperitivoImg.src = item.getAttribute('data-img');
    aperitivoImg.alt = item.getAttribute('data-nombre');
    aperitivoNombre.textContent = item.getAttribute('data-nombre');
}
aperitivoItems.forEach(item => {
    item.addEventListener('click', () => seleccionarAperitivo(item));
});

// --- Inicialización ---
window.addEventListener('load', ()=>{
    cargarMenuCarousel('pasta');
    activarBoton(btnPasta);
    seleccionarAperitivo(aperitivoItems[0]);
    refreshItems();
});
window.addEventListener('resize', refreshItems);
