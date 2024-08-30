"use stritct"
(function () {



    // El problema es que implementar un IIFE, si evita que nuestro código se mezcle con otro, pero el problema que tendriamos es que si queremos tener un código más ordenado y separar en distintos archivos sería imposible hacerlo

    // En este caso la forma de hacerlo seria con...
    // window.nombreCliente =  'Juan';

    // Lo cual es una solución, he visto proyectos grandes que están registrados de esa forma para mantener acceso a las funciones y métodos  
})();
export const ApiPersonaPrueba = async (url, options) => {

    try {
        const response = await fetch(url, options);
        const msg = await response.json();
        console.log(msg);

    } catch (error) {
        console.log("Hubo un error al actualizar la persona");
    }
}

export const retornaAlgo = () => {
    return "Hola";
}

//let objApi = {
//    ApiPersona
//}

//export {
//    objApi
//}