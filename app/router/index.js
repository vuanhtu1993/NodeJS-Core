import express from 'express';
import {createUser, getCurrentUser, logIn} from "../controller/user";
import {checkToken} from "../middleware/checkToken";
import {addArticle, listArticles} from "../controller/article";

// Create router instance
const router = express.Router();

// API user
router.post('/api/users', createUser);
router.post('/api/users/login', logIn);
router.get('/api/user', checkToken, getCurrentUser);

// API article
router.post('/api/articles', checkToken, addArticle);
router.get('/api/articles', listArticles);

// API test
router.get('/abc');

export default router;