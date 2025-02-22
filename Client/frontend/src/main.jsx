import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const myClient = new ApolloClient({
  uri: `http://localhost:8000/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={myClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
