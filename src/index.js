// /* eslint-disable */

import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./error-page";
import GuessingGame from "./components/GuessingGame";
import Root from "./routes/root";
import "./index.css"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
      path: "games/:gameId",
      element: <GuessingGame />
  }
]);

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL + "/graphql",
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    </React.StrictMode>
);