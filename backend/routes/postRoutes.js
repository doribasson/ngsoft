const express = require("express");
const router = express.Router();
const {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  setComment,
  deleteComment,
} = require("../controller/postController");

router.route("/").get(getPosts).post(setPost);
router.route("/:id").delete(deletePost).put(updatePost);
router.post("/comment/:id", setComment);
router.delete("/comment/:id/:comment_id", deleteComment);

module.exports = router;
