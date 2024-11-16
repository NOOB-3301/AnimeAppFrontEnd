import React, { useState,useEffect } from 'react';
import {Link, NavLink} from  "react-router-dom"
import '../../App.css';
import axios from 'axios';
import { Modal, ModalBody, ModalTrigger,useOutsideClick } from '../ui/animated-modal';






function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* <img src="https://placeholder.pics/svg/50x50" alt="Logo" /> */}
        <span className="logo-text">MangaOne</span>
      </div>
      <nav className="navigation">
        <NavLink to="/" className="hover:text-purple-600" >Home</NavLink>
        <a href="#news">News</a>
        <a href="#categories">Categories</a>
      </nav>
      <div className="search-signin">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <button className='bg-purple-500 p-2 rounded' >Search</button>
      </div>
    </header>
  );
}

const HighlightSection = () => {
  return (
    <div className="highlight-section">
      <h2>Highlights</h2>
      <div className="highlight-grid">
        <div className="highlight-item large">
          <img src="https://placeholder.pics/svg/608x716" alt="Shingeki no kyojin" />
          <div className="overlay">
            <p>進撃の巨人</p>
            <span>Shingeki no kyojin the final season 4</span>
          </div>
        </div>
        <div className="highlight-item small">
          <img src="https://placeholder.pics/svg/223x243" alt="One Punch Man" />
          <div className="overlay">
            <span>One Punch Man</span>
          </div>
        </div>
        <div className="highlight-item small">
          <img src="https://placeholder.pics/svg/365x368" alt="kimetsu no yaiba" />
          <div className="overlay">
            <span>kimetsu no yaiba</span>
          </div>
        </div>
        <div className="highlight-item small">
          <img src="https://placeholder.pics/svg/365x330" alt="Black Clover" />
          <div className="overlay">
            <span>Black Clover</span>
          </div>
        </div>
        <div className="highlight-item small">
          <img src="https://placeholder.pics/svg/223x455" alt="Hunter x Hunter" />
          <div className="overlay">
            <span>Hunter x Hunter</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewEpisodesSection = () => {
  const [latestmanga, setLatestmanga] = useState([]);
  const [modal, setModal] = useState(false)

  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/api/v1/recent-manga");
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
      set
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
      <div className="bg-black p-5">
        <h2 className="text-white text-2xl mb-5">Recently Updated..</h2>
          <div className="flex flex-wrap gap-5">
            {latestmanga.length > 0 ? (
              latestmanga.map((manga) => (
                <div
                  className="text-white bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2 w-full sm:w-1/2 md:w-1/3"
                  key={manga.id}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {manga.attributes?.title?.en || "Unknown Title"}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {manga.attributes?.publicationDemographic && (
                      <span className="p-1 bg-purple-500 rounded">
                        {manga.attributes.publicationDemographic}
                      </span>
                    )}
                    <span className="p-1 bg-purple-500 rounded">
                      {manga.attributes?.state}
                    </span>
                  </div>
                  <Modal>
                    <ModalTrigger>
                  <button onClick={()=>handleclick(manga.id)} className='bg-purple-600 p-1 rounded w-52 ' >Read Now..</button>

                    </ModalTrigger>
                    <ModalBody>
                      <div ref={ref}></div>
                      {imgUrl != '' ? (<img src={imgUrl} className='h-[250px] w-[250px]' alt='imagess' />):(<div>Loading image....</div>) }
                      {manga.attributes?.title?.en || "Unknown Title"}
                    </ModalBody>
                  </Modal>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No manga available</p>
            )}
      </div>
    <div className="mt-5 flex justify-center">
      <button className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition">
        View More
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

    // useEffect(() => {
    //   fetchRecent()
    // }, [mangalist])
  
  return (
    <div>
      <Header />
      {/* <HighlightSection /> */}
      <NewEpisodesSection />
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
