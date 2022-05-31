const {
  getCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById,
} = require("../controllers/cars");
const router = require("express").Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", createCar);
router.put("/:id", updateCarById);
router.delete("/:id", deleteCarById);

module.exports = router;
