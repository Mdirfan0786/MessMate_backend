const { Op } = require("sequelize");
const Mess = require("../models/Mess");

// GET ALL MESSES + FILTER + PAGINATION

const getAllMesses = async (req, res) => {
  try {
    const whereClause = {};

    // Filter by location
    if (req.query.location) {
      whereClause.location = req.query.location;
    }

    // Filter by minimum price
    if (req.query.minPrice) {
      whereClause.price = {
        [Op.gte]: parseInt(req.query.minPrice),
      };
    }

    const messes = await Mess.findAll({
      where: whereClause,
      limit: parseInt(req.query.limit) || 10,
      offset: parseInt(req.query.offset) || 0,
    });

    res.status(200).json({
      success: true,
      count: messes.length,
      data: messes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE MESS

const getMessById = async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    res.status(200).json({
      success: true,
      data: mess,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE MESS

const createMess = async (req, res) => {
  try {
    const { name, location, price, rating } = req.body;

    // Check if mess already exists

    const existingMess = await Mess.findOne({
      where: {
        name,
        location,
      },
    });

    if (existingMess) {
      return res.status(400).json({
        success: false,
        message: "Mess already exists",
      });
    }

    const newMess = await Mess.create({
      name,
      location,
      price,
      rating,
    });

    res.status(201).json({
      success: true,
      data: newMess,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE MESS

const updateMess = async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    await mess.update(req.body);

    res.status(200).json({
      success: true,
      message: "Mess updated successfully",
      data: mess,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE MESS

const deleteMess = async (req, res) => {
  try {
    const mess = await Mess.findByPk(req.params.id);

    if (!mess) {
      return res.status(404).json({
        success: false,
        message: "Mess not found",
      });
    }

    await mess.destroy();

    res.status(200).json({
      success: true,
      message: "Mess deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllMesses,
  getMessById,
  createMess,
  updateMess,
  deleteMess,
};
