import express from 'express';
import {registerUser, login} from "../controller/user";
import {checkToken} from "../middleware/checkToken";
import {addArticle, getAllArticle, getArticleByAuthor} from "../controller/article";

// Create router instance
const router = express.Router();

// API user
router.post('/api/users', registerUser);
router.post('/api/users/login', login);
router.get('/api/user', checkToken);

// API article
router.post('/api/articles', addArticle);
router.get('/api/articles', getAllArticle);
router.put('/api/articles/:slug');
router.get('/api/articles/feed', getArticleByAuthor);

// API test
router.get('/abc');

export default router;