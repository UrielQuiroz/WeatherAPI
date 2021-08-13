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

    consultarAPI(ciudad, pais);

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

function consultarAPI(ciudad, pais) {
    const appID = '4b6663f4fa25bf69d59774ce4135c0b6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
    fetch(url)
        .then( rpta => rpta.json())
        .then( result => {

            limpiarHTML(); //Limpiar el html previo

            if(result.cod === '404') {
                mostrarErro('Ciudad no encontrada');
                return;
            }

            mostrarClima(result); 
        })
}


function mostrarClima(datos) {
    const { main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const divResult = document.createElement('div');
    divResult.classList.add('text-center', 'text-white');
    divResult.appendChild(actual);

    resultado.appendChild(divResult);
}


function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}