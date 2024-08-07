import Post from "../models/Post.js";
// import { indexPost } from "../config/elasticClient.js";

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
    const savedPost = await newPost.save();

    // Index the post in Elasticsearch
    // await indexPost({
    //   userId: savedPost.userId.toString(),
    //   content: savedPost.content,
    //   images: savedPost.images,
    //   createdAt: savedPost.createdAt,
    // });

    res.status(201).json(savedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get all posts
export const getFeedPosts = async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "firstName lastName picturePath")
      .sort({ createdAt: -1 });

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
