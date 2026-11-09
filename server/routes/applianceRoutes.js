const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    addAppliance,
    getAppliances,
    updateAppliance,
    deleteAppliance
} = require("../controllers/applianceController");

// Add Appliance
router.post("/", verifyToken, addAppliance);

// Get All Appliances
router.get("/", verifyToken, getAppliances);

// Update Appliance
router.put("/:id", verifyToken, updateAppliance);

// Delete Appliance
router.delete("/:id", verifyToken, deleteAppliance);

module.exports = router;