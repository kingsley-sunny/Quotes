import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {
    sendRequest,
    status,
    error,
    data: gottenComments,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(params.quoteId);
  }, [params.quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const getCommentHandler = useCallback(
    (id) => {
      sendRequest(id);
    },
    [sendRequest]
  );

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    comments = <p className="centered">{error}</p>;
  }

  if (status === "completed" && !error) {
    comments = <CommentsList comments={gottenComments} />;
  }

  if (
    status === "completed" &&
    (gottenComments.length === 0 || !gottenComments)
  ) {
    comments = <p className="centered">No Comments Found</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={params.quoteId}
          onAddComment={getCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
