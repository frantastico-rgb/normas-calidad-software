# NORMAS DE CALIDAD SOFTWARE

> Aplicación interactiva para explorar normas de calidad de software, SGSI, SPICE (ISO/IEC 15504), y recursos descargables.

---

## 🚀 Características principales

- **Ventana flotante de bienvenida**: Modal que aparece al ingresar por primera vez, con mensaje de bienvenida, video explicativo (YouTube), y botones de entrada/salida. El modal solo se muestra en la primera visita o según preferencia del usuario (usa localStorage).

- **Video introductorio**: Acceso directo a un video explicativo sobre la página, embebido en el modal de bienvenida.

- **Evaluador SPICE (ISO/IEC 15504)**: Evaluador interactivo integrado para la norma ISO/IEC 15504, permitiendo autoevaluación y visualización de resultados.

- **SGSI Interactivo (MapaCid)**: Mapa interactivo completo del Sistema de Gestión de Seguridad de la Información, con:
	- C.I.D. (Confidencialidad, Integridad, Disponibilidad)
	- Ciclo PDCA
	- Dominios de seguridad
	- Quiz interactivo
	- Estudio de caso

- **Botones de descarga/exportación PDF**: En la sección de normas, botones rojo y verde permiten descargar recursos PDF:
	- [Estudio de caso ISO 27001](public/estudio-caso-iso27001.md)
	- [ISO IEC E ISO INTERNACIONAL Integración de Seguridad.pdf](public/ISO%20IEC%20E%20ISO%20INTERNACIONAL%20Integraci%C3%B3n%20de%20Seguridad.pdf)

- **UI moderna y responsiva**: Construida con React, Vite y Tailwind CSS para una experiencia de usuario ágil y atractiva.

---

## 📁 Estructura del proyecto

- `src/App.jsx`: Lógica principal de la aplicación, modal, evaluador SPICE, botones PDF, y acceso al SGSI Interactivo.
- `src/MapaCid.jsx`: Componente SGSI Interactivo (C.I.D., PDCA, dominios, quiz, estudio de caso).
- `public/estudio-caso-iso27001.md`: Recurso descargable de estudio de caso.
- `public/ISO IEC E ISO INTERNACIONAL Integración de Seguridad.pdf`: PDF descargable sobre integración de seguridad.
- Otros archivos: configuración de Vite, Tailwind, scripts de setup, favicons, etc.

---

## 🛠️ Instalación y uso

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar dependencias.
3. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Scripts disponibles

- `npm install`: Instala las dependencias.
- `npm run dev`: Ejecuta la app en modo desarrollo.
- `npm run build`: Genera la build de producción en la carpeta `dist`.
- `npm run preview`: Sirve la build de producción localmente.

---

## 📦 Dependencias principales

- React
- Vite
- Tailwind CSS
- lucide-react (iconos)
- recharts (gráficas)

---

## 📚 Recursos y descargas

- [Estudio de caso ISO 27001 (Markdown)](public/estudio-caso-iso27001.md)
- [ISO IEC E ISO INTERNACIONAL Integración de Seguridad (PDF)](public/ISO%20IEC%20E%20ISO%20INTERNACIONAL%20Integraci%C3%B3n%20de%20Seguridad.pdf)

---

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
# 🎓 Normas de Calidad de Software

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC.svg)](https://tailwindcss.com/)

Sistema educativo interactivo para aprender y aplicar normas internacionales de calidad en el desarrollo de software.

## 🌟 Características

- ✅ **Selector de Perfil Personalizado**: Tres roles (Estudiante, Freelancer, Gestor)
- 🔍 **Comparador Interactivo de Normas**: ISO/IEC 27001, 25010, CMMI, SPICE y más
- 💬 **Asistente Claude con IA**: Consultas contextuales sobre normas
- 📊 **Filtros Avanzados**: Por foco, exigencia y dominio
- 🎨 **Interfaz Moderna y Responsive**: Diseño mobile-first
- 🔐 **Ejemplos de Seguridad**: RBAC, CRUD seguro, matrices de control

## 🚀 Demo en Vivo

🔗 [Ver aplicación](https://TU-USUARIO.github.io/normas-calidad-software/)

## 📚 Normas Incluidas

### Seguridad
- **ISO/IEC 27001** - Sistema de Gestión de Seguridad de la Información (SGSI)

# 🎓 Normas de Calidad de Software

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC.svg)](https://tailwindcss.com/)

> Sistema educativo e interactivo para aprender y aplicar normas internacionales de calidad en el desarrollo de software.

## 🌟 Características

- ✅ **Selector de perfil**: Estudiante, Desarrollador independiente, Gestor de proyecto
- 🔍 **Comparador de normas**: ISO/IEC 27001, 25010, CMMI, SPICE, 12207 y más
- 💬 **Asistente IA (Claude)**: Respuestas contextuales según tu perfil
- 📊 **Filtros avanzados**: Buscar por foco, exigencia y dominio
- 🎨 **Diseño responsive**: Optimizado para móvil y escritorio

## 🚀 Demo en vivo

🔗 [Ver aplicación (GitHub Pages)](https://frantastico-rgb.github.io/normas-calidad-software/)

## 📚 Normas incluidas (resumen)

- **Seguridad**: ISO/IEC 27001 (SGSI)
- **Calidad de producto**: ISO/IEC 25010 (reemplaza ISO/IEC 9126)
- **Procesos y madurez**: CMMI, ISO/IEC 15504 (SPICE), ISO/IEC 12207
- **PYMES / VSE**: ISO/IEC 29110
- **Gestión de servicios**: ISO/IEC 20000, ITIL

## 👥 Perfiles de usuario

- **Estudiante** — Fundamentos y prácticas esenciales (recomendado: ISO/IEC 29110, 25010)
- **Desarrollador independiente** — Prácticas ligeras y seguridad básica (recomendado: 29110, 27001, 25010)
- **Gestor / Empresa** — Certificación y madurez organizacional (recomendado: 27001, CMMI, SPICE)

## 🛠️ Tecnologías

- **Frontend**: React 18
- **Build**: Vite
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **IA**: Integración con Claude (Anthropic)

## 📦 Instalación local

```powershell
# Clonar el repositorio
git clone https://github.com/frantastico-rgb/normas-calidad-software.git

# Entrar al proyecto
cd normas-calidad-software

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

## 🌐 Despliegue

Este repositorio puede desplegarse en GitHub Pages. Cada push a `main` puede activar un flujo de CI que publique la carpeta `dist`.

## 📖 Uso básico

1. Abre la aplicación en el navegador.
2. Selecciona tu perfil.
3. Explora las normas y aplica filtros.
4. Usa el asistente IA para preguntas concretas.

## 🎯 Roadmap (ideas)

- Mapas conceptuales interactivos
- Calculadora de métricas (ISO/IEC 25010)
- Casos de uso y ejemplos prácticos
- Modo oscuro y persistencia de progreso
- Exportar reportes en PDF

## 🤝 Contribuciones

1. Haz fork del repositorio.
2. Crea una rama para tu feature: `git checkout -b feature/mi-cambio`.
3. Haz commit de tus cambios: `git commit -m "Describe tu cambio"`.
4. Push y abre un Pull Request.

## 📄 Licencia

Este proyecto se distribuye bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado para aprendices SENA. Si quieres que ponga tu nombre como autor en `LICENSE`, dímelo y lo actualizo.

---

Si quieres, puedo:

- Crear el archivo `LICENSE` con la licencia MIT (puedes indicar el nombre a poner como titular).
- Hacer un commit con estos cambios y pushear al remoto.
