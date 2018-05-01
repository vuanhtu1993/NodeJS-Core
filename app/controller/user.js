import {_createUser, _getUser, _logIn} from "../model/user";
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

export const getUser = async (req, res) => {
	const data = await _getUser();
	res.json(data);
};