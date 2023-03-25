import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useState } from "react";

import "./postItem.css";
import Comments from "./Comments";
import { deletePost } from "../../features/post/postSlice";
import { useAppDispatch } from "../../store/store";
import CommentForm from "../../components/commentForm/CommentForm";
import EditPost from "../../components/postForm/EditPost";

export default function PostItem({ post }: any) {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const formatedCreated = new Date(post.createdAt || new Date()).toLocaleString(
    "he-IL",
    { timeZone: "Asia/Jerusalem" }
  );
  const formatedUpdated = new Date(post.updatedAt || new Date()).toLocaleString(
    "he-IL",
    { timeZone: "Asia/Jerusalem" }
  );

  const handleDelete = (id: string) => {
    dispatch(deletePost(id));
  };

  const statusColorClassName =
    post.status === "Complete"
      ? "green"
      : post.status === "In process"
      ? "yellow"
      : post.status === "Incomplete"
      ? "red"
      : null;

  const handleClose = () => {
    setOpenEditModal(false);
  };

  return (
    <ul className="post_container">
      <li id="createdAt">craeated: {formatedCreated}</li>
      <li id="updateAt">updated: {formatedUpdated}</li>
      <li id="title">{post.title}</li>
      <li id="subTitle">{post.subTitle}</li>
      <li className={`status ${statusColorClassName}`}>{post.status}</li>
      <FaEdit
        className="post_edit_icon"
        onClick={() => setOpenEditModal(true)}
      />
      {openEditModal ? (
        <EditPost
          handleClose={handleClose}
          isOpenModal={openEditModal}
          postId={post._id}
        />
      ) : null}
      <div className="comments_container">
        <div className="comments">
          <Comments postId={post._id} comments={post.comments} />
        </div>
        <div className="CommentForm_container">
          <CommentForm postId={post._id} />
        </div>
      </div>
      <span className="delete_button" onClick={() => handleDelete(post._id)}>
        <FaTrashAlt />
      </span>
    </ul>
  );
}
