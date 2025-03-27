# Conversor de Archivos

Este proyecto es una herramienta para convertir archivos de un formato a otro (no todos los formatos están implementados). Está diseñado para ser fácil de usar y personalizable según distintos casos de uso.

## Características
- Conversión de archivos de forma sencilla.
- Soporte para estilos y plantillas personalizadas.
- Ligero y rápido.

## Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:
- `Node.js` (versión 14 o superior)
- `npm` o `yarn` (o el gestor que prefieras)

## Instalación
1. Clona el repositorio:
```bash
   git clone https://github.com/PabloViniegra/file-converter-app.git
   cd md-to-pdf-converter
```
2. Instala las dependencias:
```bash
   npm install
   o
   yarn install
```

## Variables de Entorno
El proyecto requiere que se configuren las siguientes variables de entorno:

- `VITE_API_URI`: La URL de la API que se comunica con el backend
  (https://github.com/PVP-ORG-PER/file-converter).

Crea un archivo .env en la raíz del proyecto y agrega las variables:
```
VITE_API_URI=http://localhost:3000 # por ejemplo
```

## Ejecución Local
Para iniciar la aplicación en modo de desarrollo, ejecuta:
```bash
   npm run dev
   o
   yarn dev
```

## Contribuciones
Si deseas contribuir, siéntete libre de bifurcar el repositorio y enviar pull requests. ¡Se agradecen las contribuciones!

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
