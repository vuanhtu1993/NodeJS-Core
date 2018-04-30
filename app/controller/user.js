import { _createUser } from "../model/user";

export const createUser = (req, res) => {
	const { dataUser } = req.body;
	const data = _createUser(dataUser);
	data
		.then((data) => res.send(data))
		.catch((err) => res.send(err))
};