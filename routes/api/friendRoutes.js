const router = require('express').Router();
const User = require('../../models/User');

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Update the user's friend list by adding the friendId
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Update the user's friend list by removing the friendId
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
