import { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import GifSearch from "../components/GifSearch";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { gf, favourites } = GifState();

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchGifCategories();
  }, []); // Added [] as the dependency array to prevent continuous fetching

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="logo" />
          <h1 className="text-5xl font-bold tracking-tighter cursor-pointer">
            GIPHY
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="font-bold text-md flex gap-2 items-center hidden lg:flex">
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`${category.name_encoded}`}
              className="px-4 py-1 hover:gradient border-b-4"
            >
              {category.name}
            </Link>
          ))}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4`}
            />
          </button>

          {favourites.length > 0 && (
            <Link
              to="/favourites"
              className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded"
            >
              Favourites
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMobileMenu} className="lg:hidden block">
          {isMobileMenuOpen ? (
            <HiXMark size={30} className="text-sky-400" />
          ) : (
            <HiMiniBars3BottomRight size={30} className="text-sky-400" />
          )}
        </button>

        {/* Categories Dropdown for Desktop */}
        {showCategories && (
          <div className="absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20">
            <span className="text-3xl font-extrabold ">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories?.map((category) => (
                <Link className="font-bold" key={category.name} to={`${category.name_encoded}`}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Side Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50  ">
          {/* Overlay to close the drawer */}
           <div className="bg-black bg-opacity-50 w-full h-full" onClick={toggleMobileMenu}></div>

          {/* Side Drawer */}
          <div
            className={
              isMobileMenuOpen
                ? "fixed  z-30 left-0 top-0 pt-4 w-[60%] h-full   bg-gray-950 text-white ease-in-out duration-500 "
                : "fixed left-[-100%]"
            }
          >
            <div className="flex justify-between items-center mb-6 ">
              <h2 className="text-3xl font-bold">Menu</h2>
              
            </div>

            <div className="flex flex-col justify-center gap-4 ">
              {categories?.map((category) => (
                <Link
                  key={category.name}
                  to={`${category.name_encoded}`}
                  className="text-xl font-bold"
                  onClick={toggleMobileMenu}
                >
                  {category.name}
                </Link>
              ))}

              {favourites.length > 0 && (
                <Link
                  to="/favourites"
                  className="text-xl font-bold"
                  onClick={toggleMobileMenu}
                >
                  Favourites
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <GifSearch />
    </nav>
  );
};

export default Header;
