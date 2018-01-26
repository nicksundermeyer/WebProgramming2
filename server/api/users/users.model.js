import uuidv4 from 'uuid/v4';

class User {
  users = [];

  // helper method to find address of user in array
  findUser(user) {
    var id = user.id;
    var found = -1;

    // loop to check through users and see if one contains the correct id
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id == id) {
        found = i;
        break;
      }
    }

    return found;
  }

  find() {
    // Returns a list of all users
    return this.users;
  }

  findById(userId) {
    console.log(userId);
    // Find user by Id
    // Returns user, or null if not present
    var found = null;

    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        found = this.users[i];
        break;
      }
    }

    return found;
  }

  create(user) {
    // Create a new user
    // Return created user
    // Generate the id and overwrite any id that may be present in user
    var tempUser = {
      "id": uuidv4(),
      "name": user.name,
      "address": user.address,
      "age": user.age
    }

    this.users.push(tempUser);
    return tempUser;
  }

  findOneAndUpdate(user) {
    console.log("Update");
    // Find user and update
    // If user does not exist, create it using Id provided
    // Return true if user was updated, false if user was created
    var found = this.findUser(user);

    if (found == -1) {
      this.users.push(user);
      return false;
    }
    else {
      this.users.splice(found, 1);
      this.users.push(user);
      return true;
    }
  }

  remove(user) {
    // Remove user if exists with the Id provided
    // Return true if removed
    // Return false if did user not exist
    var found = this.findUser(user);

    if (found == -1) {
      return false;
    }
    else {
      this.users.splice(found, 1);
      return true;
    }
  }
}

export default new User();
