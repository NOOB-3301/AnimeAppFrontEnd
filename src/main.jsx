import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Mpage from "./components/manga/MPage.jsx";
// import ReaderPage from "./components/manga/ReaderPage.jsx";
import MangaRead from "./components/manga/ReaderPage.jsx";
import AnimeHome from "./components/anime/AnimeHome.jsx";
import AnimeWatch from "./components/anime/AnimeWatch.jsx";
import AnimeDetailsPage from "./components/anime/AnimeDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/manga/home",
    element: <Mpage/>
  },
  {
    path:"/manga/read/:id",
    element: <MangaRead/>
  },
  {
    path:"/anime/home",
    element:<AnimeHome/>
  },
  {
    path:"/anime/details/:animeId",
    element:<AnimeDetailsPage/>
  },

  {
    path:"/anime/watch/:episodeId",
    element:<AnimeWatch/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
