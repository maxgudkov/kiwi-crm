using Microsoft.AspNetCore.Mvc;
using KiwiCRM.Data;
using KiwiCRM.Models;
using Microsoft.EntityFrameworkCore;


namespace KiwiCRM.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly CRMContext _context;

    public CustomersController(CRMContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
    {
        var customers = await _context.Customers.Include(c => c.Opportunities).ToListAsync();

        return customers;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetCustomer(int id)
    {
        var customer = await _context.Customers.Include(c => c.Opportunities).FirstOrDefaultAsync(c => c.CustomerId == id);

        if (customer == null)
        {
            return NotFound();
        }

        return customer;
    }

    [HttpPost]
    public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
    {
        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
    }

    [HttpPut]
    public async Task<ActionResult<Customer>> PutCustomer(Customer customer)
    {
        _context.Customers.Update(customer);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Customer>> DeleteCustomer(int id)
    {
        var customer = await _context.Customers.FindAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}