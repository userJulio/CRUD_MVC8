using CRUD_PERSONAS.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_PERSONAS.Datos
{
    public class AplicationDbContext:DbContext
    {
        public AplicationDbContext(DbContextOptions opciones) : base(opciones)
        {


        }

        public DbSet<Personas> PersonasBd { get; set; }

    }
}
