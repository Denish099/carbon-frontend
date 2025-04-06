import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "pub_784837de10d5162774cba7a9b6194f8952f1a";

export default function LatestNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await axios.get("https://newsdata.io/api/1/news", {
        params: {
          apikey: API_KEY,
          language: "en",
          q: "carbon emissions", // adjust keywords as needed
        },
      });
      setNews(res.data.results.slice(0, 9)); // Display top 8 articles
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Loading latest news...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Latest Carbon & Climate News
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with the most important news on carbon footprints and
            climate change.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition duration-300 border border-gray-200"
            >
              <div className="relative">
                <img
                  src={
                    article.image_url ||
                    "https://source.unsplash.com/featured/?climate,environment"
                  }
                  alt={article.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {article.source_id || "News"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.description || "No description available."}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline font-medium text-sm"
                  >
                    Read more
                  </a>
                  <span className="text-xs text-gray-500">
                    {new Date(article.pubDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
