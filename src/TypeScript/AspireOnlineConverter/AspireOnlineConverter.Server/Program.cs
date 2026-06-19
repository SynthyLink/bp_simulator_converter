using AspireOnlineConverter.Server.Classes;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

//builder.Logging.AddFile("Logs/myapp-{Date}.txt");




// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add services to the container.
builder.Services.AddProblemDetails();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];
var performer = new Performer();
var api = app.MapGroup("/api");
api.MapGet("weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");
api.MapGet("initial", () =>
{
    var init = performer.GetInitial();
    return init;
})
.WithName("GetInitial");

api.MapPost("forecastfromnumber", ([FromBody] OrbitalForecastConditionNumber condition, CancellationToken token)
    =>
{
    return PostForecastFromNumber(condition, token);
}).WithName("PostForecastFromNumber");

app.MapDefaultEndpoints();

app.UseFileServer();

//app.UseStaticFiles();

app.Run();


//[HttpPost(Name = "forecastfromnumber")]
async Task<OrbitalForecastItemNumber[]> PostForecastFromNumber([FromBody] OrbitalForecastConditionNumber condition, CancellationToken token)
{

    if (condition == null || condition.Begin >= condition.End)
    {
        return Enumerable.Empty<OrbitalForecastItemNumber>().ToArray();
    }
    var result = await performer.CalculateOrbitalForecastFromNubmerAsync(condition, token);
    if (result == null || !result.Any())
    {
        return Enumerable.Empty<OrbitalForecastItemNumber>().ToArray();
    }
    return result.ToArray();
}

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
