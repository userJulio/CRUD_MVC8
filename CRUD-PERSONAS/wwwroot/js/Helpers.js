export const ApiPersona = async (url, options) => {

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(response);
        return data;

    } catch (error) {
        return false;
        console.log("Hubo un error");
    }
}

export const SerializarFormulario = (formEditarPersona) => {

    let objPersona = {};

    const formData2 = new FormData(formEditarPersona);
    for (const [key, value] of formData2) {
        objPersona[key] = value;
    }
    return objPersona;
}

export const SetearInputsFormulario = (data) => {

    for (const [key, valores] of Object.entries(data)) {
        let seletector = `[name='${key}']`;
        document.querySelector(seletector).value = valores;
    }

}
export const LimpiarFormulario = (formulario) => {

    let data = SerializarFormulario(formulario);

    for (const [key, valores] of Object.entries(data)) {

        let seletector = `[name='${key}']`;
        if (key == "id") {
            document.querySelector(seletector).value = 0;
        } else {
            document.querySelector(seletector).value = "";
        }
    }
}

export const limpiarValidacionFormulario = (formulario) => {
    let objetoform = SerializarFormulario(formulario);

    for (const [key, valores] of Object.entries(objetoform)) {
        let seletector = `[name='${key}']`;
        document.querySelector(seletector).classList.remove("errorinput");
    }

}

export const cerrarModal = (BtnsCerrarModal) => {

    for (let i = 0; i < BtnsCerrarModal.length; i++) {
        BtnsCerrarModal[i].addEventListener('click', () => {
            $("#idmodalpersona").modal('hide');
        });
    }
 //   $("#idmodalpersona").modal('hide');
}

export const validarFormulario = (formulario) => {

    let objetoform = SerializarFormulario(formulario);
    let valido = false;
    let aux = 0;

    for (const [key, valores] of Object.entries(objetoform)) {
        let seletector = `[name='${key}']`;
        document.querySelector(seletector).classList.remove("errorinput");
        if (valores == "") {
            if (key != "id") {
                aux = 1;
                document.querySelector(seletector).classList.add("errorinput");
            }
        }
    }

    valido = aux == 1 ? true : false;
    return valido;

}