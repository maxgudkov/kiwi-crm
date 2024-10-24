using Microsoft.EntityFrameworkCore;
using KiwiCRM.Models;

namespace KiwiCRM.Data;

public class CRMContext : DbContext
{
    public CRMContext(DbContextOptions<CRMContext> options) : base(options) { }

    public DbSet<Customer> Customers { get; set; }
    public DbSet<Opportunity> Opportunities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>()
            .HasMany(c => c.Opportunities)
            .WithOne(o => o.Customer)
            .HasForeignKey(o => o.CustomerId)
            .IsRequired();
    }
}

