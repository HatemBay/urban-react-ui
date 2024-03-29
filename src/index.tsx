import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "./App";
import store from "./redux/store";
import { authExchange } from "@urql/exchange-auth";
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
  exchanges: [
    cacheExchange,
    fetchExchange,
    authExchange(async (utils) => {
      let token = localStorage.getItem('TOKEN_KEY');
      // let refreshToken = localStorage.getItem('refreshToken');
      return {
        addAuthToOperation(operation) {
          console.log('token');
          console.log(token);
          if (!token) return operation;
          return utils.appendHeaders(operation, {
            Authorization: `Bearer ${token}`,
          });
        },
        didAuthError(error) {
          return error.graphQLErrors.some(e => e.extensions?.code === 'FORBIDDEN');
        },
        async refreshAuth() {
          //   const result = await utils.mutate(REFRESH, { token });
          //   if (result.data?.refreshLogin) {
          //     token = result.data.refreshLogin.token;
          //     refreshToken = result.data.refreshLogin.refreshToken;
          //     localStorage.setItem('token', token);
          //     localStorage.setItem('refreshToken', refreshToken);
          //   }
        },
      };
    }),
  ],
  fetchOptions: () => {
    // TODO: add args
    const token = localStorage.getItem("TOKEN_KEY");
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider value={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
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
