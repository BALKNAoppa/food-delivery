import fs from 'fs';

export const getUsers = (req, res) => {
    const rawUserData = fs.readFileSync('src/database/users.json');
    res.send(JSON.parse(rawUserData));
}