// get instance of mongoose
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  body: String,
  favoritesCount: {type: Number, default: 0},
  tagList: [{type: String}],
  author: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamp: true});

ArticleSchema.methods.convertTitleToSlug = function (title) {
  return this.slug = convertStr(title);
};

const convertStr = (str) => {
  str = str.replace(/[^a-zA-Z0-9\s]/g, "");
  str = str.toLowerCase();
  str = str.replace(/\s/g, '-');
  return str;
};

const Article = mongoose.model('article', ArticleSchema);
export default Article;