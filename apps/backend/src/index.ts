import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { env } from "@workspace/config";

const app = express();

app.use(
	cors({
		origin: env.FRONTEND_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = parseInt(env.PORT);

// Import routes
import userRoutes from "./routes/user.routes";

app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
