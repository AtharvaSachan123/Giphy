/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import FollowOn from "../components/follow-on";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";


const contentType =["gifs","stickers","texts"];


const GifPage = () => {
  const {type,slug}=useParams();
  const [gif,setGif]=useState({});
  const [relatedGifs,setRelatedGifs]=useState([]);

  const [readMore,setReadMore]=useState(false);

  const{gf}=GifState();

  useEffect(()=>{
    if(!contentType.includes(type)){
      throw new Error("Invalid content type");
    }

    fetchGif();
  },[])






  const fetchGif=async()=>{
    const gifId=slug.split("-");
    const {data}=await gf.gif(gifId[gifId.length-1]);
    const {data:related}=await gf.related(gifId[gifId.length-1],{limit:10,});
    setGif(data);
    setRelatedGifs(related);
  }

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user &&(
          <>
          <div className="flex gap-1">
            <img src={gif.user.avatar_url} 
            alt={gif.user.display_name}
             className="h-14"/>
             <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name}</div>
              <div className="faded-text">{gif?.user?.twitter}</div>
             </div>
          </div>

          {gif?.user?.description &&(
            <p className="py-4 whitespace-pre-line text-sm text-gray-400">
              {readMore?gif.user.description:gif.user.description.slice(0,100)+"..."}
              <div
              className="flex items-center faded-text cursor-pointer"
              onClick={()=>setReadMore(!readMore)}>
                    {readMore?(
                      <>
                        Read less <HiMiniChevronUp size={20}/>
                      </>
                    ):(
                    <>
                      Read more <HiMiniChevronDown size={20}/>
                    </>)}
                </div>
            </p>
          )}
          
          </>
        )}

        <FollowOn/>
        <div className="divider">

          {gif.source && (
            <div>
              <span className="faded-text ">Source</span>
              <div className="flex items-center text-sm font-bold gap-1">
                <HiOutlineExternalLink size={20}/>
                <a href={gif.source} target="_blank" className="truncate">
                  {gif.source}</a>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="col-span-4 sm:col-span-3">
          <div className="flex gap-6 ">
            <div className="w-full sm:w-3/4">
                <div className="faded-text truncate mb-2">{gif.title}</div>
                <Gif gif={gif} hover={false} />

                {/* {Mobile UI} */}

                <div className="flex sm:hidden gap-1 ">
                <img src={gif.user.avatar_url} 
            alt={gif.user.display_name}
             className="h-14"/>
             <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name}</div>
              <div className="faded-text">{gif?.user?.twitter}</div>
             </div>
                <button className="ml-auto" onClick={shareGif}>
                  <FaPaperPlane size={25}/>
                </button>

                </div>

            </div>
            favorite/share/embed
          </div>

      <div>
        <span className="font-extrabold">Realated GIFS</span>
        </div>

      </div>



    </div>
  )
}

export default GifPage