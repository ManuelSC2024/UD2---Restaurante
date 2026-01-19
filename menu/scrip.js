// Seleccionamos todos los <p> del nav
const aperitivoItems = document.querySelectorAll('#aperitivos-footer nav p');

// Seleccionamos la imagen y el nombre de la sección
const aperitivoImg = document.getElementById('aperitivo-img');
const aperitivoNombre = document.getElementById('aperitivo-nombre');

// Función para seleccionar un aperitivo
function seleccionarAperitivo(item) {
    // Quitamos la clase 'selected' de todos los <p>
    aperitivoItems.forEach(i => i.classList.remove('selected'));
    
    // Agregamos la clase 'selected' al <p> clickeado
    item.classList.add('selected');

    // Actualizamos la imagen y el nombre usando los data-attributes
    aperitivoImg.src = item.getAttribute('data-img');
    aperitivoImg.alt = item.getAttribute('data-nombre');
    aperitivoNombre.textContent = item.getAttribute('data-nombre');
}

// Asignamos el evento click a cada <p>
aperitivoItems.forEach(item => {
    item.addEventListener('click', () => seleccionarAperitivo(item));
});

// Seleccionamos por defecto el primer aperitivo (Bruschetta)
seleccionarAperitivo(aperitivoItems[0]);
