# Orbital applications

`OnlineGameConverter/` is the existing ASP.NET/React application registered as the
root npm workspace. `AspireOnlineConverter/` is the alternate Aspire-era orbital
server/frontend. Its AppHost project is only a scaffold in this checkout.
`generated/SpaceCraft.Docking/` preserves generated docking models.

See the [root quick start](../../README.md), [generated-code inventory](../../docs/generated-code.md)
and [validation instructions](../../experiments/orbital/README.md). The legacy
OnlineGameConverter also includes trading routes; separating those controllers
would change application boundaries and is deferred.
