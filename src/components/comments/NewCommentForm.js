import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, error, status } = useHttp(addComment);

  const { quoteId, onAddComment } = props;

  useEffect(() => {
    if (status === "completed") {
      onAddComment(quoteId);
      commentTextRef.current.value = "";
    }
  }, [status, quoteId, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here
    const commentText = commentTextRef.current.value;
    if (commentText.trim() === "") return;

    // send comment to server
    sendRequest({ quoteId, commentData: commentText });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">
          {status === "pending" ? "Adding comment...." : "Add Comment"}
        </button>
        {error ? <p>{error}</p> : ""}
      </div>
    </form>
  );
};

export default NewCommentForm;
