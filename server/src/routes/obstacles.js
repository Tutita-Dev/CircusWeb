const express = require("express");
const router = express.Router();
const mysqlConnection = require("../database.js");

//GET all

router.get("/obstaclesc/:levelId", (req, res) => {
    const { levelId } = req.params; //paso levelid que quiero
    const { location } = req.query; //paso location
   
    mysqlConnection.query("SELECT * FROM obstaclesc WHERE level_id=?", [levelId], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get("/level/:levelId", (req, res) => {
    const { levelId } = req.params; //paso levelid que quiero

    mysqlConnection.query("SELECT * FROM level WHERE id=?", [levelId], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


router.get("/player/:usuario/:pass", (req, res) => {
    const { usuario } = req.params; //paso levelid que quiero
    const { pass } = req.params;

    mysqlConnection.query("SELECT * FROM player WHERE usuario=? AND pass=?", [usuario, pass], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


module.exports = router;