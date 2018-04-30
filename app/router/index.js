import express from 'express';
import {createUser, logIn} from "../controller/user";
import {checkToken} from "../middleware/checkToken";

// Create router instance
const router = express.Router();

// API user
router.post('/api/users', createUser);
router.post('/api/users/login', logIn);

// API test
router.get('/abc', checkToken);

export default router;