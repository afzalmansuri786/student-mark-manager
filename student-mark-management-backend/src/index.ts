import express from "express";
import cors from 'cors';
import { AppDataSource } from "./database/database.connection";
import routes from "./routes/routes";

const app = express();

app.use(cors())

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => console.log("Error connecting to database:", error));

app.use("/api", routes);

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: "Internal Server Error" });
});

const port = 3002;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
