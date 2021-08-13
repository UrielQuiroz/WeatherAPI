const container =  document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const frm = document.querySelector('#formulario');

window.addEventListener('load', () => {
    frm.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    
    //Validando
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        //Hubo un erro
        mostrarErro('Ambos campos son obligatorios');
        return;
    }

}


function mostrarErro(msj) {
    const alertaMsj = document.querySelector('.msjAlerta');

    if(!alertaMsj) {
        //Crea una alerta
        const divAlert = document.createElement('div');

        divAlert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md',
                                    'mx-auto', 'mt-6', 'text-center', 'msjAlerta');
        
        divAlert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${msj}</span>
        `;

        container.appendChild(divAlert);

        //Se elimine la alerta despues de 3 segundo
        setTimeout(() => {
            divAlert.remove();
        }, 3000);
    }
}