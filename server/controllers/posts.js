import Post from "../models/Post.js";
import User from "../models/User.js";

// Create new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      content,
      comments: [],
      likes: {},
    });
    await newPost.save();

    const posts = await Post.find();
    posts.sort((a, b) => b.createdAt - a.createdAt);
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get all posts
export const getFeedPosts = async (_req, res) => {
  try {
    const posts = await Post.find();
    posts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
