/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { GifState } from "../context/gif-context"; // Adjust the import path as necessary
import Gif from "../components/Gif";
import FollowOn from "../components/follow-on";
const Category = () => {

  const {category}=useParams();

  const [results,setResults]=useState([]);
  const {gf,filter}=GifState();

  const fetchResults = async () => {
    const { data } = await gf.gifs(category,category);
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, [category]);
  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4 ">
      <div className="w-full sm:w-72" >
            {results.length > 0 && <Gif gif={results[0]} hover={false}/> }
            <span className="text-gray-400 text-sm pt-2">
              Don&apos;t tell it to me, GIF it to me!

            </span>
            <FollowOn/>
      </div>
    </div>
  )
}

export default Category