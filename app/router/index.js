import express from 'express';
import {createUser, getUser, logIn} from "../controller/user";
import {checkToken} from "../middleware/checkToken";

// Create router instance
const router = express.Router();

// API user
router.post('/api/users', createUser);
router.post('/api/users/login', logIn);
router.get('/api/user', checkToken, getUser);

// API test
router.get('/abc');

export default router;