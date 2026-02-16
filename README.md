## Start with pnpm install 

## Run with pnpm dev

## Create .env file with the following content:

### Server structure 
```text
/src
  /config          # Configuración de DB, variables de entorno
  /models          # Esquemas de MongoDB (Mongoose)
  /routes          # Definición de rutas REST (Express)
  /controllers     # La lógica de las rutas (qué hace cada endpoint)
  /sockets         # Toda la lógica de WebSockets
  app.js           # Punto de entrada (inicialización)
```