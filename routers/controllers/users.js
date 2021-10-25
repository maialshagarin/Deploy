const connection = require('./../../db/db');
const bcrypt = require('bcrypt');

const createNewAuthor = async (req, res) => {
	const { firstName, lastName, age, country, email, password, role } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	const query = "INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES (?,?,?,?,?,?,?)"
	const userData = [firstName, lastName, age, country, email, hashedPassword, role]

	connection.query(query,userData,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(201).json(result);
	})
};

module.exports = {
	createNewAuthor,
};
