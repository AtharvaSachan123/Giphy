/* eslint-disable react/prop-types */

import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

const GifContext = createContext();


const GifProvider = ({children}) => {

  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState();
  const [favourites, setFavourites] = useState([]);

  const addToFavorites=(id)=>{
    if(favourites.includes(id)){
     const updatedFavourites= favourites.filter((f)=>f!==id);
      localStorage.setItem("favouritesGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
  }else{
    const updatedFavourites=[...favourites];
    updatedFavourites.push(id);
    localStorage.setItem("favouritesGIFs", JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  }
}

useEffect (()=>{
  const favourites= JSON.parse(localStorage.getItem("favouritesGIFs"));
  
    setFavourites(favourites || []);
  
},[]);


    const gf= new GiphyFetch( import.meta.env.VITE_GIPHY_API_KEY);

  return <GifContext.Provider value={{gf,gifs,setGifs,filter,setFilter,favourites,addToFavorites}}>{children}</GifContext.Provider>;
}

export const GifState =()=>{
    return useContext (GifContext);
}

export default GifProvider;