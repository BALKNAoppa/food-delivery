import express from "express";
import cors from "cors";

import { userRouter } from "./routers/user-router.js";
import { connectDB } from "./utils/db.js";
import { foodRouter } from "./routers/food-router.js";
import { categoryRouter } from "./routers/category-router.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("MongoDB is connected!");
});
app.use("/users", userRouter);
app.use("/food", foodRouter);
app.use("/category", categoryRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// verify // Mail
// reset-password // Mail

// sign-in, sign-up, get-user, delete-user
// category(CRUD), food(CRUD) => FoodOrder(CRUD)