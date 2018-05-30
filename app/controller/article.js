import Article from '../model/article';
import User from '../model/user';

export async function addArticle(req, res) {
  const token = req.headers['x-access-token'];
  const {title, description, body, tagList} = req.body.article;
	let article = new Article({title, description, body, tagList});
	article.slug = article.convertTitleToSlug(title);
	try {
    let user = await User.findOne({token: token});
    article.author = user;
    await article.save();
    res.send({success: true, article: article})
  } catch (err) {
	  res.send({success: false, error: err})
  }
}

export async function getAllArticle(req, res) {
  try {
    // Populate trường author đươc lấy trong bảng User
    let articles = await Article.find({}).populate('author');
    res.status(200).send({success: true, articles: articles});
  } catch (err){
    res.status(404).send({success: false, error: err})
  }
}

export async function getArticleByAuthor(req, res) {
  const token = req.headers['x-access-token'];
  try {
    let user = await User.findOne({token: token});
    // Nếu cần tường minh trường nào thì populate trường đó (đã config thuộc tính ref trong schema)
    let articles = await Article.find({author: user._id}).populate('author');
    res.status(200).send({success: true, articles: articles});
  } catch (err){
    res.status(404).send({success: false, error: err})
  }
}