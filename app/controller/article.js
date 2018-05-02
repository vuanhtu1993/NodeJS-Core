import {_addArticle, _listArticles} from "../model/article";

export const addArticle = async (req, res) => {
	const { dataArticle } = req.body;
	const { token } = req.query;
	const data = await _addArticle(dataArticle, token);
	res.json(data);
};

export const listArticles = async (req, res) => {
	const data = await _listArticles();
	res.json(data);
};