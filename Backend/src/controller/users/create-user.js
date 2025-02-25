import fs from "fs";

export const createUser = (req, res) => {
  const rawUserData = fs.readFileSync("src/database/users.json");
  const users = JSON.parse(rawUserData);
  if (rawUserData === users.username) {
    return res.json({ message: "Username or Password did not match" });
  }

  users.push(req.body);

  fs.writeFileSync("src/database/users.json", JSON.stringify(users));

  res.json({ message: "Success" });
};
