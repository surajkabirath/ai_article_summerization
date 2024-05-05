//using react toolkits
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const rapidApiKey = "86753c9132msh61c013bd515940ap140e21jsn6a932a4a7e33";

// export const articleApi = createApi({
//     reducerPath: 'articleApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
//         prepareHeaders: (headers) => {
//             headers.set('X-RapidAPI-Key', rapidApiKey);
//             headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         getSummary: builder.query({
//             // encodeURIComponent() function encodes special characters that may be present in the parameter values
//             // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
//             query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
//         }),
//     }),
// })

// export const { useLazyGetSummaryQuery } = articleApi


//using axios

// article.js
import axios from "axios";

const rapidApiKey = "86753c9132msh61c013bd515940ap140e21jsn6a932a4a7e33";
const baseURL = "https://article-extractor-and-summarizer.p.rapidapi.com/";

export const getSummary = async (articleUrl) => {
  try {
    const response = await axios.get(
      `${baseURL}summarize?url=${encodeURIComponent(articleUrl)}&length=3`,
      {
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

