import express from 'express';
import {createUser, logIn} from "../controller/user";
import {checkToken} from "../middleware/checkToken";

// Create router instance
const router = express.Router();

// API user
router.post('/register', createUser);
router.post('/login', logIn);

// API test
router.get('/abc', checkToken);

export default router;