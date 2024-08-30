using CRUD_PERSONAS.Models;

namespace CRUD_PERSONAS.Servicios
{
    public interface IPersonaRepositorio
    {
        Task<int> Agregar(Personas persona);
        Task Eliminar(int id);
        Task<Personas?> GetPersona(int id);
        Task<List<Personas>> GetPersonas();
        Task Update(Personas persona, int id);
    }
}