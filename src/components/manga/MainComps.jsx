import React, { useState,useEffect } from 'react';
import {Link, NavLink} from  "react-router-dom"
import '../../App.css';
import axios from 'axios';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger,useOutsideClick } from '../ui/animated-modal';
import { FaBars, FaTimes } from "react-icons/fa";


const HighlightSection = ({ search }) => {
  const [stateView, setStateView] = useState(true)
  const [imgUrl, setImgUrl] = useState('')

  const fetchCoverImg = async(mangaId)=>{
    try {
      const response = await axios.post(
        'https://manga-dex-api-image.vercel.app/proxy/mangadex-cover',
        { mangaId },
        { responseType: 'blob' } // Handle image as a blob
      );

      // Convert blob to a URL
      return URL.createObjectURL(response.data);
      // set
    } catch (error) {
      console.error(`Error fetching cover for mangaId ${mangaId}:`, error);
      return null; // Return null if fetching fails
    }
  }

  const handleclick =async(id)=>{
    const url = await fetchCoverImg(id)
    console.log(url)
    setImgUrl(url)
  }

  const   toggle = () => {
    setStateView(!stateView);
  }
  let getRenderedItems=()=> {
    if (stateView) {
      return search;
    }
    return search.slice(0,1);
  }
  const ref = React.createRef()
  useOutsideClick(ref,()=>{
    console.log('reff')
    setImgUrl('')
    // setModal(false)
  })
  return (
    <div className="bg-black flex-col p-5">
        {search.length> 0 ? (<h2 className="text-white text-4xl font-bold mb-5">Seached Results..</h2>):(<span></span>) }
      <div className="flex overflow-y-auto flex-wrapjustify-center gap-5">

        {search.length > 0 ? (
          getRenderedItems().map((manga) => (
            <>
            <div
              className="text-white bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2 w-full sm:w-1/2 md:w-1/3"
              key={manga.id}
            >
              <h3 className="text-lg font-semibold mb-2">
                {manga.attributes?.title?.en || "Unknown Title"}
              </h3>
              <div className="flex flex-wrap gap-3">
                {manga.attributes?.publicationDemographic && (
                  <>
                  <span className="p-1 bg-purple-500 rounded">
                    {manga.attributes.publicationDemographic}
                  </span>
                  </>

                )}
                <span className="p-1 bg-purple-500 rounded">
                  {manga.attributes?.state}
                </span>
                <span className='p-1 bg-blue-500 rounded' > Latest Update: {manga.attributes.updatedAt.slice(0,10)}</span>
              </div>
              <Modal>
                <ModalTrigger>
                  <button
                    onClick={() => handleclick(manga.id)}
                    className="bg-purple-600 p-1 rounded w-52"
                  >
                    Details...
                  </button>
                </ModalTrigger>
                <ModalBody className="flex justify-center items-center">
                  <ModalContent className="bg-black h-full w-full max-w-screen-lg overflow-y-auto">
                    <div ref={ref} className=" flex items-center flex-col min-h-full">
                      <div className="h-full flex flex-col items-center justify-center p-5">
                        {imgUrl !== "" ? (
                          <img
                            src={imgUrl}
                            className="h-[400px] w-auto border-4 border-purple-600 rounded-2xl object-cover"
                            alt="imagess"
                          />
                        ) : (
                          <div>Loading image....</div>
                        )}
                        <h2 className="text-xl font-bold mt-5">
                          {manga.attributes?.title?.en || "Unknown Title"}
                        </h2>
                      </div>

                      <div className='flex flex-wrap gap-5' >
                        {manga.attributes.tags.length > 0 &&  manga.attributes.tags.map((tag)=>(
                            <div className='bg-purple-600 p-1 rounded-lg' >{tag.attributes.name.en}</div>
                          ))}
                      </div>

                      <div className="p-5 text-white">
                        <p>{manga.attributes.description?.en || "No description available."}</p>
                      </div>
                        <Link to={`/manga/read/${manga.id}`} > Read Now..</Link>
                    </div>                    
                  </ModalContent>
                </ModalBody>
              </Modal>

            </div>
            <div className="mt-5 flex justify-center">
              {/* <button onClick={toggle} className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition">
              {stateView ? 'Less' : 'More...'}
              </button> */}
            </div>
            </>
          ))
        ) : (
          <p className="text-gray-400  "></p>
        )}
      </div>
  </div>
  );
};


function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sreach, setSreach] = useState('')
  const [apiSearch,setApisearch]= useState([])
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleclick = async(search)=>{
    const resp = await axios.post(
      "https://manga-dex-api-server.vercel.app/api/v1/manga",
      {query : sreach}
    )
    console.log(resp.data.message.data)
    setApisearch(resp.data.message.data)
  }
  


  return (
    <>
    <header className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <span className="text-5xl text-purple-500">MangaOne</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        <NavLink to="/" className="hover:text-purple-500">
          Home
        </NavLink>
        <a href="#news" className="hover:text-purple-500">
          News
        </a>
        <a href="#categories" className="hover:text-purple-500">
          Categories
        </a>
      </nav>

      {/* Search and Sign-in */}
      <div className="hidden md:flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={sreach}
            onChange={(e)=>setSreach(e.target.value)}
            className="p-2 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
        </div>
        <button onClick={handleclick} className="bg-purple-500 hover:bg-purple-600 p-2 rounded-md">
          Search
        </button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-purple-500 text-2xl">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black text-white p-4 shadow-lg z-50">
          <nav className="flex flex-col gap-4">
            <NavLink to="/" onClick={toggleMobileMenu} className="hover:text-purple-500">
              Home
            </NavLink>
            <a href="#news" onClick={toggleMobileMenu} className="hover:text-purple-500">
              News
            </a>
            <a href="#categories" onClick={toggleMobileMenu} className="hover:text-purple-500">
              Categories
            </a>
          </nav>
          <div className='flex flex-row gap-2' >
          <input
            type="text"
            placeholder="Search"
            value={sreach}
            onChange={(e)=>setSreach(e.target.value)}
            className="p-2  mt-4 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          />
          <button onClick={handleclick} className="bg-purple-500 hover:bg-purple-600 p-1 rounded-md">
            Search
          </button>
          </div>
        </div>
      )}
    </header>

    <HighlightSection search={apiSearch}/>
    
    </>
  );
}



