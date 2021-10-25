const { connect } = require('./../../db/db');
const connection = require('./../../db/db');

const getAllArticles = (req, res) => {
	const query = "SELECT * FROM articles WHERE is_deleted = 0"

	connection.query(query,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(result);
	})
	
};

const getArticlesByAuthor = (req, res) => {
	const author = req.query.author;

	if (!author) return res.status(404).json('not found');

	const query = "SELECT * FROM articles WHERE is_deleted = 0 AND author_id = ?"
	const authorId = [author]

	connection.query(query,authorId,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(result);
	})
};

const getAnArticleById = (req, res) => {
	const _id = req.params.id;

	if (!_id) return res.status(404).json('not found');

	const query = "SELECT firstName, users.id ,title, description, author_id FROM users RIGHT JOIN articles ON users.id = articles.author_id WHERE articles.id=? AND articles.is_deleted=0";
	const articleId = [_id];

	connection.query(query,articleId,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(result);
	})

	
};

const createNewArticle = (req, res) => {
	const { title, description, author } = req.body;
	const query = "INSERT INTO articles (title, description, author_id) VALUES (?,?,?)"
	const articleData = [title, description, author];

	connection.query(query,articleData,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(articleData);
	})
};

const updateAnArticleById = (req, res) => {
	const id = req.params.id;
	const {title,author,description} = req.body;
	const query = "UPDATE articles SET title =?, author_id=?, description=? WHERE id= ?"
	const updateData = [title, author, description, id];

	connection.query(query,updateData,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(updateData);
	})
	
};

const deleteArticleById = (req, res) => {
	const id = req.params.id;
	const query = "UPDATE articles SET is_deleted=1 Where id = ?";
	const article_id = [id];

	connection.query(query,article_id,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(result);
	})
};

const deleteArticlesByAuthor = (req, res) => {
	const author = req.body.author;

	const query = "UPDATE articles SET is_deleted=1 Where author_id = ?"
	const author_id = [author];

	connection.query(query,author_id,(err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(result);
	})
};

module.exports = {
	getAllArticles,
	getArticlesByAuthor,
	getAnArticleById,
	createNewArticle,
	updateAnArticleById,
	deleteArticleById,
	deleteArticlesByAuthor,
};
