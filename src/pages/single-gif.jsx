/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import FollowOn from "../components/follow-on";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gf, addToFavorites, favourites } = GifState();

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }

    fetchGif();
  }, []);

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    const { data: related } = await gf.related(gifId[gifId.length - 1], { limit: 10 });
    setGif(data);
    setRelatedGifs(related);
  };

  // Share GIF function using Web Share API
  const shareGif = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gif.title,
          text: `Check out this GIF: ${gif.title}`,
          url: gif.url, // URL of the GIF to share
        });
        console.log("GIF shared successfully");
      } catch (error) {
        console.error("Error sharing GIF", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  // Embed GIF function
  const embedGif = () => {
    const embedCode = `<iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" allowFullScreen></iframe>`;
    navigator.clipboard.writeText(embedCode).then(() => {
      alert("Embed code copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy embed code", err);
    });
  };

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url || "/default-avatar.png"}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">{gif?.user?.twitter}</div>
              </div>
            </div>

            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif.user.description
                  : gif.user.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}

        <FollowOn />
        <div className="divider">
          {gif.source && (
            <div>
              <span className="faded-text ">Source</span>
              <div className="flex items-center text-sm font-bold gap-1">
                <HiOutlineExternalLink size={20} />
                <a href={gif.source} target="_blank" className="truncate">
                  {gif.source}
                </a>
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

            {/* Mobile UI */}
            {gif?.user && (
              <div className="flex sm:hidden gap-1 ">
                <img
                  src={gif?.user?.avatar_url || "/default-avatar.png"}
                  alt={gif?.user?.display_name}
                  className="h-14"
                />
                <div className="px-2">
                  <div className="font-bold">{gif?.user?.display_name}</div>
                  <div className="faded-text">{gif?.user?.twitter}</div>
                </div>
                <button className="ml-auto" onClick={shareGif}>
                  <FaPaperPlane size={25} />
                </button>
              </div>
            )}
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6 ">
            <button
              onClick={() => addToFavorites(gif.id)}
              className="flex gap-5 items-center fond-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${favourites.includes(gif.id) ? "text-red-500" : ""}`}
              />
              Favorite
            </button>
            <button onClick={shareGif} className="flex gap-5 items-center fond-bold text-lg">
              <FaPaperPlane size={23} />
              Share
            </button>
            <button onClick={embedGif} className="flex gap-5 items-center fond-bold text-lg">
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold">Related GIFS</span>
            <div className="columns-2 md:columns-3 gap-2">
              {relatedGifs.slice(1).map((gif) => (
                <Gif gif={gif} key={gif.id} />
              ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default GifPage;
