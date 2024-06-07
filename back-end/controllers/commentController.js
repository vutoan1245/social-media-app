import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

// Add a comment to a post
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const newComment = new Comment({ userId, comment });
    const savedComment = await newComment.save();

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push(savedComment._id);
    await post.save();

    // Populate user information
    const populatedComment = await savedComment.populate(
      "userId",
      "firstName lastName picturePath"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all comments for a post
export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "firstName lastName picturePath",
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a comment from a post
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this comment" });
    }

    await comment.remove();
    post.comments = post.comments.filter((id) => id.toString() !== commentId);
    await post.save();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
