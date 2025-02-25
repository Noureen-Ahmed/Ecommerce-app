import React, { useEffect, useState } from 'react';
import Style from '../CategoriesSlider/CategoriesSlider.module.scss';
import Slider from "react-slick";
import axios from "axios";

// Define the Category type to properly type your state
interface Category {
  id: number;
  name: string;
  image: string;
}

export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 8,
    slidesToScroll: 3,
  };

  // State to store categories
  const [categories, setCategories] = useState<Category[]>([]);

  // Function to fetch categories
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data); // Make sure to extract the categories array here
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  // Fetch categories when the component mounts
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-5">
      <h2 className="py-4 text-xl text-gray-800 font-light font-md">
        Shop Popular categories
      </h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id}>
            <img
              className="category-item w-full"
              src={category.image}
              alt={category.name}
            />
            <h3 className="font-light mt-2">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
