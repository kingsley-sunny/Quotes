import React, { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    error,
    data: loadedQuotes,
  } = useHttp(getAllQuotes);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending")
    return (
      <div className="centered">
        {" "}
        <LoadingSpinner />
      </div>
    );

  if (error) return <h1 className="centered focus">{error}</h1>;

  if (!loadedQuotes || loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes}></QuoteList>;
};

export default AllQuotes;
