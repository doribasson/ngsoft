import { RiSendPlaneFill } from "react-icons/ri";
import { useRef } from "react";

import { useAppDispatch } from "../../store/store";
import "./commentForm.css";
import { addComment } from "../../features/post/postSlice";

export default function CommentForm({ postId }: { postId: string }) {
  const textRef = useRef<any>();
  const dispatch = useAppDispatch();

  const onChangeHandler = function (e: any) {
    const target = e.target as HTMLTextAreaElement;
    textRef.current.style.height = "30px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  const handleBlur = () => {
    textRef.current.style.height = "30px";
  };

  const handleFocus = () => {
    textRef.current.style.height = "100%";
  };

  const handleSubmit = () => {
    const data: { text: string } = {
      text: textRef.current.value,
    };
    if (data.text) {
      dispatch(addComment({ postId, data }));
      textRef.current.value = "";
    } else return;
  };

  return (
    <div>
      <form className="post_edit">
        <div className="temp">
          <textarea
            ref={textRef}
            onChange={onChangeHandler}
            placeholder="Add your comment here"
            required
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          <span>
            <RiSendPlaneFill onClick={handleSubmit} />
          </span>
        </div>
      </form>
    </div>
  );
}
