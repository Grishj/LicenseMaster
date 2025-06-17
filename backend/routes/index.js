import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.send({ message: "Hello from the Node.js Server!" });
});

export default router;

// using graphql instead ....
