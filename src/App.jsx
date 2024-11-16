import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const manga_url = `https://manga-dex-api-server.vercel.app/api/v1/manga`;

function App() {
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

      // Fetch covers for each manga and map them by their ID
      const covers = await Promise.all(
        mangaData.map(async (manga) => {
          const coverUrl = await fetchCoverImage(manga.id);
          return { mangaId: manga.id, coverUrl };
        })
      );

      // Convert to a lookup object for efficient rendering
      const coverMap = covers.reduce((acc, curr) => {
        if (curr.coverUrl) acc[curr.mangaId] = curr.coverUrl;
        return acc;
      }, {});

      setCoverUrls(coverMap);
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
                src={coverUrls[manga.id] || ''}
                alt={`${manga.attributes.title.en} cover`}
                style={{ width: '150px', height: '200px' }}
                onError={(e) => (e.target.src = 'placeholder-image-url')} // Fallback image if the URL fails
              />
              <div>{manga.attributes.title.en}</div>
            </div>
          ))
        ) : (
          <p>No manga found</p>
        )}
      </div>
    </>
  );
}

export default App;
