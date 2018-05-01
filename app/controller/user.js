import {_createUser, _getCurrentUser, _logIn} from "../model/user";
import jwt from 'jsonwebtoken';
import config from "../config";

export const createUser = async (req, res) => {
	const {dataUser} = req.body;
	const data = await _createUser(dataUser);
	res.json(data)
};

export const logIn = async (req, res) => {
	const {dataUser} = req.body;
	const data = await _logIn(dataUser);
	res.json(data);
};

export const getCurrentUser = async (req, res) => {
	const { token } = req.query;
	const data = await _getCurrentUser(token);
	res.json(data);
};