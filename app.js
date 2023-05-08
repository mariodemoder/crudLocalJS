//console.log('funcionando');

//variables globales _______________________________________________________________________________
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];

// funciones  ______________________________________________________________________________________
const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item;
}

const GuardarDB = (actividad) =>{
    localStorage.setItem('rutina', JSON.stringify(arrayActividades));
    PintarDB();
}
const PintarDB = () => {
    listaActividadesUI.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'));
    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        arrayActividades.forEach(element => {
            //console.log(element);
            if(element.estado){
                listaActividadesUI.innerHTML += `<div class="alert alert-success  mt-3" role="alert">
                <span class="material-symbols-outlined float-left mr-3">
                  accessibility_new
                  </span><b>${element.actividad}</b> - ${element.estado}<span class="float-right">
                    <span class="material-symbols-outlined">done</span>
                    <span class="material-symbols-outlined">delete</span>
                  </span>
              </div>`;
            }else{
                listaActividadesUI.innerHTML += `<div class="alert alert-danger  mt-3" role="alert">
                <span class="material-symbols-outlined float-left mr-3">
                accessibility_new
                </span><b>${element.actividad}</b> - ${element.estado}<span class="float-right">
                    <span class="material-symbols-outlined">done</span>
                    <span class="material-symbols-outlined">delete</span>
                </span>
            </div>`;
            }
        });
    }
}
const EliminarDB = (actividad) =>{
    //console.log(e.srcElement.parentElement.parentElement.childNodes[2].innerHTML);
    //console.log('actividad es '+actividad);
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if(elemento.actividad === actividad) {
            indexArray = index;
        }
    })
    arrayActividades.splice(indexArray,1);
    GuardarDB();

}

const EditarDB = (actividad) => {

    let indexArray = arrayActividades.findIndex((elemento) =>elemento.actividad === actividad)
    //console.log(indexArray);
    arrayActividades[indexArray].estado = true;
    GuardarDB();

}


// eventlintener ______________________________________________________________________________________
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;
    CrearItem(actividadUI);
    //console.log(arrayActividades);
    GuardarDB();

    formularioUI.reset();

})
document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    //console.log(e);
    if(e.target.innerHTML==='done' || e.target.innerHTML==='delete' ){
        let texto = e.srcElement.parentElement.parentElement.childNodes[2].innerHTML;
        if(e.target.innerHTML === 'delete'){
            EliminarDB(texto);
        }
        if(e.target.innerHTML === 'done'){
            EditarDB(texto);
        }
    }

})