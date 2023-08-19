import React, { createContext, useState } from "react";
import axios from "axios";
export const TopNewsContext = createContext();

const TopNewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [searchNews, setSearchNews] = useState([]);
  const topNews = async (country) => {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    setNews(res.data.articles);
  };

  const searchByTitle = async (title) => {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${title}&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    setSearchNews(res.data.articles);
  };
  return (
    <TopNewsContext.Provider
      value={{ topNews, news, searchByTitle, searchNews }}
    >
      {children}
    </TopNewsContext.Provider>
  );
};

export default TopNewsProvider;
