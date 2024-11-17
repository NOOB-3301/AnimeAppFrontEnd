import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://cdn.pixabay.com/photo/2022/12/01/04/40/backpacker-7628303_640.jpg"
  ); // Initial fallback image
  const [isTransitioning, setIsTransitioning] = useState(false); // For controlling the transition

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        // Fetch the image from the API
        const response = await fetch("https://manga-dex-api-image.vercel.app/proxy/random", {
          method: "GET",
        });

        if (response.ok) {
          // Convert the response to a Blob
          const blob = await response.blob();

          // Convert the Blob to an image URL
          const imageUrl = URL.createObjectURL(blob);

          // Set the image URL after a delay for the transition effect
          setIsTransitioning(true);
          setTimeout(() => {
            setBackgroundImage(imageUrl); // Change the background image after 5-6 seconds
            setIsTransitioning(false);
          }, 1000); // Wait for 1 second before applying the new image
        } else {
          console.error("Failed to fetch the background image");
        }
      } catch (error) {
        console.error("Error fetching the background image:", error);
      }
    };


    const intervalId = setInterval(() => {
      fetchBackgroundImage();
    }, 5000); // 5 seconds interval
    return () => {
      clearInterval(intervalId);
    };
    // Start fetching the background image after 5-6 seconds
    // setTimeout(fetchBackgroundImage, 2000); // Fetch after 5 seconds
    

  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col"
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        transition: isTransitioning ? "background-image 1s ease-in-out" : "none", // Transition effect
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 z-50 shadow-lg">
        <div className="flex items-center justify-between px-5 py-3 md:px-8">
          <h1 className="text-3xl font-bold text-purple-400">AnimeHaven</h1>
          <button
            className="block md:hidden text-purple-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <nav className="hidden md:flex space-x-5 text-sm md:text-lg">
            {["Home", "Anime", "Manga", "About Us"].map((item, idx) => (
              <Link
                key={idx}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="hover:text-purple-400"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="bg-black bg-opacity-90 text-center md:hidden py-3 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {["Home", "Anime", "Manga", "About Us"].map((item, idx) => (
              <Link
                key={idx}
                to={`/${item.toLowerCase().replace(" ", "")}`}
                className="block hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-5 pt-20 md:pt-28 space-y-5">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-purple-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Dive into the World of Anime & Manga
        </motion.h2>
        <motion.p
          className="text-sm md:text-xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover, watch, and read your favorite anime and manga all in one
          place. Join our vibrant community of otakus today!
        </motion.p>
        <motion.div
          className="mt-4 flex flex-col md:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Link
            to="/anime"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 transition duration-300"
          >
            Explore Anime
          </Link>
          <Link
            to="/manga/home"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-500 transition duration-300"
          >
            Browse Manga
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        className="bg-black/80 py-10 px-5 md:px-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-center text-purple-400 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Why Choose AnimeHaven?
        </motion.h3>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "Seamless Streaming",
              text: "Watch your favorite anime in high quality without interruptions.",
            },
            {
              title: "Vast Manga Library",
              text: "Explore thousands of manga titles, from classics to the latest releases.",
            },
            {
              title: "Community Features",
              text: "Engage with other fans, rate your favorites, and share your thoughts.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-purple-700 p-5 rounded-lg shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <h4 className="text-lg md:text-xl font-bold mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-300">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-purple-900 py-5 text-center text-sm md:text-base">
        <p className="text-gray-300">
          © {new Date().getFullYear()} AnimeHaven. All rights reserved.
        </p>
        <p className="text-gray-400 text-xs md:text-sm">
          Designed with ♥ for anime and manga lovers.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
