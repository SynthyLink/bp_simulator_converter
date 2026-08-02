
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



var t = TradingInit.Create(app);

await t;

app.MapDefaultEndpoints();

app.UseFileServer();

//app.UseStaticFiles();

app.Run();


//[HttpPost(Name = "forecastfromnumber")]
