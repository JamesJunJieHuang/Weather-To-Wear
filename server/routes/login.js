const express = require("express");
const router = express.Router();

//GET
router.get('/', (req, res) => {res.status(200).json("logged in")})




module.exports = router;