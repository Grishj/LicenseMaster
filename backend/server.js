import express from "express";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 4000;

async function startApolloServer() {
	try {
		// Middleware (must come before GraphQL)
		app.use(express.json());

		// REST API routes
		app.use("/api", router);

		// Setup Apollo Server
		const server = new ApolloServer({ typeDefs, resolvers });
		await server.start();

		// Apply GraphQL middleware
		server.applyMiddleware({ app });

		// Start Express server
		app.listen(PORT, () => {
			console.log(
				`🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`,
			);
			console.log(
				`🌐 REST API server running at http://localhost:${PORT}/api`,
			);
		});
	} catch (err) {
		console.error("❌ Failed to start server:", err);
	}
}

startApolloServer();
