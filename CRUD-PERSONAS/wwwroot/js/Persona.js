
import {
    ApiPersona, SerializarFormulario, SetearInputsFormulario, LimpiarFormulario,
    limpiarValidacionFormulario, cerrarModal, validarFormulario
} from './Helpers.js';


const idpersonhtml = document.querySelector("#idPerson");
const btnEditarPersona = document.querySelector("#btnEditarPersona");
const formEditarPersona = document.querySelector("#formularioEditarPersona");
const idmensaje = document.querySelector("#idmensaje");
const btnAgregar = document.querySelector("#idAgregar");
const titlemodal = document.querySelector("#titlemodal");
const idMensajeForm = document.querySelector("#idMensajeForm");
const idedad = document.querySelector("#idedad");
const BtnsCerrarModal = document.querySelectorAll(".close-modal");


document.addEventListener("DOMContentLoaded", () => {
    mostrarTodasPersonas();
});

//$(document).ready(function () {
 
//    mostrarTodasPersonas();
//});

const mostrarTodasPersonas = async () => {

    const UrlGet = new Request('/Persona/GetObtenerTodos');  //'@Url.Action("ObtenerPersona")?idperson=' + idPersona;
    const options = {
        method: "GET"
    }
    let data = await ApiPersona(UrlGet, options);
    let idtb = "#tbPersonas"
    mostrarDatatable(idtb, data)
    console.log("Mostrar todos los elementos", { data });

    const btnEditarModal = document.querySelectorAll(".idbtnEditarModal");
    const btnEliminarModal = document.querySelectorAll(".idbtnEliminarModal");

    for (let i = 0; i < btnEditarModal.length; i++) {
        btnEditarModal[i].addEventListener("click", async (e) => {
            let idPerson = e.target.getAttribute("id_atribute");
            await ModalEditar(idPerson);
        });
    }
    for (let j = 0; j < btnEliminarModal.length; j++) {
        btnEliminarModal[j].addEventListener("click", async (e) => {
            let idPerson = e.target.getAttribute("id_atribute");
            await ConfirmarEliminar(idPerson);
        });
    }
    
}



const ModalEditar = async (idPersona) => {

    idpersonhtml.value = idPersona;
    titlemodal.innerHTML = 'Editar Persona';
    $("#idmodalpersona").modal('show');
    limpiarValidacionFormulario(formEditarPersona);
    await MostrarPersonabyId(idPersona);
    idMensajeForm.innerHTML = '';
}

const MostrarPersonabyId = async (idPersona) => {
    let idp = parseInt(idPersona);
    const UrlGet = new Request('/Persona/ObtenerPersona/?idperson='+ idPersona);  //'@Url.Action("ObtenerPersona")?idperson=' + idPersona;
    const options = {
        method: "GET"
    }
    let data = await ApiPersona(UrlGet, options);
    console.log("data23", { data });
    SetearInputsFormulario(data);
   
}


cerrarModal(BtnsCerrarModal);




formEditarPersona.addEventListener("submit",async e => {
    e.preventDefault();
    let validarCampos = validarFormulario(formEditarPersona);
    if (idpersonhtml.value == 0) {    
        if (!validarCampos) {
            if (isNaN(idedad.value)) {
                idMensajeForm.innerHTML = 'El campo Edad debe ser número';
            } else { 
                if (Number(idedad.value) > 100 || Number(idedad.value) < 18 ) {
                    idMensajeForm.innerHTML = 'El campo edad debe estar entre 18 y 100';

                } else {
                    idMensajeForm.innerHTML = '';
                    await AgregarPerson();
                    mostrarAlertSweet("Se agrego correctamente el registro!!", "success");
                }
  
            }
        } else {
            idMensajeForm.innerHTML = 'Falta completar los campos en rojo';

        }     
    } else {
        if (!validarCampos) {
            if (isNaN(idedad.value)) {
                idMensajeForm.innerHTML = 'El campo Edad debe ser número';
            } else {
                if (Number(idedad.value) > 100 || Number(idedad.value) < 18) {
                    idMensajeForm.innerHTML = 'El campo edad debe estar entre 18 y 100';

                } else {
                    idMensajeForm.innerHTML = '';
                    await EditarPersona();
                    mostrarAlertSweet("Se modifico correctamente el registro!!", "success");
                }
            }
        } else {
            idMensajeForm.innerHTML = 'Falta completar los campos en rojo';
        }
    }
 
   

    
});

