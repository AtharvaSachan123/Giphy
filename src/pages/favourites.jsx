/* eslint-disable no-unused-vars */
import { GifState } from "../context/gif-context"

import { useEffect, useState } from "react";
import Gif from "../components/gif";



const Favourites = () => {

  const [favouriteGIFS, setFavouriteGIFS] = useState([]);

  const {gf,favourites}=GifState(); 

  const fetchFavouriteGiFs=async()=>{
    const gifs=await gf.gifs(favourites);
    setFavouriteGIFS(gifs.data);
  }

  useEffect(()=>{
    fetchFavouriteGiFs();;
  },[]);

  return (
    <div className="mt-2">
      <span className="faded-text">My Favourites</span>
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2">
          {
            favouriteGIFS.map((gif)=>(
              <Gif gif={gif} key={gif.id} />
            ))
          }
      </div>

    </div>
  )
}

export default Favourites