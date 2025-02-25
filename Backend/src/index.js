import express from "express";
// import { userRouter } from "./routers/user-router.js";
// import { productRouter } from "./routers/product-router.js";
import { connectDB } from "./utils/db.js";

const app = express();
const port = 3000;
// const connectDB = require("./db");

app.use(express.json());
connectDB();

// app.get("/", (req, res) => {
//   res.send("MongoDB is connected!");
// });
// app.use("/users", userRouter);
// app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
