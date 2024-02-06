import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sequelize from "./config/dbConfig";

// Routes imports
import authRouter from "./routes/authRoutes";

const app = express();

const corOptions = {
	origin: `https://localhost:${process.env.PORT}`,
};

app.use(cors(corOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Hello from Server" });
});

app.use(authRouter);

// Catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	next(createError(404));
});

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong");
});

// app.use(function (
// 	err: { message: string; status: number },
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ): void {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render("error");
// });

const PORT = process.env.PORT || 8080;

sequelize
	.sync({ force: false })
	.then(() => console.log("Re-sync done"))
	.catch((err) => console.log(err));

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});

// nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts
