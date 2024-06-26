
//using react toolkits
// import React, { useState, useEffect } from "react";
// import { useLazyGetSummaryQuery } from "../services/article";
// import { FaLocationArrow } from "react-icons/fa";
// import { IoLinkSharp } from "react-icons/io5";
// import { IoCopy } from "react-icons/io5";
// import { TiTick } from "react-icons/ti";
// const Demo = () => {
//   const [article, setArticle] = useState({
//     url: "",
//     summary: "",
//   });
//   const [allArticles, setAllArticles] = useState([]);
//   const [copied, setCopied] = useState("");

//   // RTK lazy query
//   const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

//   // Load data from localStorage on mount
//   useEffect(() => {
//     const articlesFromLocalStorage = JSON.parse(
//       localStorage.getItem("articles")
//     );

//     if (articlesFromLocalStorage) {
//       setAllArticles(articlesFromLocalStorage);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const existingArticle = allArticles.find(
//       (item) => item.url === article.url
//     );

//     if (existingArticle) return setArticle(existingArticle);

//     const { data } = await getSummary({ articleUrl: article.url });
//     if (data?.summary) {
//       const newArticle = { ...article, summary: data.summary };
//       const updatedAllArticles = [newArticle, ...allArticles];

//       // update state and local storage
//       setArticle(newArticle);
//       setAllArticles(updatedAllArticles);
//       localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
//     }
//   };

//   // copy the url and toggle the icon for user feedback
//   const handleCopy = (copyUrl) => {
//     setCopied(copyUrl);
//     navigator.clipboard.writeText(copyUrl);
//     setTimeout(() => setCopied(false), 3000);
//   };

//   const handleKeyDown = (e) => {
//     if (e.keyCode === 13) {
//       handleSubmit(e);
//     }
//   };

//   return (
//     <section className="mt-16 w-full max-w-xl">
//       {/* Search */}
//       <div className="flex flex-col w-full gap-2">
//         <form
//           className="relative flex justify-center items-center"
//           onSubmit={handleSubmit}
//         >
//           <span className="absolute left-0 my-2 ml-3 w-5">
//             <IoLinkSharp />
//           </span>

//           <input
//             type="url"
//             placeholder="Paste the article link"
//             value={article.url}
//             onChange={(e) => setArticle({ ...article, url: e.target.value })}
//             onKeyDown={handleKeyDown}
//             required
//             className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
//           />
//           <button
//             type="submit"
//             className="submit_btn peer-focus:border-gray-900 peer-focus:text-gray-700 flex items-center justify-center   text-white font-bold py-2 px-4 rounded"
//           >
//             <p>
//               <FaLocationArrow className="text-xl" />
//             </p>
//           </button>
//         </form>

//         {/* Browse History */}
//         <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
//           {allArticles.reverse().map((item, index) => (
//             <div
//               key={`link-${index}`}
//               onClick={() => setArticle(item)}
//               className="link_card"
//             >
//               <div className="copy_btn" onClick={() => handleCopy(item.url)}>
//                 <span className="w-[40%] h-[40%] object-contain">
//                   {copied === item.url ? <TiTick /> : <IoCopy />}
//                 </span>
//               </div>
//               <p
//                 className="flex-1 font-satoshi
//                text-blue-700 font-medium text-sm truncate"
//               >
//                 {item.url}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Display Result */}
//       <div className="my-10 max-w-full flex justify-center items-center">
//         {isFetching ? (
//           <span className="w-20 h-20 object-contain">loading...</span>
//         ) : error ? (
//           <p className="font-inter font-bold text-black text-center">
//             Well, that wasn't supposed to happen...
//             <br />
//             <span className="font-satoshi font-normal text-gray-700">
//               {error?.data?.error}
//             </span>
//           </p>
//         ) : (
//           article.summary && (
//             <div className="flex flex-col gap-3">
//               <h2 className="font-satoshi font-bold text-gray-600 text-xl">
//                 Article <span className="blue_gradient">Summary</span>
//               </h2>
//               <div className="summary_box">
//                 <p className="font-inter font-medium text-sm text-gray-700">
//                   {article.summary}
//                 </p>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
// };

// export default Demo;

//using axios
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa";
import { IoLinkSharp } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import Loader from "./Loader";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    try {
      setIsFetching(true);
      const response = await axios.get(
        `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
          article.url
        )}&length=3`,
        {
          headers: {
            'X-RapidAPI-Key': '86753c9132msh61c013bd515940ap140e21jsn6a932a4a7e33',
            'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
          }
        }
      );
      if (response.data && response.data.summary) {
        const newArticle = { ...article, summary: response.data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];

        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <span className="absolute left-0 my-2 ml-3 w-5">
            <IoLinkSharp />
          </span>

          <input
            type="url"
            placeholder="Paste the article link"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-900 peer-focus:text-gray-700 flex items-center justify-center   text-white font-bold py-2 px-4 rounded"
          >
            <p>
              <FaLocationArrow className="text-xl" />
            </p>
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <span className="w-[40%] h-[40%] object-contain">
                  {copied === item.url ? <TiTick /> : <IoCopy />}
                </span>
              </div>
              <p
                className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
              >
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <Loader/>
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error.message}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
