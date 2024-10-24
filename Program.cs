using Microsoft.EntityFrameworkCore;
using KiwiCRM.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CRMContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CRMDatabase")));

builder.Services.AddControllers();

var app = builder.Build();

app.UseStaticFiles();

app.MapFallbackToFile("/index.html");

app.MapControllers();

app.Run();
