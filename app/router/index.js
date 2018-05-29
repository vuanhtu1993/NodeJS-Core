import express from 'express';
import {registerUser, getCurrentUser, logIn} from "../controller/user";
import {checkToken} from "../middleware/checkToken";
import {addArticle, feedArticles, listArticles, updateArticle} from "../controller/article";

// Create router instance
const router = express.Router();

// API user
router.post('/api/users', registerUser);
router.post('/api/users/login');
router.get('/api/user', checkToken);

// API article
router.post('/api/articles', checkToken, addArticle);
router.get('/api/articles', listArticles);
router.put('/api/articles/:slug', checkToken, updateArticle);
router.get('/api/articles/feed', checkToken, feedArticles);

// API test
router.get('/abc');

export default router;