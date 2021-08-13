const container =  document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const frm = document.querySelector('#formulario');

window.addEventListener('load', () => {
    frm.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    console.log('buscando clima...')
}