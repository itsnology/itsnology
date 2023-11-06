import React, { useState, useEffect } from "react";

const Seo = ({ onKeywordsLoaded }) => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    // Fetch existing keywords when the component mounts
    const fetchKeywords = async () => {
      try {
        const response = await fetch("/api/Seo/getKeyword", {
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const keywordData = data.map((keyword) => keyword.name);
            setKeywords(keywordData);

            // Pass the keywords data to the parent component
            onKeywordsLoaded(keywordData);
          } else {
            console.error("Fetched data is not an array");
          }
        } else {
          console.error("Failed to fetch Keywords");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchKeywords();
  }, []);

  return <div></div>;
};

export default Seo;
