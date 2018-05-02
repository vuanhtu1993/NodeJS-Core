import {_addArticle, _feedArticles, _listArticles, _updateArticle} from "../model/article";

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

export const feedArticles = async (req, res) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	const data = await _feedArticles(token);
	res.json(data);
};

export const updateArticle = async (req, res) => {
	const { slug } = req.params;
	const { article } = req.body;
	const data = await _updateArticle(slug, article);
	res.json(data);
};