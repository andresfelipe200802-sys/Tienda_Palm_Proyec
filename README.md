# Carrito de Compras - Tienda CBI Palmira 🛒

**Nombre del Aprendiz:** Andrés (Reemplazar con tu apellido y nombre)
**Ficha:** (Reemplazar con tu número de ficha)
**Instructor:** Daniel Alfonso Martínez Payán
**Tecnología usada:** React (Vite) + CSS puro + JavaScript

## Descripción del Proyecto
Este proyecto es la solución al reto "Carrito de Compras con Validaciones de Stock" del Centro de Biotecnología Industrial - SENA Palmira.
Se ha construido un carrito de compras interactivo con validaciones estrictas en el frontend utilizando React, cumpliendo con todos los requerimientos de la rúbrica y los 12 casos de prueba del instructor.

Se aplicaron principios de arquitectura limpia:
- **Custom Hooks (`useCart`, `useToast`):** Para separar la lógica de negocio y las notificaciones de la vista.
- **Componentes Modulares:** Tarjetas, Navbar, Drawer y un `QuantityInput` centralizado y blindado contra inputs inválidos.
- **Diseño Premium:** Uso de paleta de colores acorde a la región, glassmorphism y notificaciones auto-descartables no bloqueantes.

## Instalación y Ejecución Local

1. Asegúrate de tener **Node.js** instalado (versión 18+ recomendada).
2. Clona el repositorio y navega a la carpeta del proyecto.
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre en tu navegador la URL que indique la consola (usualmente `http://localhost:5173`).

---

## Evidencias del Aprendiz (Casos Funcionales)

*(Reemplaza el texto en la columna de capturas por el nombre real de tu imagen en la carpeta `/evidencias`)*

| # | Funcionalidad | Captura (nombre o ruta) | ¿Funciona? (Sí/No) |
|---|---|---|:---:|
| 1 | Navbar e ícono con contador | `evidencias/1-navbar.png` | **Sí** |
| 2 | Agregar producto desde el catálogo | `evidencias/2-agregar.png` | **Sí** |
| 3 | Bloqueo de la tecla "e" y de negativos / 0 | `evidencias/3-bloqueo.png` | **Sí** |
| 4 | Toast de stock máximo | `evidencias/4-maximo.png` | **Sí** |
| 5 | Toast de cantidad mínima con opción de eliminar | `evidencias/5-minimo.png` | **Sí** |
| 6 | Subtotales y total con varios productos | `evidencias/6-totales.png` | **Sí** |
| 7 | Producto eliminado y total recalculado | `evidencias/7-eliminado.png` | **Sí** |

---
**Despliegue:** (Añadir enlace de Vercel/Netlify si se desea)
