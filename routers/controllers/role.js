const connection = require('./../../db/db');

const createNewRole = (req, res) => {
	const { role } = req.body;

	const query = "INSERT INTO roles (role) VALUES (?)"
	const userRole = [role];

	connection.query(query,userRole,(err,result)=>{
		if (err) {
			res.send(err);
			return;
		}
		res.status(201).json(result);
	})
};

module.exports = {
	createNewRole,
};
