import uuidv4 from 'uuid/v4';

// defining jarray to serve as database of users
let users = [];

// req and res provided by Express.js, send users array as json to the res object
export function listContents(req, res) {
    res.send(JSON.stringify(users));
}

// extract parameter ID from req and search for user with matching ID
export function findOne(req, res) {
    var found = findUser(req.params.id);

    // if the id is not found in users, set error code and send message
    if (found == -1) {
        res.status(404).send({ message: "Not Found" });
    }
    else {
        res.send(users[found]);
    }
    return found;
}

// helper function, returns index of user with id, -1 if not found
function findUser(id) {
    var found = -1;

    // loop to check through users and see if one contains the correct id
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            found = i;
            break;
        }
    }

    return found;
}

// create function to add new user to in-memory list
export function createUser(req, res) {
    // create user JSON from inputs
    var user = {
        "id": uuidv4(),
        "name": req.body.name,
        "address": req.body.address,
        "age": req.body.age
    }

    // add user to array
    users.push(user);

    // send user to res
    res.status(201).send(user);
}

// create function to update user object, or create new user if it doesn't
export function updateUser(req, res) {
    var user = {
        "id": req.params.id,
        "name": req.body.name,
        "address": req.body.address,
        "age": req.body.age
    }

    // holds location of found object, -1 if not found
    var found = findUser(req.params.id);

    // if not found, push to users
    // if found, remove the element where it was found then push the updated one to users
    if (found == -1) {
        users.push(user);
        res.status(201).send(user);
    }
    else {
        users.splice(found, 1);
        users.push(user);
        res.status(200).send(user);
    }
}

// create function to remove user object
export function removeUser(req, res) {
    var id = req.params.id;
    var found = findUser(id);

    if (found == -1) {
        res.status(404).send({ message: "Not Found" });
    }
    else {
        users.splice(found, 1);
        res.status(204).send();
    }
}