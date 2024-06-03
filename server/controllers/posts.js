import Post from "../models/Post.js";
import User from "../models/User.js";

// Create new post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const images = req.files.map((file) => file.filename);

    const userId = req.user.id;

    const newPost = new Post({
      userId,
      content,
      images,
      comments: [],
      likes: {},
    });
    await newPost.save();

    const posts = await Post.find().populate(
      "userId",
      "firstName lastName picturePath"
    );
    posts.sort((a, b) => b.createdAt - a.createdAt);
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get posts from a user
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate(
      "userId",
      "firstName lastName picturePath"
    );
    posts.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get all posts
export const getFeedPosts = async (_req, res) => {
  try {
    const posts = await Post.find().populate(
      "userId",
      "firstName lastName picturePath"
    );
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
    ).populate("userId", "firstName lastName picturePath");

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
