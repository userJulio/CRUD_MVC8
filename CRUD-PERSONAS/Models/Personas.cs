using System.ComponentModel.DataAnnotations;

namespace CRUD_PERSONAS.Models
{
    public class Personas
    {
        [Key]
        public int Id { get; set; }
        public string Nombres { get; set; } = "";
        public string Apellidos { get; set; } = "";
        public int Edad { get; set; }

        public string Dni { get; set; } = "";


    }
}
