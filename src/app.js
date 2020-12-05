import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
//Libs
import {createRoles} from "./libs/initialSetup"
//Routes
import productsRoutes from "./routes/products.routes";
import userRoutes from "./routes/user.routes"
import authRoutes from "./routes/auth.routes"

const app = express();
createRoles()

//Middlewares
app.use(morgan("dev"));
app.use(express.json())

app.set("pkg", pkg);

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)

export default app;
