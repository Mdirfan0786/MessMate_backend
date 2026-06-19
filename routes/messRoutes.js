const express = require("express");

const router = express.Router();

const {
  getAllMesses,
  getMessById,
  createMess,
  updateMess,
  deleteMess,
} = require("../controllers/messController");

router.get("/", getAllMesses);

router.get("/:id", getMessById);

router.post("/", createMess);

router.put("/:id", updateMess);

router.delete("/:id", deleteMess);

module.exports = router;
