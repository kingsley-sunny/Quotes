import React, { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighLightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetails = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <h1 className="centered">{error}</h1>;
  }

  if (!loadedQuote) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <HighLightedQuote author={loadedQuote.author} text={loadedQuote.text} />

      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load Comments{" "}
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`} exact>
        <Comments></Comments>
      </Route>
    </div>
  );
};

export default QuoteDetails;
