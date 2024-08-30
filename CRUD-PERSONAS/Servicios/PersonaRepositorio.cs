using CRUD_PERSONAS.Datos;
using CRUD_PERSONAS.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_PERSONAS.Servicios
{
    public class PersonaRepositorio :  IPersonaRepositorio
    {
        private readonly AplicationDbContext dbcontext;

        public PersonaRepositorio(AplicationDbContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<List<Personas>> GetPersonas()
        {
            return await dbcontext.PersonasBd.ToListAsync();
        }

        public async Task<Personas?> GetPersona(int id)
        {
            var item = await dbcontext.PersonasBd.FirstOrDefaultAsync(x => x.Id == id);
            return item;

        }

        public async Task<int> Agregar(Personas persona)
        {
            dbcontext.PersonasBd.Add(persona);
            await dbcontext.SaveChangesAsync();
            return persona.Id;
        }

        public async Task Update(Personas persona, int id)
        {

            var item = await GetPersona(id);
            if (item is not null)
            {
                item.Nombres = persona.Nombres;
                item.Apellidos = persona.Apellidos;
                item.Edad = persona.Edad;
                item.Dni = persona.Dni;
                dbcontext.Update(item);
                await dbcontext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("No se pudo actualizar la persona");
            }


        }

        public async Task Eliminar(int id)
        {
            var item = await GetPersona(id);
            if (item is not null)
            {
                dbcontext.PersonasBd.Remove(item);
                await dbcontext.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("No se pudo elimino el registro");
            }
        }


    }
}
