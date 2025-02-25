import fs from 'fs';

export const deleteUser = (req, res) => {
    // body
    const { username } = req.body;

    // users medeelel avna
    const rawUserData = fs.readFileSync('src/database/users.json');
    const users = JSON.parse(rawUserData);

    // shinechilne
    const filteredUsers = users.filter((cur) => cur.username !== username);

    // hadgalna
    fs.writeFileSync('src/database/users.json', JSON.stringify(filteredUsers));

    res.json({ message: 'Deleted!!' })
}