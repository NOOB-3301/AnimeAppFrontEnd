import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col"
      style={{
        backgroundImage: 'url("https://example.com/background.jpg")', // Replace with a suitable anime-themed background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <h1 className="text-4xl font-bold text-purple-400">AnimeHaven</h1>
        <nav className="space-x-5 text-lg">
          <Link to="/" className="hover:text-purple-400">
            Home
          </Link>
          <Link to="/anime" className="hover:text-purple-400">
            Anime
          </Link>
          <Link to="/manga/home" className="hover:text-purple-400">
            Manga
          </Link>
          <Link to="/about" className="hover:text-purple-400">
            About Us
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-8">
        <h2 className="text-5xl font-bold mb-5 text-purple-500">
          Dive into the World of Anime & Manga
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl">
          Discover, watch, and read your favorite anime and manga all in one place. Join our vibrant community of otakus today!
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/anime"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500"
          >
            Explore Anime
          </Link>
          <Link
            to="/manga/home"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500"
          >
            Browse Manga
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black/80 py-10 px-8">
        <h3 className="text-3xl font-bold text-center text-purple-400 mb-10">
          Why Choose AnimeHaven?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-purple-700 p-5 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-bold mb-3">Seamless Streaming</h4>
            <p className="text-gray-300">
              Watch your favorite anime in high quality without interruptions.
            </p>
          </div>
          <div className="bg-purple-700 p-5 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-bold mb-3">Vast Manga Library</h4>
            <p className="text-gray-300">
              Explore thousands of manga titles, from classics to the latest releases.
            </p>
          </div>
          <div className="bg-purple-700 p-5 rounded-lg shadow-lg text-center">
            <h4 className="text-xl font-bold mb-3">Community Features</h4>
            <p className="text-gray-300">
              Engage with other fans, rate your favorites, and share your thoughts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 py-5 text-center">
        <p className="text-gray-300">
          © {new Date().getFullYear()} AnimeHaven. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm">
          Designed with ♥ for anime and manga lovers.
        </p>
      </footer>

      <img src="https://cmdxd98sb0x3yprd.mangadex.network/data/3d7805cecd4c06f8a94c59448ddcfb0c//U15-3a7a0a299f05f29dcfd4ed9ca93ee83b3a5c64dbebe35b9522f33941e8666fe5.png" alt="" />
      <img src="https://cmdxd98sb0x3yprd.mangadex.network/data/cbec3b877c0b663902b7f80536bf8c90//1-08b8c46e0487c7f6ea953dc78dee1c503db25822b070dd3c83036f74c3cd5a22.jpg" alt=""></img>
    </div>
  );
};

export default LandingPage;
