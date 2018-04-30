
import {_createUser, _logIn} from "../model/user";
import jwt from 'jsonwebtoken';
import config from "../config";

export const createUser = async (req, res) => {
	const {dataUser} = req.body;
	const data = await _createUser(dataUser);
	res.send(data);
};

export const logIn = async (req, res) => {
	const { dataUser } = req.body;
	let data = await _logIn(dataUser);
	res.send(data);
};