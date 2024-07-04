let User = require('../models/userModel');

const getAllUsers = () => {
  return User.find({});
}

const getUser = (id) => {
  return User.findById(id);
}

const getUsersByName = (name) => {
  return User.find({ "name": name });
}

const updateUser = async (id, obj) => {
  try {
    console.log('Updating user in DB with ID:', id);
    let updatedUser = await User.findByIdAndUpdate(id, obj, { new: true });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    console.log('User successfully updated in DB:', updatedUser);
    return updatedUser; // מחזירים את המשתמש המעודכן
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}




const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
}

const addUser = async (obj) => {
  let prod = new User(obj);
  await prod.save();
  return "Created with ID : " + prod._id;
}

const addTaskToUser = async (userId, task) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.Tasks.push(task);
    await user.save();
    return { message: 'Task added successfully' };
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

const addPostToUser = async (userId, post) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.Posts.push(post);
    await user.save();
    return { message: 'Post added successfully' };
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
}

const deleteTaskFromUser = async (userId, taskId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.Tasks = user.Tasks.filter(task => task._id.toString() !== taskId);
    await user.save();
    return { message: 'Task deleted successfully' };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

const deletePostFromUser = async (userId, postId) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.Posts = user.Posts.filter(post => post._id.toString() !== postId);
    await user.save();
    return { message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

module.exports = { 
  getAllUsers, 
  getUser, 
  getUsersByName, 
  updateUser, 
  deleteUser, 
  addUser,
  addTaskToUser,
  addPostToUser,
  deleteTaskFromUser,
  deletePostFromUser
};
