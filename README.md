# Backend–Frontend Converter

A component-based tool for migrating .NET computational models to TypeScript web applications.

## Purpose

This tool helps move engineering and simulation models from .NET/C# backend environments to browser-executable TypeScript.

Instead of full source-to-source translation, it uses a **component-based approach**: models are migrated by preserving structure (components, aliases, measurements, numerical processors, domain plugins) and providing matching TypeScript implementations.

## Key Features

- Dual execution: run the same model on C# server (reference) and in the browser (TypeScript)
- TypeScript runtime with support for ODE integration, motion equations, vectors, and aliases
- React web client for interactive testing and comparison
- Orbital forecasting case study (main example)

## Repository Structure

- `src/` — Main source code
  - Backend: ASP.NET Core + C# model implementations
  - Frontend: React + TypeScript runtime
- `tex/` — LaTeX sources for the research paper

## Quick Start

### Prerequisites

- .NET 10 SDK
- Node.js 18+ and npm

### React app with ASP.NET backend

The React client proxies API calls like `/weatherforecast` to the ASP.NET Core
server in `src/Web/ReactApp/ReactApp.Server`.

Run the ASP.NET API server in one terminal:

```bash
cd src/Web/ReactApp/ReactApp.Server
dotnet restore
dotnet run --launch-profile http
```

Then start Vite in a second terminal:

```bash
cd src/Web/ReactApp/reactapp.client
npm install
npm run dev
```

Open `https://localhost:58472/` in your browser. If the backend is not running
on `http://localhost:5059`, Vite will report `ECONNREFUSED` for proxied API
requests such as `/weatherforecast`.

## Main Case Study

**Orbital Forecasting Model**

- Motion equations + fixed-step numerical integration (Runge)
- Compares trajectory results between C# and TypeScript
- Used for validation during migration

## License

MIT (see LICENSE file)
