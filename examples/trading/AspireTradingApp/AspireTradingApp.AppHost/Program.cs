/*var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.AspireTradingApp_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var webfrontend = builder.AddViteApp("webfrontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(webfrontend, "wwwroot");

builder.Build().Run();*/
var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.AspireTradingApp_Server>("server");

builder
    .AddViteApp("frontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

builder.Build().Run();

