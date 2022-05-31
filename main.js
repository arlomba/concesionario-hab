require("dotenv").config();
const express = require("express");

const { PORT } = process.env;
const app = express();

async function bootstrap() {
  try {
    app.use(express.urlencoded({ extended: true }));

    app.use("/coches", require("./routes/cars"));

    app.use((req, res, next) => {
      const error = new Error("Página no encontrada");
      error.status = 404;
      next(error);
    });

    app.use((err, req, res, next) => {
      console.error(err);

      res.statusCode = err.statusCode || 500;
      res.json({ status: "error", message: err.message });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
