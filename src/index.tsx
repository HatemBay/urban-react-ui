import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Home } from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
// import { createClient as createWSClient } from "graphql-ws";
// import { Header } from "./components/Header";

// const wsClient = createWSClient({
//   url: "ws://localhost:3001/graphql",
// });

// const client = new Client({
//   url: "http://localhost:3001/graphql",
//   exchanges: [
//     cacheExchange,
//     fetchExchange,
//     subscriptionExchange({
//       forwardSubscription: (request) => {
//         const input = { ...request, query: request.query || "" };
//         return {
//           subscribe(sink) {
//             const unsubscribe = wsClient.subscribe(input, sink);
//             return { unsubscribe };
//           },
//         };
//       },
//     }),
//   ],
// });

const client = new Client({
  url: "http://localhost:3001/graphql",
  exchanges: [cacheExchange, fetchExchange],
  // fetchOptions: () => {
  //   // TODO: add args
  //   const token = getToken("", "");
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : "" },
  //   };
  // },
});

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider value={client}>
      <Home />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
