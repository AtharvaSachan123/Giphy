import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

 const {gf,gifs,setGifs,filter,setFilter,favourites} =GifState();

 const  fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
 }
 useEffect(()=>{
  
  console.log(categories);
  fetchGifCategories();
 })

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="logo" />
          <h1 className="text-5xl font-bold tracking-tighter cursor-pointer">
            GIPHY
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center ">
          {categories?.slice(0,5)?.map((category) => {
           return( 
           
           <Link 
           key={category.name}
           to={`${category.name_encoded}`}  
           className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
            {category.name}
          </Link>
           );
          })} 

        
        <button onClick={() => setShowCategories(!showCategories)}>
          <HiEllipsisVertical
            size={35}
            className={`py-0.5 hover:gradient ${
              showCategories ? "gradient" : ""
            } border-b-4 hidden lg:block`}
          />
        </button>

        
         { favourites.length>0 &&(
           <div> <Link
            to="/favourites"
            className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded"
          >
            Favourites
          </Link>
        </div>)}

        <button>
          <HiMiniBars3BottomRight size={30} className="text-sky-400 lg:hidden block" />
        </button>
        </div>

      {showCategories && (
        <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
          <span className="text-3xl font-extrabold ">Categories</span>
          <hr className="bg-gray-100 opacity-50 my-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories?.map((category) => (
               <Link className="font-bold"
               key={category.name}
           to={`${category.name_encoded}`}
           >{category.name}</Link>
            ))}
           
          </div>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Header;
