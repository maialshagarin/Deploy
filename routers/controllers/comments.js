const commentsModel = require('./../../db/models/comments');
const connection = require("./../../db/db");

const createNewComment = (req, res) => {
	const articleId = req.params.id;

	const { comment, commenter } = req.body;

	const query = "INSERT INTO comments (comment, article_id, commenter_id) VALUES (?,?,?)";
	const commentData = [ comment, articleId, commenter];

	connection.query(query,commentData, (err,result)=>{
		if (err) {
			res.send(err);
			return
		}
		res.status(200).json(comment);
	})
};

module.exports = {
	createNewComment,
};
