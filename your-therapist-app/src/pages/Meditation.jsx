import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Mediation.css";

// Replace with your actual YouTube API Key
const YOUTUBE_API_KEY = '';
const YOUTUBE_SEARCH_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

const MusicDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("white noise meditation");
  const [suggestions, setSuggestions] = useState([
    "guided meditation",
    "ocean sounds",
    "rain sounds",
    "mindfulness exercises",
    "breathing techniques",
    "yoga music",
    "sleep music",
  ]);

  // Fetch videos from YouTube API
  const fetchVideos = async (query) => {
    try {
      const response = await axios.get(YOUTUBE_SEARCH_ENDPOINT, {
        params: {
          key: YOUTUBE_API_KEY,
          part: "snippet",
          type: "video",
          q: query,
          maxResults: 16, // Limit to 15 videos for simplicity
        },
      });
      // Extract video data from the response
      const fetchedVideos = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
      }));
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchVideos(searchQuery);
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="header">
        <h1 className="title">Meditation & Mindfulness</h1>
        <p className="subtitle">
          Find peace and relaxation with curated meditation and mindfulness content.
        </p>
      </header>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for meditation or white noise videos..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Suggestions Section */}
      <div className="suggestions">
        <h2 className="suggestion-title">Popular Searches</h2>
        <div className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => {
                setSearchQuery(suggestion);
                fetchVideos(suggestion);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            </a>
            <h2 className="video-title">{video.title}</h2>
            <p className="video-channel">By: {video.channel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicDashboard;