import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "../controllers/userControllers.js";
export const resolvers = {
	Query: {
		hello: () => "Hello world!",
		getUser,
		getUsers,
	},

	Mutation: {
		createUser,
		updateUser,
		deleteUser,
	},
};
