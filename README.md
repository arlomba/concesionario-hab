# Ejercicio concesionario

## Base de datos

### Coches

- id
- marca
- modelo
- precio
- color
- cv

## API

### GET /coches

- Debe enviar todos los coches de la DB

### GET /coches/:id

- Debe enviar los datos del coche solicitado​

### POST /coches

- Permite crear un nuevo coche. En el body deberemos recibir la marca, el modelo, el precio, el color y los cv

### PUT /coches/:id

- Permite modificar un coche existente. En el body deberemos recibir la marca, el modelo, el precio, el color y los cv

### DELETE /coches/:id

- Permite borrar un coche existente

### EXTRA

- La petición GET a /coches debe permitir filtrados. Por ejemplo, puede recibir los query params marca, modelo, precio mínimo, precio máximo, color, cv min, cv max
