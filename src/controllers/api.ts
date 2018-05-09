import * as express from "express";
// import {Request, Response, NextFunction} from "express";

const router = express.Router();
import User from "../models/User";


router.post('/api/users', (req: any, res: any, next: any) => {
    const {username, email, password} = req.body.user;
    const user = new User() as any;
    user.username = username;
    user.password = user.setPassword(password);
    user.email = email;
    user.save()
        .then((user: any) => res.status(200).json({
            success: true,
            user,
        }))
        .catch((err: any) => res.status(400).json({
            success: false,
            error: err,
        }));
});

router.get("/api/abc", (req, res) => res.send("xxx"));
export default router;
