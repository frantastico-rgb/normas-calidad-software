# Script para crear estructura del proyecto
Write-Host "🚀 Creando estructura del proyecto..." -ForegroundColor Green

# Crear carpetas
New-Item -ItemType Directory -Force -Path ".github\workflows" | Out-Null
New-Item -ItemType Directory -Force -Path "public" | Out-Null
New-Item -ItemType Directory -Force -Path "src" | Out-Null

Write-Host "✅ Carpetas creadas" -ForegroundColor Green

# Crear .gitignore
@"
# Dependencias
node_modules
package-lock.json

# Build
dist
dist-ssr
*.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# Crear vite.config.js
@"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/normas-calidad-software/',
})
"@ | Out-File -FilePath "vite.config.js" -Encoding UTF8

# Crear index.html
@"
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Sistema interactivo para aprender normas de calidad de software" />
    <title>Normas de Calidad de Software</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"@ | Out-File -FilePath "index.html" -Encoding UTF8

# Crear src/index.css
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
}
"@ | Out-File -FilePath "src/index.css" -Encoding UTF8

# Crear src/main.jsx
@"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"@ | Out-File -FilePath "src/main.jsx" -Encoding UTF8

# Crear src/App.jsx (placeholder)
@"
import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          ⚠️ Reemplaza este archivo con el código del artefacto
        </h1>
        <p className="text-gray-600">
          Copia el código completo del artefacto 'normas_calidad_app' aquí
        </p>
      </div>
    </div>
  );
};

export default App;
"@ | Out-File -FilePath "src/App.jsx" -Encoding UTF8

# Crear .github/workflows/deploy.yml
@"
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"@ | Out-File -FilePath ".github/workflows/deploy.yml" -Encoding UTF8

# Crear README.md
@"
# 🎓 Normas de Calidad de Software

Sistema educativo interactivo para aprender y aplicar normas internacionales de calidad en el desarrollo de software.

## 🚀 Características

- ✅ Selector de perfil personalizado (Estudiante, Freelancer, Empresa)
- 🔍 Comparador interactivo de normas (ISO/IEC, CMMI, SPICE)
- 💬 Asistente Claude con IA
- 📊 Filtros avanzados
- 🎨 Interfaz responsive

## 🛠️ Stack Tecnológico

- React 18
- Vite
- Tailwind CSS
- Claude API
- Lucide React Icons

## 📦 Instalación Local
``````bash
npm install
npm run dev
``````

## 🌐 Demo

Ver aplicación en vivo (próximamente)

## 📚 Normas Incluidas

- **ISO/IEC 27001** - Seguridad de la Información
- **ISO/IEC 25010** - Calidad del Producto
- **CMMI** - Madurez de Procesos
- **ISO/IEC 29110** - PYMES
- **ISO/IEC 12207** - Ciclo de Vida
- **ISO/IEC 15504** - SPICE

---

Desarrollado con ❤️ para aprendices SENA
"@ | Out-File -FilePath "README.md" -Encoding UTF8

Write-Host "✅ Todos los archivos creados exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 SIGUIENTE PASO:" -ForegroundColor Yellow
Write-Host "   1. Abre src/App.jsx" -ForegroundColor Cyan
Write-Host "   2. Reemplaza el contenido con el código del artefacto" -ForegroundColor Cyan
Write-Host "   3. Ejecuta: npm run dev" -ForegroundColor Cyan
Write-Host ""