import { useState } from 'react';
import axios from 'axios';
import HomePage from './MainComps.jsx';

const manga_url = `https://manga-dex-api-server.vercel.app/api/v1/manga`;

function Mpage() {
  const [search, setSearch] = useState('');
  const [mangalist, setMangalist] = useState([]);
  const [coverUrls, setCoverUrls] = useState({});

  const fetchCoverImage = async (mangaId) => {
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
  };

  const handleClick = async () => {
    try {
      const resp = await axios.post(manga_url, { query: search });
      const mangaData = resp.data.message.data;
      setMangalist(mangaData);

      // Use a temporary object to store cover URLs
      const tempCoverUrls = {};

      // Fetch covers for all manga and update the temp object
      await Promise.all(
        mangaData.map(async (manga) => {
          const coverUrl = await fetchCoverImage(manga.id);
          if (coverUrl) {
            tempCoverUrls[manga.id] = coverUrl;
          }
        })
      );

      // Update the state once after all URLs are fetched
      setCoverUrls(tempCoverUrls);
    } catch (error) {
      console.error('Error fetching manga list:', error);
    }
  };

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleClick}>Click to Search</button>

      <div>
        {mangalist.length > 0 ? (
          mangalist.map((manga) => (
            <div key={manga.id} style={{ marginBottom: '20px' }}>
              <img
                src={coverUrls[manga.id] || 'placeholder-image-url'} // Use placeholder if the image isn't loaded
                alt={`${manga.attributes.title.en} cover`}
                style={{ width: '150px', height: '200px' }}
              />
              <div>{manga.attributes.title.en}</div>
            </div>
          ))
        ) : (
          <p>No manga found</p>
        )}
      </div>

        <HomePage/>

    </>
  );
}

export default Mpage;
