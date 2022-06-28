import { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuotes = lazy(() => import("./Pages/NewQuotes"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const QuoteDetails = lazy(() => import("./Pages/QuoteDetails"));

// This is not neccessary bcause it is the home page
const AllQuotes = lazy(() => import("./Pages/AllQuotes"));

function App() {
  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteId">
              <QuoteDetails />
            </Route>
            <Route path="/new-quote">
              <NewQuotes />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
