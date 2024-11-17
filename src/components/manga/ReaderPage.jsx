import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

const ReaderPage = () => {
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [mangaData, setMangaData] = useState({})

  const [chapurl, setChapurl] = useState('')
  const [pagelist, setPagelist] = useState([])

  useEffect(() => {
    const fetchCoverImg = async (id) => {
      try {
        const response = await axios.post(
          "https://manga-dex-api-image.vercel.app/proxy/mangadex-cover",
          { mangaId: id },
          { responseType: "blob" } // Handle image as a blob
        );

        // Convert blob to a URL
        let url = URL.createObjectURL(response.data);
        setImgUrl(url);
      } catch (error) {
        console.error(`Error fetching cover for mangaId ${id}:`, error);
      }
    };

    const fetchChapters = async (id) => {
      try {
        const resp = await axios.post(
          "https://manga-dex-api-server.vercel.app/api/v1/chapter",
          { id: id }
        );
        setChapters(resp.data.data);
        console.log("this is from fetch chap", resp.data)
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    const fetchdetails = async(id)=>{
        const resp = await axios.get(
            `https://api.mangadex.org/manga/${id}?includes%5B%5D=manga`
        )
        setMangaData(resp.data.data)
        console.log(resp.data.data)
    }

    fetchCoverImg(id);
    fetchChapters(id);
    fetchdetails(id)
  }, []);

  const handleChapterClick = async (chapterId) => {
    setSelectedChapter(chapterId);
    const resp = await axios.post(
        "https://manga-dex-api-image.vercel.app/api/v1/chapter-read",
        {chapId: chapterId}
    )
    // let base_url = resp.data.message.baseUrl
    // setBase_url(resp.data.message.baseUrl)
    // let hash = resp.data.message.chapter.hash
    // setHash(resp.data.message.chapter.hash)
    // setChapData(resp.data.message.data)
    console.log(`${resp.data.message.baseUrl}/data/${resp.data.message.chapter.hash}/${resp.data.message.chapter.data[0]}`)
    setChapurl(`${resp.data.message.baseUrl}/data/${resp.data.message.chapter.hash}/`)
    setPagelist(resp.data.message.chapter.data)
    console.log(resp.data.message)

  };

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col overflow-auto"
      style={{
        backgroundImage: imgUrl ? `url(${imgUrl})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Black tint
      }}
    >
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Section - Cover Image */}
        <div className="flex-1 flex flex-col gap-5 justify-center items-center p-5 md:h-screen">
          <img
            className="h-auto w-2/3 md:w-3/4 border-4 border-purple-500 rounded-xl object-contain shadow-lg"
            src={imgUrl}
            alt="Manga Cover"
          />
        </div>

        {/* Right Section - Chapters */}
        <div className="flex-1 p-5 bg-black/70 overflow-auto md:h-screen">
          <h1 className="text-4xl flex flex-row justify-between md:overflow-auto font-bold text-purple-400 mb-5">
            Manga Chapters
            <Link className="" to="/" > <IoMdHome /> </Link> 
          </h1>
          {chapters.length > 0 ? (
            <ul className="w-full space-y-3">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="space-y-2">
                  <div
                    className="bg-purple-600 hover:bg-purple-700 rounded-lg p-3 shadow-md text-lg cursor-pointer"
                    onClick={() => handleChapterClick(chapter.id)}
                  >
                    {`Chapter ${chapter.attributes.chapter}: ${
                      chapter.attributes.title || "Untitled"
                    }`}
                  </div>
                  {selectedChapter === chapter.id && (
                    <div className="bg-gray-800 p-3 mt-2 rounded-md">
                      <h3 className="text-lg font-bold text-white">
                        Chapter Content
                      </h3>
                      <p className="text-gray-300 mt-2">
                        {pagelist.length > 0 &&
                            pagelist.map((page) => (
                            <img
                                key={page} // Adding a key for better React rendering
                                src={`${chapurl.replace(/\/$/, '')}/${page.replace(/^\//, '')}`}
                                alt=""
                            />
                            ))}
                       </p>

                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No chapters available.</p>
          )}


        </div>
      </div>
    </div>
  );
};

export default ReaderPage;
