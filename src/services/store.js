// import { configureStore } from "@reduxjs/toolkit";

// import { articleApi } from "./article";

// export const store = configureStore( 
// { reducer: {
//     [articleApi.reducerPath]:articleApi.reducer
// },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
// });
// No need for Redux Toolkit imports

export const store = {}; // No need for configureStore


//if we use react toolkits the we need article.js and store.js
//if we use axios then we need article.js and globalStateProvider.js