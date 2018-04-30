import express from 'express';
import {createUser, signIn} from "../controller/user";

// Create router instance
const router = express.Router();

// API user
router.post('/signup', createUser);
router.post('/signin', signIn);

export default router;