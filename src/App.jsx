import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [images, setImages] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    setClicked(!clicked);
    try {
      const response = await axios.post(
        'https://manga-dex-api-image.vercel.app/proxy/mangadex-cover',
        { mangaId: "8f3e1818-a015-491d-bd81-3addc4d7d56a" },
        { responseType: 'blob' } // To handle image data correctly
      );

      // Convert blob to URL for display
      const imageUrl = URL.createObjectURL(response.data);
      setImages(imageUrl);
    } catch (error) {
      console.error('Error fetching cover image:', error);
    }
  };

  return clicked ? (
    <>
      <div>hello</div>
      <button onClick={handleClick}>hello</button>
      {images && <img src={images} alt="Manga Cover" />}
      <img src='https://uploads.mangadex.org/covers/8f3e1818-a015-491d-bd81-3addc4d7d56a/26dd2770-d383-42e9-a42b-32765a4d99c8.png' alt='hot link cover'/>
      <img src="https://cmdxd98sb0x3yprd.mangadex.network/data/3d7805cecd4c06f8a94c59448ddcfb0c/U15-3a7a0a299f05f29dcfd4ed9ca93ee83b3a5c64dbebe35b9522f33941e8666fe5.png" alt="hot link chap" />
    </>
  ) : (
    <button onClick={handleClick}>click</button>
  );
}

export default App;
