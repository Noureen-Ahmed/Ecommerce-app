import React from 'react';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import Search from "../Search/Search";

const Home: React.FC = () => {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <div className="my-8">
        <Search />
      </div>
      <RecentProducts />
    </>
  );
};

export default Home;
