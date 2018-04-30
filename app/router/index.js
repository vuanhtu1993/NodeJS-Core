import express from 'express';
import {createUser} from "../controller/user";

// Create router instance
const router = express.Router();

// API user
router.post('/signup', createUser);

export default router;