var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.AspireOnlineConverter_Server>("server");

builder
    .AddViteApp("frontend", "../frontend")
    .WithReference(server)
    .WaitFor(server);

builder.Build().Run();
