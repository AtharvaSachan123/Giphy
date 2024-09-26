import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext } from "react";


const GifContext = createContext();

// eslint-disable-next-line react/prop-types
const GifProvider = ({children}) => {

    const gf= new GiphyFetch( import.meta.env.VITE_GIPHY_API_KEY);

  return <GifContext.Provider value={{gf}}>{children}</GifContext.Provider>;
}

export const GifState =()=>{
    return useContext (GifContext);
}

export default GifProvider;