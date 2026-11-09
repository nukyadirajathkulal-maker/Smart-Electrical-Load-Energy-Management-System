const db = require("../config/db");

const getDashboard = (req, res) => {

    const user_id = req.user.id;

    db.query(
        "SELECT * FROM appliances WHERE user_id = ?",
        [user_id],
        (err, appliances) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            let totalAppliances = appliances.length;
            let totalPower = 0;
            let dailyUnits = 0;

            appliances.forEach((appliance) => {

                totalPower += appliance.power * appliance.quantity;

                dailyUnits +=
                    (appliance.power *
                        appliance.quantity *
                        appliance.hours_per_day) / 1000;

            });

            const monthlyUnits = dailyUnits * 30;

            const estimatedBill = monthlyUnits * 7.5;

            res.status(200).json({
                success: true,
                dashboard: {
                    totalAppliances,
                    totalPower,
                    dailyUnits: Number(dailyUnits.toFixed(2)),
                    monthlyUnits: Number(monthlyUnits.toFixed(2)),
                    estimatedBill: Number(estimatedBill.toFixed(2))
                }
            });

        }
    );

};

module.exports = {
    getDashboard
};