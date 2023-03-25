import { FaTrashAlt } from "react-icons/fa";

import "./comments.css";
import { useAppDispatch } from "../../store/store";
import { deleteComment } from "./postSlice";

export default function Comments({ postId, comments }: {postId:string, comments:any}) {
  const dispatch = useAppDispatch();
const dateForamted = (createdComment:string) => new Date(createdComment || new Date()).toLocaleString(
  "he-IL",
  { timeZone: "Asia/Jerusalem" }
);

  return (
    <div className="comments_container">
      <ul>
        {comments &&
          comments.map(({ _id, text, date }: {_id:string, text:string, date:string}) => (
            <div className="comment_body" key={_id}>
              <li>
                <FaTrashAlt
                  onClick={() => dispatch(deleteComment({ postId, _id }))}
                  className="trash_comment"
                />
                {text}
              </li>
              <span id="comment_date"> {dateForamted(date)}</span>
            </div>
          ))}
      </ul>
    </div>
  );
}
