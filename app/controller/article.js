import {_addArticle} from "../model/article";

export const addArticle = async (req, res) => {
	const { dataArticle } = req.body;
	const { token } = req.query;
	const data = await _addArticle(dataArticle, token);
	res.json(data);
};