const EditarPersona = async () => {
    let objetPersonaEdit = SerializarFormulario(formEditarPersona);
    const UrlPut = new Request('/Persona/ActualizarPersona/?idperson=' + idpersonhtml.value);
    //'@Url.Action("ActualizarPersona")?idperson=' + idpersonhtml.value;
    const options = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetPersonaEdit)
    };
    let datos = await ApiPersona(UrlPut, options);
    if (datos) {
        await mostrarTodasPersonas();
        $("#idmodalpersona").modal('hide');
        idmensaje.innerHTML = '';
    } else {
        $("#idmodalpersona").modal('hide');
        idmensaje.innerHTML = `Ocurrio un error al actualizar la persona`;
    }

}

const ConfirmarEliminar =async (idPersona) => {
    //let preguntar = confirm("Esta seguro de eliminar el registro ?");
    let preguntar =await ConfirmarAccion("Esta seguro de eliminar el registro ?", "warning");

    if (preguntar) {
        const UrlDelete = new Request('/Persona/EliminarPersona/?idperson=' + idPersona);
        //'@Url.Action("ActualizarPersona")?idperson=' + idpersonhtml.value;

        const options = {
            method: "DELETE"
        };
        let datos = await ApiPersona(UrlDelete, options);
        if (datos) {
            mostrarAlertSweet("Se elimino correctamente el registro!!", "success");
            idmensaje.innerHTML = ``;
            await mostrarTodasPersonas();

        } else {
            idmensaje.innerHTML = `Ocurrio un error al Eliminar`;
        }
    }

}

btnAgregar.addEventListener("click",  () => {

    limpiarValidacionFormulario(formEditarPersona);
    $("#idmodalpersona").modal('show');
    LimpiarFormulario(formEditarPersona);
    titlemodal.innerHTML = 'Agregar Persona';
    idMensajeForm.innerHTML = '';
  
});



const AgregarPerson =async () => {
    let objetPersona = SerializarFormulario(formEditarPersona);
    const Url = new Request('/Persona/AgregarPersona');
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetPersona)
    };
    let datos = await ApiPersona(Url, options);

    if (datos) {
        await mostrarTodasPersonas();
        $("#idmodalpersona").modal('hide');
        idmensaje.innerHTML = '';
    } else {
        $("#idmodalpersona").modal('hide');
        idmensaje.innerHTML = `Ocurrio un error al agregar un nuevo registro`;
    }
}





const mostrarDatatable = (idDatatable,arrayData) => {

    $(idDatatable).DataTable({
        processing: false,
        destroy:true,
        responsive: true,
        data: arrayData,
        columns: [
            { "data": "id" , "title":"IdPersona"},
            { "data": "nombres", "title": "Nombres" },
            { "data": "apellidos", "title": "Apellidos" },
            { "data": "edad", "title": "Edad" },
            { "data": "dni", "title": "Dni" },
            {
                "data": null, "title": "Opciones", "render":
                    function (item) {
                        return `<button class="btn btn-primary idbtnEditarModal" id_atribute="${item.id}"  >Editar</button>
                         <button class="btn btn-danger idbtnEliminarModal"  id_atribute="${item.id}" >Eliminar</button>
                        ` }
            }
        ],
        paging: true,
        pageLength: 50,
        language: {
            search: "Buscar:",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Mostrando 0 a 0 de 0 registros",
            infoFiltered: "(filtrado de _MAX_ registros en total)",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior",


            },
        },
    });

}



function editarte() {
    console.log("Entro modal edit");
}


let ValoresNumeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
idedad.addEventListener("keypress", (e) => {
    var condicionNumeros = ValoresNumeros.every(campo => campo != String.fromCharCode(e.keyCode));
    if (condicionNumeros) {
        e.preventDefault();
    }
});

function mostrarAlertSweet(mensaje,icono) {

    Swal.fire({
        title: mensaje,
        icon: icono
    });
}
async function ConfirmarAccion(mensaje,icono) {

    let alertaConfirm = await Swal.fire({
        title: mensaje,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si"
    });
    let resultado = await alertaConfirm;

    return resultado.isConfirmed;
    //console.log(resultado.isConfirmed);

    //  .then((result) => {
    //    if (result.isConfirmed) {
            
    //    }
    //});

}


