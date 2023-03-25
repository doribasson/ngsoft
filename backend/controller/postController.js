const asyncHandler = require("express-async-handler");
const Post = require("../models/postModal");

const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find();
  res.status(200).json(allPosts);
});

const setPost = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("pls add a title/subTitle");
  }
  const newPost = await Post.create({
    title: req.body.title,
    subTitle: req.body.subTitle,
    status: req.body.status,
  });

  res.status(200).json(newPost);
});

const updatePost = asyncHandler(async (req, res) => {
  const findPost = await Post.findById(req.params.id);

  if (!findPost) {
    throw new Error("post not found");
  }

  const newUpdatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json(newUpdatePost);
});

const deletePost = asyncHandler(async (req, res) => {
  const findPost = await Post.findById(req.params.id);
  if (!findPost) {
    res.status(400);
    throw new Error("Post not found");
  }
  await findPost.remove();
  res.status(200).json({ id: req.params.id });
});

//set comment
const setComment = asyncHandler(async (req, res) => {
  const findPost = await Post.findById(req.params.id);
  if (!findPost) {
    res.status(400);
    throw new Error("post not found");
  }
  const newComment = {
    text: req.body.text, //come from the body
  };

  findPost.comments.unshift(newComment);
  await findPost.save();
  res.json(findPost.comments);
});

//delete comment
const deleteComment = asyncHandler(async (req, res) => {
  const findPost = await Post.findById(req.params.id);

  const comment = findPost.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return res.status(404).json({ msg: "Comment does not exist" });
  }

  const newComments = findPost.comments.filter(
    (comment) => comment.id !== req.params.comment_id
  );

  findPost.comments = newComments;

  await findPost.save();

  res.json(post.comments);
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  setComment,
  deleteComment,
};