const NewEpisodesSection = () => {
  const [latestmanga, setLatestmanga] = useState([]);
  const [modal, setModal] = useState(false)

  const [imgUrl, setImgUrl] = useState('')
  
  const [stateView, setStateView] = useState(false)

  const   toggle = () => {
    setStateView(!stateView);
  }

  let getRenderedItems=()=> {
    if (stateView) {
      return latestmanga;
    }
    return latestmanga.slice(0, 15);
  }

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const resp = await axios.get("https://manga-dex-api-server.vercel.app/api/v1/recent-manga");
        console.log("API Response:", resp.data.manga.data); // Log API response
        setLatestmanga(resp.data.manga.data);
        console.log("State after update:", resp.data.manga.data); // Log state update
      } catch (error) {
        console.error("Error fetching manga data:", error);
      }
    };
    fetchRecent();
  }, []);

  useEffect(()=>{

  },[modal])

  const fetchCoverImg = async(mangaId)=>{
    try {
      const response = await axios.post(
        'https://manga-dex-api-image.vercel.app/proxy/mangadex-cover',
        { mangaId },
        { responseType: 'blob' } // Handle image as a blob
      );

      // Convert blob to a URL
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error(`Error fetching cover for mangaId ${mangaId}:`, error);
      return null; // Return null if fetching fails
    }
  }


  const handleclick =async(id)=>{
    const url = await fetchCoverImg(id)
    console.log(url)
    setImgUrl(url)
  }
  
  
  const ref = React.createRef()
  useOutsideClick(ref,()=>{
    console.log('reff')
    setImgUrl('')
    // setModal(false)
  })


  return (
      <div className="bg-black flex-col p-5">
        <h2 className="text-white text-4xl font-bold mb-5">Recently Updated..</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {latestmanga.length > 0 ? (
              getRenderedItems().map((manga) => (
                <div
                  className="text-white bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2 w-full sm:w-1/2 md:w-1/3"
                  key={manga.id}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {manga.attributes?.title?.en || "Unknown Title"}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {manga.attributes?.publicationDemographic && (
                      <>
                      <span className="p-1 bg-purple-500 rounded">
                        {manga.attributes.publicationDemographic}
                      </span>
                      </>

                    )}
                    <span className="p-1 bg-purple-500 rounded">
                      {manga.attributes?.state}
                    </span>
                    <span className='p-1 bg-blue-500 rounded' > Latest Update: {manga.attributes.updatedAt.slice(0,10)}</span>
                  </div>
                  <Modal>
                    <ModalTrigger>
                      <button
                        onClick={() => handleclick(manga.id)}
                        className="bg-purple-600 p-1 rounded w-52"
                      >
                        Details...
                      </button>
                    </ModalTrigger>
                    <ModalBody className="flex justify-center items-center">
                      <ModalContent className="bg-black h-full w-full max-w-screen-lg overflow-y-auto">
                        <div ref={ref} className=" flex items-center flex-col min-h-full">
                          <div className="h-full flex flex-col items-center justify-center p-5">
                            {imgUrl !== "" ? (
                              <img
                                src={imgUrl}
                                className="h-[400px] w-auto border-4 border-purple-600 rounded-2xl object-cover"
                                alt="imagess"
                              />
                            ) : (
                              <div>Loading image....</div>
                            )}
                            <h2 className="text-xl font-bold mt-5">
                              {manga.attributes?.title?.en || "Unknown Title"}
                            </h2>
                          </div>

                          <div className='flex flex-wrap gap-5' >
                            {manga.attributes.tags.length > 0 &&  manga.attributes.tags.map((tag)=>(
                                <div className='bg-purple-600 p-1 rounded-lg' >{tag.attributes.name.en}</div>
                              ))}
                          </div>

                          <div className="p-5 text-white">
                            <p>{manga.attributes.description?.en || "No description available."}</p>
                          </div>
                            <Link to={`/manga/read/${manga.id}`} > Read Now..</Link>
                        </div>                    
                      </ModalContent>
                    </ModalBody>
                  </Modal>

                </div>
              ))
            ) : (
              <p className="text-gray-400">No manga available</p>
            )}
          </div>
        <div className="mt-5 flex justify-center">
          <button onClick={toggle} className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition">
          {stateView ? 'Less' : 'More...'}
          </button>
        </div>
      </div>

  );
};




function Footer() {
  return (
    <div className="footer">
      <button className="view-more-button">View more</button>
    </div>
  );
}


function HomePage() {

  return (
    <div>
      <Header />
      <NewEpisodesSection />

    </div>
  );
}

export default HomePage;
