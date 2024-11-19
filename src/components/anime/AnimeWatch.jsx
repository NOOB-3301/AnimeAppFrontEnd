import React, { useRef, useState } from 'react';
import Hls from 'hls.js';

const HLSPlayer = () => {
  const videoRef = useRef(null);
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState('{}');

  const playStream = () => {
    let parsedHeaders;

    // Parse headers input
    try {
      parsedHeaders = JSON.parse(headers);
    } catch (e) {
      parsedHeaders = {};
      alert('Invalid headers. Set headers to {}.');
    }

    console.log('Using URL:', url);
    console.log('Using headers:', parsedHeaders);

    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      const proxyUrl = `https://localhost:8080/m3u8-proxy?url=${encodeURIComponent(
        url
      )}&headers=${encodeURIComponent(JSON.stringify(parsedHeaders))}`;
      console.log('Proxy URL:', proxyUrl);

      hls.loadSource(proxyUrl);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS Manifest loaded:', proxyUrl);
        videoRef.current.play();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
      });

      // Cleanup on component unmount
      return () => hls.destroy();
    } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari support
      const proxyUrl = `/m3u8-proxy?url=${encodeURIComponent(
        url
      )}&headers=${encodeURIComponent(JSON.stringify(parsedHeaders))}`;
      videoRef.current.src = proxyUrl;
      videoRef.current.play();
    }
  };

  return (
    <div>
      <h1>HLS Player</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Stream URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the M3U8 URL"
            style={{ marginLeft: '1rem', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Headers (JSON):
          <input
            type="text"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder="Enter headers as JSON"
            style={{ marginLeft: '1rem', width: '300px' }}
          />
        </label>
      </div>
      <button onClick={playStream}>Play Stream</button>
      <video
        id="hls"
        ref={videoRef}
        controls
        style={{
          width: '100%',
          maxWidth: '720px',
          marginTop: '1rem',
        }}
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
};



const App = () => {
  return (
    <div>
      <h1>HLS Player Example</h1>
      <HLSPlayer />
    </div>
  );
};

export default App;
