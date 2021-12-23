using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


[Table("Cliente")]
public class Clientes
{
    [Column("ID")]
    public int ID { get; set; }

    [Column("NomeCliente")]
    public string NomeCliente { get; set; }

    [Column("DataNasc")]
    public string DataNasc { get; set; }

    [Column("Telefones")]
    public string Telefones { get; set; }

    [Column("Endereco")]
    public string Endereco { get; set; }

    [Column("RedeSociais")]
    public string RedeSociais { get; set; }

    [Column("CPF")]
    public string CPF { get; set; }

    [Column("RG")]
    public string RG { get; set; }


}


