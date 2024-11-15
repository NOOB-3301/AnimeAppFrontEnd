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
        'http://localhost:3000/proxy/mangadex-cover',
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
    </>
  ) : (
    <button onClick={handleClick}>click</button>
  );
}

export default App;
