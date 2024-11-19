import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetailsPage = () => {
    const { animeId } = useParams();  // Get animeId from URL params
    const [animeDetails, setAnimeDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                console.log(animeId);
                const response = await axios.post(`https://manga-dex-api-server.vercel.app/api/v1/anime`, {id:animeId});
                setAnimeDetails(response.data.message);  // Assuming the response data is under `message`
            } catch (error) {
                console.error("Error fetching anime details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnimeDetails();
    }, [animeId]);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (!animeDetails) {
        return <div className="text-center text-white">Anime details not found.</div>;
    }

    const {
        title,
        url,
        image,
        releaseDate,
        description,
        genres,
        subOrDub,
        type,
        status,
        otherName,
        totalEpisodes,
        episodes,
    } = animeDetails;

    return (
        <div className="min-h-screen min-w-screen  text-white"
        style={{
            backgroundImage: `url(${image || "https://via.placeholder.com/150"})`,
            height: "100vh", // Set to full screen height
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
            backgroundPosition: "center 20%", // Adjust image position slightly down
        }}
        
        >
            {/* Anime Details */}
            <div className="container bg-[rgb(0,0,0,0.8)] h-[100vh] w-sceen overflow-auto mx-auto py-8 px-4 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={image || "https://via.placeholder.com/150"}
                            alt={title}
                            className="w-full h-96 object-cover border-4 border-red-600  rounded-lg shadow-lg mb-6"
                        />
                        <h1 className="text-center font-bold text-2xl text-" >{title}</h1>
                        <p className="mt-4 text-gray-300">{description || "No description available."}</p>
                    </div>

                    {/* Right Section: Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-purple-400">Details</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li><strong>Release Date:</strong> {releaseDate || "N/A"}</li>
                                <li><strong>Status:</strong> {status}</li>
                                <li><strong>Type:</strong> {type || "N/A"}</li>
                                <li><strong>Sub or Dub:</strong> {subOrDub}</li>
                                <li><strong>Other Name:</strong> {otherName || "N/A"}</li>
                                <li><strong>Total Episodes:</strong> {totalEpisodes}</li>
                            </ul>
                        </div>

                        {/* Genres */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-purple-400">Genres</h3>
                            <ul className="flex flex-wrap space-x-4 text-gray-300">
                                {genres.map((genre, index) => (
                                    <li key={index} className="px-6 py-2 mb-2 bg-purple-600 rounded-full text-xs md:text-sm">{genre}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Episodes */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-purple-400">Episodes</h3>
                            <ul className="space-y-4">
                                {episodes.map((episode) => (
                                    <li key={episode.id} className="flex justify-between items-center text-gray-300">
                                        <span>Episode {episode.number}</span>
                                        {/* <a
                                            href={episode.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            >
                                        </a> */}
                                        <Link  className="text-purple-400 hover:text-purple-300" to={`/anime/watch/${episode.id}`}>
                                            Watch Episode
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeDetailsPage;
