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
	},

	Mutation: {
		createUser,
		getUser,
		getUsers,
		updateUser,
		deleteUser,
	},
};
