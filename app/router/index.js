import express from 'express';
import {registerUser, login} from "../controller/user";
import {checkToken} from "../middleware/checkToken";
import {addArticle, getAllArticle, getArticleByAuthor} from "../controller/article";

// Create router instance
const router = express.Router();

// API user
router.post('/api/users', registerUser);
router.post('/api/users/login', login);
router.get('/api/user');

// API article
router.post('/api/articles', checkToken, addArticle);
router.get('/api/articles', getAllArticle);
router.put('/api/articles/:slug');
router.get('/api/articles/feed', checkToken, getArticleByAuthor);

// API test
router.get('/abc');

export default router;