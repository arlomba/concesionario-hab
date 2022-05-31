const getPool = require("../../database/getPool");

exports.getCars = async (req, res, next) => {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      "SELECT * FROM coches WHERE marca LIKE ? AND modelo LIKE ? AND precio BETWEEN ? AND ? AND color LIKE ? AND cv BETWEEN ? AND ? ORDER BY marca, modelo",
      [
        req.query.marca || "%",
        req.query.modelo || "%",
        req.query.minPrecio || 0,
        req.query.maxPrecio || Number.MAX_VALUE,
        req.query.color || "%",
        req.query.minCV || 0,
        req.query.maxCV || Number.MAX_VALUE,
      ]
    );

    if (result.length === 0) {
      res.status(404).json({
        status: "error",
        message:
          "No existen coches con los criterios de búsqueda especificados",
      });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const pool = getPool();

    const [result] = await pool.query("SELECT * FROM coches WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No existe el coche con el ID especificado",
      });
      return;
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.createCar = async (req, res, next) => {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      "INSERT INTO coches (marca, modelo, precio, color, cv) VALUES (?, ?, ?, ?, ?)",
      [
        req.body.marca,
        req.body.modelo,
        req.body.precio,
        req.body.color,
        req.body.cv,
      ]
    );

    if (result.affectedRows === 0) {
      res.status(500).json({
        status: "error",
        message: "No se ha podido crear el coche",
      });
      return;
    }

    res.status(201).json({
      status: "ok",
      message: "Coche creado correctamente",
      data: {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio,
        color: req.body.color,
        cv: req.body.cv,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCarById = async (req, res, next) => {
  try {
    const pool = getPool();

    const [result] = await pool.query(
      "UPDATE coches SET marca = ?, modelo = ?, precio = ?, color = ?, cv = ? WHERE id = ?",
      [
        req.body.marca,
        req.body.modelo,
        req.body.precio,
        req.body.color,
        req.body.cv,
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        status: "error",
        message: "No existe el coche con el ID especificado",
      });
      return;
    }

    res.status(200).json({
      status: "ok",
      message: "Coche actualizado correctamente",
      data: {
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio,
        color: req.body.color,
        cv: req.body.cv,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCarById = async (req, res, next) => {
  try {
    const pool = getPool();

    const [result] = await pool.query("DELETE FROM coches WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({
        status: "error",
        message: "No existe el coche con el ID especificado",
      });
      return;
    }

    res.status(200).json({
      status: "ok",
      message: "Coche eliminado correctamente",
    });
  } catch (err) {
    next(err);
  }
};
