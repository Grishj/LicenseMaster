import { gql } from "apollo-server-express";

export const typeDefs = gql`
	scalar DateTime

	type User {
		id: ID!
		name: String
		email: String
		image: String
		quizzes: [QuizAttempt!]!
		createdAt: DateTime
		updatedAt: DateTime
	}

	type QuizAttempt {
		id: ID!
		score: Int
	}

	type Query {
		hello: String!
		getUser(id: ID!): User
		getUsers: [User!]!
	}

	type Mutation {
		createUser(name: String!, email: String!, password: String!): User!
		updateUser(
			id: ID!
			name: String
			email: String
			password: String
		): User!
		deleteUser(id: ID!): User!
	}
`;
