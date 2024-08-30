using CRUD_PERSONAS.Models;
using CRUD_PERSONAS.Servicios;
using Microsoft.AspNetCore.Mvc;

namespace CRUD_PERSONAS.Controllers
{
    public class PersonaController : Controller
    {
        private readonly IPersonaRepositorio ipersonarepositorio;

        public PersonaController(IPersonaRepositorio ipersonarepositorio)
        {
            this.ipersonarepositorio = ipersonarepositorio;
        }

        public async Task<IActionResult> GetObtenerTodos()
        {
            var listaPersonas = await ipersonarepositorio.GetPersonas();

            return new JsonResult(listaPersonas);
        }
        public async Task<IActionResult> Index()
        {
            // var listaPersonas = await ipersonarepositorio.GetPersonas();

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerPersona(int idperson)
        {
            var persona = await ipersonarepositorio.GetPersona(idperson);
            return new JsonResult(persona);
        }

        [HttpPut]
        public async Task<IActionResult> ActualizarPersona(int idperson, [FromBody] Personas person)
        {
           await ipersonarepositorio.Update(person, idperson);
            return new JsonResult("Se modifico correctamente la persona");
        }

        [HttpDelete]
        public async Task<IActionResult> EliminarPersona(int idPerson)
        {
            try
            {
                await ipersonarepositorio.Eliminar(idPerson);
                return new JsonResult("Se elimino correctamente el registro");
            }
            catch(Exception ex)
            {
               return BadRequest();
            }
                     
        }

        [HttpPost]
        public async Task<IActionResult> AgregarPersona([FromBody] Personas person)
        {
            try
            {
                await ipersonarepositorio.Agregar(person);
                return new JsonResult("Se creo correctamente");

            }catch(Exception ex)
            {
                return BadRequest();
            }

        }
    }
}
