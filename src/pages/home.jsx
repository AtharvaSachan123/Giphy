  import { useEffect } from "react";
import { GifState } from "../context/gif-context"
import {Gif} from "../components/gif"
const Home = () => {
  const {gf,gifs,setGifs,filter,setFilter,favourites} =GifState();

  const fetchTrandingGIFs=async()=>{
    const {data} = await gf.trending({limit:20,
      type:filter,
      rating:"g",
    });
    setGifs(data);
  };

  useEffect(()=>{
    fetchTrandingGIFs();
  },[filter]);
  
  return (
    <div>
      <img src="/banner.gif" alt="giphy" className="mt-2 rounded w-full"/>

      {/* <FilterGif/> */}

      <div>
        {gifs.map((gif)=>{
        return  <Gif gif={gif} key={gif.title}/>
        })}
      </div>

    </div>
  )
}

export default Home