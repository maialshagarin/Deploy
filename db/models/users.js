const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require("./../db");
const mysql = require ("mysql2/promise");

const users = new mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	age: { type: Number },
	country: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
});

// Hashed the password
users.pre('save', async function () {
	this.email = this.email.toLowerCase();
	this.password = await bcrypt.hash(this.password, 10);
});

// BASIC AUTH
users.statics.authenticateBasic =  async function (email, password) {
	const query = "SELECT password, id, country, role_id FROM users WHERE email=?";
		const loginData = [email];
		
		const connection = await mysql.createConnection({
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
		});

		try{
		const [rows,fields] = await connection.query(query,loginData)
		console.log('password: ',rows[0].password);
		if (rows.length === 0){
			return ["The email doesn't exist", 404];
		};
		const valid = await bcrypt.compare(password,rows[0].password);
		console.log(valid)
		if (valid){
			const payload = {
					userId: rows[0].id,
					country: rows[0].country,
					role: rows[0].role_id,
				};
			
				const options = {
					expiresIn: '60m',
				};
			
				return [jwt.sign(payload, process.env.SECRET, options), 200];
		};
		return ['The password you’ve entered is incorrect', 403];
	} catch (err){
		console.log(err);
		return err
	}
};

module.exports = mongoose.model('User', users);
