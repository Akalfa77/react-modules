import { useState } from "react";

const STORAGE_KEY = "memeverse_liked";

export function useLikes() {
  const [likedMemes, setLikedMemes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to read likes from localStorage:", error);
    }
    return new Set();
  });

  const toggleLike = (url) => {
    setLikedMemes((prevLiked) => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(url)) {
        newLiked.delete(url);
      } else {
        newLiked.add(url);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...newLiked]));
      } catch (error) {
        console.error("Failed to save likes to localStorage:", error);
      }
      return newLiked;
    });
  };

  const isLiked = (url) => likedMemes.has(url);
  const likeCount = likedMemes.size;

  return {
    toggleLike,
    isLiked,
    likeCount,
  };
}
