const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const e = require("express");

//Update user's account
router.put('/:id', async (request, response) => {
    if (request.body.userId === request.params.id || request.body.isAdmin) {
        if (request.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                request.body.password = await bcrypt.hash(request.body.password, salt);
            } catch (error) {
                response.status(500).json(error);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(request.params.id, {
                $set: request.body
            });
            response.status(200).json('Account has been updated');
        } catch (error) {
            response.status(500).json(error);
        }
    } else {
        return response.status(403).json('You can update only your account!');
    }
})

//Delete user
router.delete('/:id', async (request, response) => {
    if (request.body.userId === request.params.id || request.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(request.params.id);
            response.status(200).json('Account has been deleted');
        } catch (error) {
            response.status(500).json(error);
        }
    } else {
        return response.status(403).json('You can delete only your account!');
    }
})

//Get a user
router.get('/', async (request, response) => {
    try {
        const userId = request.query.userId;
        const userName = request.query.username;

        const user = userId
            ? await User.findById(userId)
            : await User.findOne({username: userName});
        const {password, updatedAt, createdAt, isAdmin, ...other} = user._doc;
        response.status(200).json(other);
    } catch (error) {
        response.status(500).json(error);
    }
})

//Get friends
router.get("/friends/:userId", async (request, response) => {
    try {
        const user = await User.findById(request.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        response.status(200).json(friendList)
    } catch (err) {
        response.status(500).json(err);
    }
});

//Follow a user
router.put("/:id/follow", async (request, response) => {
    if (request.body.userId !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);
            if (!user.followers.includes(request.body.userId)) {
                await user.updateOne({ $push: { followers: request.body.userId } });
                await currentUser.updateOne({ $push: { followings: request.params.id } });
                response.status(200).json("User has been followed");
            } else {
                response.status(403).json("You already follow this user");
            }
        } catch (err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json("You can't follow yourself");
    }
});

//unfollow a user

router.put("/:id/unfollow", async (request, response) => {
    if (request.body.userId !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);
            if (user.followers.includes(request.body.userId)) {
                await user.updateOne({ $pull: { followers: request.body.userId } });
                await currentUser.updateOne({ $pull: { followings: request.params.id } });
                response.status(200).json("User has been unfollowed");
            } else {
                response.status(403).json("You dont follow this user");
            }
        } catch (err) {
            response.status(500).json(err);
        }
    } else {
        response.status(403).json("You cant unfollow yourself");
    }
});
module.exports = router;