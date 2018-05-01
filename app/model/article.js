// get instance of mongoose
import mongoose from 'mongoose';
import {_getCurrentUser} from "./user";

const Scheme = mongoose.Schema;

const articleTable = new Scheme({
	slug: String,
	title: String,
	description: String,
	body: String,
	tagList: Array,
	createdAt: String,
	updatedAt: String,
	favorite: Boolean,
	favoritesCount: Number,
	author: {
		id: String,
		username: String,
		bio: String,
		image: String,
		following: Boolean,
	},
	comment: [
		{
			author: {
				username: String,
				bio: String,
				image: String,
				following: Boolean,
			},
			body: String,
		}
	],
});

const Article = mongoose.model('Article', articleTable);

export const _addArticle = async (dataArticle, token) => {
	const { title, description, body, tagList } = dataArticle;
	const dataCurrentUser = await _getCurrentUser(token);
	const { _id, username, bio, image } = dataCurrentUser.users[0];
  const newArticle = new Article({
    slug: convertTitleToSlug(title),
		title: title,
		description: description,
		body: body,
		tagList: tagList,
		favorite: false,
		favoritesCount: 0,
		author: {
    	id: _id,
      username,
			bio,
			image,
			following: false,
		}
	});
	return newArticle.save()
		.then((article) => ({ success: true, article: article }))
		.catch((err) => ({ success: false, err: err }));
};

export const convertTitleToSlug = (str) => {
	str = str.replace(/[^a-zA-Z0-9\s]/g,"");
	str = str.toLowerCase();
	str = str.replace(/\s/g,'-');
	return str;
};
