const router = require('express').Router();
const Post = require('../models/Post');
const User = require("../models/User");

//Create a post
router.post('/', async (request, response) => {
    const newPost = new Post(request.body);

    try {
        const savedPost = await newPost.save();
        response.status(200).json(savedPost);
    } catch (error) {
        response.status(500).json(error);
    }
});

//Update a post
router.put('/:id', async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (post.userId === request.body.userId) {
            await post.updateOne({$set: request.body});
            response.status(200).json("Post has been updated");
        } else {
            response.status(403).json('You can update only your post');
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

//Delete a post
router.delete('/:id', async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (post.userId === request.body.userId) {
            await post.deleteOne();
            response.status(200).json("Post has been deleted");
        } else {
            response.status(403).json('You can delete only your post');
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

//Like / dislike a post
router.put('/:id/like', async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post.likes.includes(request.body.userId)) {
            await post.updateOne({$push: {likes: request.body.userId}});
            response.status(200).json("Post has been liked");
        } else {
            await post.updateOne({$pull: {likes: request.body.userId}});
            response.status(200).json("Post has been disliked");
        }
    } catch (error) {
        response.status(500).json(error);
    }
});

//Get a post
router.get('/:id', async (request, response) => {
    try {
        const post = await  Post.findById(request.params.id);
        const {updatedAt, createdAt, ...other} = post._doc;
        response.status(200).json(other);
    } catch (error) {
        response.status(500).json(error);
    }
})


//Get timeline posts
router.get("/timeline/:userId", async (request, response) => {
    try {
        const currentUser = await User.findById(request.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        response.json(userPosts.concat(...friendPosts))
    } catch (err) {
        response.status(500).json(err);
    }
});

//get user's all posts
router.get("/profile/:username", async (request, response) => {
    try {
        const user = await User.findOne({ username: request.params.username });
        const posts = await Post.find({ userId: user._id });
        response.status(200).json(posts);
    } catch (err) {
        response.status(500).json(err);
    }
});

module.exports = router;