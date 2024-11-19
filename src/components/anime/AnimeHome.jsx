import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchAnimeViewer = ({ searchResults }) => {
    return (
        <section className="mt-6 text-center ">
            {searchResults.length > 0 && (<h2 className="text-2xl font-bold text-purple-400 mb-4">
                Search Results
            </h2>)}
            {searchResults.length > 0 ? (
                <div className="overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800">
                    <div className="inline-flex space-x-4">
                        {searchResults.map((anime) => (
                            <Link to={`/anime/details/${anime.id}`}>
                                <div
                                    key={anime.id}
                                    className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition inline-block"
                                    style={{ minWidth: "200px" }}
                                >
                                    <img
                                        src={anime.image || "https://via.placeholder.com/150"}
                                        alt={anime.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <h3 className="text-lg font-semibold mt-2 text-white">
                                        {anime.title}
                                    </h3>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">No results found. Try searching for something else!</p>
            )}
        </section>
    );
};


const TopAnime = () => {
    const [nextpage, setNextpage] = useState(1)

    // Fetch top airing anime
    const [topAiringAnime, setTopAiringAnime] = useState([]);
    useEffect(() => {
        const fetchTopAiringAnime = async () => {
            try {
                const response = await axios.post(
                    "https://manga-dex-api-server.vercel.app/api/v1/top-anime",
                    { page: 1 } // Specify page number
                );

                // Check the response structure and extract data
                if (response.data && response.data.message) {
                    setTopAiringAnime(response.data.message.results || []);
                    console.log(response.data.message.results); // Debug log
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching top airing anime:", error);
            }
        }
        fetchTopAiringAnime()
    }, []);


    useEffect(() => {
        const fetchTopAiringAnime = async () => {
            try {
                const response = await axios.post(
                    "https://manga-dex-api-server.vercel.app/api/v1/top-anime",
                    { page: nextpage } // Specify page number
                );

                // Check the response structure and extract data
                if (response.data && response.data.message) {
                    setTopAiringAnime(response.data.message.results || []);
                    console.log(response.data.message.results); // Debug log
                } else {
                    console.error("Unexpected response structure:", response.data);
                }
            } catch (error) {
                console.error("Error fetching top airing anime:", error);
            }
        }
        fetchTopAiringAnime()
    }, [nextpage]);

    const handleclick = () => {
        setNextpage(nextpage + 1)
    }
    const handlePrev = () => {
        setNextpage(nextpage - 1)
    }
    return (
        <>
            <section>
                <h2 className="text-2xl font-bold text-purple-400 mb-4">Top Airing Anime</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {topAiringAnime.map((anime) => (

                        <Link to={`/anime/watch/${anime.episodeId}`}>
                            <div
                                key={anime.id}
                                className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition"
                            >
                                <img
                                    src={anime.image || "https://via.placeholder.com/150"}
                                    alt={anime.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-semibold mt-2">
                                    {anime.title} {anime.episodeNumber}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* Pagination Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    {nextpage > 1 && (
                        <button
                            onClick={handlePrev}
                            className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
                        >
                            Previous Page
                        </button>
                    )}
                    <button
                        onClick={handleclick}
                        className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold transition"
                    >
                        Next Page
                    </button>
                </div>
            </section>
        </>

    )
}

const SearchAnime = () => {
    // States for search functionality
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Handle search
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://manga-dex-api-server.vercel.app/api/v1/search`,
                { query: searchQuery, page: 1 }
            );
            console.log(searchQuery);
            console.log(response.data);
            setSearchResults(response.data.message.results || []);
        } catch (error) {
            console.error("Error during search:", error);
        }
    };

    return (
        <>
            <header className="bg-gray-800 p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-purple-400">AnimeHaven</h1>
                    <form onSubmit={handleSearch} className="flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Anime..."
                            className="p-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-purple-600 hover:bg-purple-500 rounded-r-lg"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </header>

            {/* Search Viewer */}
            <SearchAnimeViewer searchResults={searchResults} />
        </>
    );
};


const AnimeHomePage = () => {


    // States for top airing anime

    // States for recent episodes
    const [recentEpisodes, setRecentEpisodes] = useState([]);
    // Fetch recent episodes
    useEffect(() => {
        const fetchRecentEpisodes = async () => {
            try {
                const response = await axios.get("https://manga-dex-api-server.vercel.app/api/v1/recent-anime"); // Replace with actual API endpoint
                // if (response.ok) {
                // //   const data = await response.json();
                //   setRecentEpisodes(response.data.results || []); // Assuming the API returns a 'results' array
                // } else {
                //   console.error("Failed to fetch recent episodes");
                // }
                // console.log(response.data.message.results)
                setRecentEpisodes(response.data.message.results)
            } catch (error) {
                console.error("Error fetching recent episodes:", error);
            }
        };

        fetchRecentEpisodes();
    }, []);



    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header with Search */}
            <SearchAnime />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">

                {/* section for top anime */}
                <TopAnime />


                {/* Recent Episodes Section */}
                <section className="mt-10">
                    <h2 className="text-2xl font-bold text-purple-400 mb-4">Recent Episodes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recentEpisodes.map((episode) => (
                            <div
                                key={episode.id}
                                className="bg-gray-800 p-3 rounded-lg shadow-md hover:bg-gray-700 transition"
                            >
                                <img
                                    src={episode.image || "https://via.placeholder.com/150"}
                                    alt={episode.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-semibold mt-2">{episode.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">Episode {episode.episodeNumber}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AnimeHomePage;
