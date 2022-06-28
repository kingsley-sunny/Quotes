import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuotes = () => {
  const history = useHistory();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (newQuote) => {
    sendRequest(newQuote);
  };
  return (
    <QuoteForm
      isLoading={status === "pending" ? true : false}
      onAddQuote={addQuoteHandler}
    />
  );
};

export default NewQuotes;
