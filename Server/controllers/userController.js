
const userBL = require('../services/userService');
const express = require('express');
const router = express.Router();
const User = require('../models/userModel') // שינוי 7/4/2027

router.get('/', async function(req, resp) {
  try {
    let prods = await userBL.getAllUsers();
    return resp.json(prods);
  } catch (error) {
    console.error('Error fetching all users:', error);
    return resp.status(500).json({ error: 'Error fetching all users' });
  }
});

router.get('/:id', async function(req, resp) {
  try {
    let id = req.params.id;
    let prod = await userBL.getUser(id);
    if (!prod) {
      return resp.status(404).json({ error: 'User not found' });
    }
    return resp.json(prod);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return resp.status(500).json({ error: 'Error fetching user by ID' });
  }
});

router.get('/search/:name', async function(req, resp) {
  try {
    let prodName = req.params.name;
    let prods = await userBL.getUsersByName(prodName);
    return resp.json(prods);
  } catch (error) {
    console.error('Error searching users by name:', error);
    return resp.status(500).json({ error: 'Error searching users by name' });
  }
});


// ניתוב PUT לעדכון משתמש לפי ה-ID שלו
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedUserData = req.body; // מידע על המשתמש לעדכון

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
    console.log('Updated user:', updatedUser);
    res.json(updatedUser); // מחזירים את המשתמש המעודכן
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/:id', async function(req, resp) {
  try {
    let id = req.params.id;
    await userBL.deleteUser(id);
    return resp.json("Deleted");
  } catch (error) {
    console.error('Error deleting user:', error);
    return resp.status(500).json({ error: 'Error deleting user' });
  }
});

router.post('/', async function(req, resp) {
  try {
    let obj = req.body;
    let status = await userBL.addUser(obj);
    return resp.json(status);
  } catch (error) {
    console.error('Error adding user:', error);
    return resp.status(500).json({ error: 'Error adding user' });
  }
});
// נתיב להוספת משימה חדשה למשתמש

router.post('/:id/tasks', async function(req, resp) {
  try {
    let id = req.params.id;
    let task = req.body;
    let status = await userBL.addTaskToUser(id, task);
    return resp.status(201).json(status);
  } catch (error) {
    console.error('Error adding task to user:', error);
    return resp.status(500).json({ error: 'Error adding task to user' });
  }
});
// נתיב להוספת פוסט חדש למשתמש
router.post('/:id/posts', async function(req, resp) {
  try {
    let id = req.params.id;
    let post = req.body;
    let status = await userBL.addPostToUser(id, post);
    return resp.status(201).json(status);
  } catch (error) {
    console.error('Error adding post to user:', error);
    return resp.status(500).json({ error: 'Error adding post to user' });
  }
});
// נתיב למחיקת משימה מהמשתמש
router.delete('/:userId/tasks/:taskId', async function(req, resp) {
  try {
    let userId = req.params.userId;
    let taskId = req.params.taskId;
    await userBL.deleteTaskFromUser(userId, taskId);
    return resp.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task from user:', error);
    return resp.status(500).json({ error: 'Error deleting task from user' });
  }
});

// נתיב למחיקת פוסט מהמשתמש
router.delete('/:userId/posts/:postId', async function(req, resp) {
  try {
    let userId = req.params.userId;
    let postId = req.params.postId;
    await userBL.deletePostFromUser(userId, postId);
    return resp.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post from user:', error);
    return resp.status(500).json({ error: 'Error deleting post from user' });
  }
});

module.exports = router;
