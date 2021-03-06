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
    
    Spinner(); //Mustra un spinner de carga

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
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados}&#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max}&#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min}&#8451`;
    tempMinima.classList.add('text-xl');

    const divResult = document.createElement('div');
    divResult.classList.add('text-center', 'text-white');
    divResult.appendChild(nombreCiudad);
    divResult.appendChild(actual);
    divResult.appendChild(tempMaxima);
    divResult.appendChild(tempMinima);

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

function Spinner() {

    limpiarHTML();

    const divSpiinner = document.createElement('div');
    divSpiinner.classList.add('sk-fading-circle');

    divSpiinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpiinner);
}