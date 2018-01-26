import uuidv4 from 'uuid/v4';
import User from './users.model';

// req and res provided by Express.js, send users array as json to the res object
export function index(req, res) {
    res.send(JSON.stringify(User.users));
}

// extract parameter ID from req and search for user with matching ID
export function show(req, res) {
    var user = {
        "id": req.params.id,
        "name": req.body.name,
        "address": req.body.address,
        "age": req.body.age
    }

    var found = User.findById(user.id);

    // if the id is not found in users, set error code and send message
    if (found == null) {
        res.status(404).send({ message: "Not Found" });
    }
    else {
        res.send(found);
    }
    return found;
}

// create function to add new user to in-memory list
export function create(req, res) {
    var user = {
        "id": req.params.id,
        "name": req.body.name,
        "address": req.body.address,
        "age": req.body.age
    }

    // create and send user to res
    res.status(201).send(User.create(user));
}

// create function to update user object, or create new user if it doesn't
export function upsert(req, res) {
    var user = {
        "id": req.params.id,
        "name": req.body.name,
        "address": req.body.address,
        "age": req.body.age
    }

    var updated = User.findOneAndUpdate(user);

    // if not found, push to users
    // if found, remove the element where it was found then push the updated one to users
    if (updated == false) {
        res.status(201).send(user);
    }
    else {
        res.status(200).send(user);
    }
}

// create function to remove user object
export function destroy(req, res) {
    var user = {
        "id": req.params.id,
        "name": req.body.name,
        "address": req.body.address,
        "age": req.body.age
    }

    var destroyed = User.remove(user);

    if (destroyed == false) {
        res.status(404).send({ message: "Not Found" });
    }
    else {
        res.status(204).send();
    }
}