import { prisma } from "../config/db.config.js";

export const createUser = async (parent, args, context) => {
	const { name, email, password } = args;
	console.log(args);

	try {
		const existingEmail = await prisma.user.findUnique({
			where: { email },
		});
		if (existingEmail) {
			throw new Error("Email already exists");
		}
		const user = await prisma.user.create({
			data: { name, email, password },
		});

		return user;
	} catch (error) {
		throw new Error(error);
	}
};

export const getUsers = async (parent, args, context) => {
	try {
		const users = await prisma.user.findMany();
		return users;
	} catch (error) {
		throw new Error(error);
	}
};

export const getUser = async (parent, args, context) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: args.id },
		});
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateUser = async (parent, args, context) => {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { id: args.id },
		});

		if (!existingUser) {
			throw new Error("User not found");
		}

		const user = await prisma.user.update({
			where: { id: args.id },
			data: {
				name: args.name,
				email: args.email,
				password: args.password,
			},
		});
		return user;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteUser = async (parent, args, context) => {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { id: args.id },
		});

		if (!existingUser) {
			throw new Error("User not found");
		}
		const user = await prisma.user.delete({
			where: { id: args.id },
		});
		return user;
	} catch (error) {
		throw new Error(error);
	}
};
