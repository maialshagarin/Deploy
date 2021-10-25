const connection = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login =  (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT * FROM users WHERE email = "${email}"`;
  connection.query(query, async (err, result) => {
    if (err) throw err;
    if (result[0]) {
      console.log(result[0])
      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid) {
        return res.status(403).json({
          success: false,
          message: `The password you’ve entered is incorrect`,
        });
      }
    }
    const payload = {
      userId: result._id,
      country: result.country,
      role: result.role,
    };

    const options = {
      expiresIn: "60m",
    };

    const token = await jwt.sign(payload, process.env.SECRET, options);
    res.status(200).json({
      success: true,
      message: `Email and Password are correct`,
      token: token,
    });
  });
};

module.exports = {
	login,
};
