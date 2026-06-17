var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (Directory.Exists(app.Environment.WebRootPath))
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var hasHttpsEndpoint =
    !string.IsNullOrWhiteSpace(builder.Configuration["HTTPS_PORT"]) ||
    (builder.Configuration["URLS"]?.Contains("https://", StringComparison.OrdinalIgnoreCase) ?? false);

if (hasHttpsEndpoint)
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

var indexFile = Path.Combine(
    app.Environment.WebRootPath ?? Path.Combine(app.Environment.ContentRootPath, "wwwroot"),
    "index.html");

if (File.Exists(indexFile))
{
    app.MapFallbackToFile("/index.html");
}

app.Run();
