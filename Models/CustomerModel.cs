using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace KiwiCRM.Models;

public class Customer
{
    public int CustomerId { get; set; }
    [Length(2, 50)] public required string Name { get; set; }
    [EmailAddress] public required string Email { get; set; }
    [Phone] public string? Phone { get; set; }
    [EnumDataType(typeof(CustomerStatus))] public required string Status { get; set; }
    public string CreatedAt { get; set; } = DateTime.Now.ToString("o");

    public ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
}

public class Opportunity
{
    public int OpportunityId { get; set; }
    [MaxLength(80)] public required string Name { get; set; }
    [EnumDataType(typeof(OpportunityStatus))] public required string Status { get; set; }
    public int CustomerId { get; set; }
    [JsonIgnore] public Customer? Customer { get; set; }
}

public enum CustomerStatus
{
    Active,
    NonActive,
    Lead
}

public enum OpportunityStatus
{
    New,
    ClosedWon,
    ClosedLost
}
