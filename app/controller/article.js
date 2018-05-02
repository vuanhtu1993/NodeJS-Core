import {_addArticle, _listArticles} from "../model/article";

export const addArticle = async (req, res) => {
	const { dataArticle } = req.body;
	const { token } = req.query;
	const data = await _addArticle(dataArticle, token);
	res.json(data);
};

export const listArticles = async (req, res) => {
	const { tag, author } = req.query;
	let queryParam = {};
	if (tag) {
		queryParam = { tagList: tag }
	} else if (author) {
		queryParam = { 'author.username': author }
	}
	const data = await _listArticles(queryParam);
	res.json(data);
};