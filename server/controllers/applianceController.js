const db = require("../config/db");

// =========================
// Add Appliance
// =========================
const addAppliance = (req, res) => {
    try {
        const user_id = req.user.id;

        const {
            appliance_name,
            power,
            hours_per_day,
            quantity,
            room
        } = req.body;

        if (!appliance_name || !power || !hours_per_day) {
            return res.status(400).json({
                success: false,
                message: "Appliance Name, Power and Hours are required"
            });
        }

        db.query(
            "INSERT INTO appliances(user_id, appliance_name, power, hours_per_day, quantity, room) VALUES(?,?,?,?,?,?)",
            [
                user_id,
                appliance_name,
                power,
                hours_per_day,
                quantity || 1,
                room || null
            ],
            (err) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Appliance Added Successfully"
                });

            }
        );

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Get All Appliances
// =========================
const getAppliances = (req, res) => {

    const user_id = req.user.id;

    db.query(
        "SELECT * FROM appliances WHERE user_id = ? ORDER BY id DESC",
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                appliances: result
            });

        }
    );
};

// =========================
// Update Appliance
// =========================
const updateAppliance = (req, res) => {

    const { id } = req.params;
    const user_id = req.user.id;

    const {
        appliance_name,
        power,
        hours_per_day,
        quantity,
        room
    } = req.body;

    if (!appliance_name || !power || !hours_per_day) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided"
        });
    }

    db.query(
        `UPDATE appliances
         SET appliance_name = ?,
             power = ?,
             hours_per_day = ?,
             quantity = ?,
             room = ?
         WHERE id = ? AND user_id = ?`,
        [
            appliance_name,
            power,
            hours_per_day,
            quantity,
            room,
            id,
            user_id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Appliance not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Appliance Updated Successfully"
            });

        }
    );
};

// =========================
// Delete Appliance
// =========================
const deleteAppliance = (req, res) => {

    const { id } = req.params;
    const user_id = req.user.id;

    db.query(
        "DELETE FROM appliances WHERE id = ? AND user_id = ?",
        [id, user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Appliance not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Appliance Deleted Successfully"
            });

        }
    );
};

// =========================
// Export
// =========================
module.exports = {
    addAppliance,
    getAppliances,
    updateAppliance,
    deleteAppliance
};