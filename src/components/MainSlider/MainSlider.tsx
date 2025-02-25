import React from 'react';
import Slider from "react-slick";

import mainSlider from '../../assets/images/slider-image-3-BtMvVf4V.jpeg';
import Slider2 from '../../assets/images/slider-image-2-Xt88XJy9.jpeg';
import Slider3 from '../../assets/images/grocery-banner-fECAEdf_.png';
import Slider4 from '../../assets/images/grocery-banner-2-BWrZqEBM.jpeg';

// Add the Slider settings interface
interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  autoplay: boolean;
  autoplaySpeed: number;
  slidesToShow: number;
  slidesToScroll: number;
  arrows: boolean;
}

const MainSlider: React.FC = () => {
  // Define the settings for the slider
  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={mainSlider} className="w-full h-[400px]" alt="Main Slider 1" />
            <img src={Slider2} className="w-full h-[400px]" alt="Main Slider 2" />
            <img src={Slider3} className="w-full h-[400px]" alt="Main Slider 3" />
            <img src={Slider4} className="w-full h-[400px]" alt="Main Slider 4" />
          </Slider>
        </div>
        <div className="w-1/4">
          <img src={Slider2} className="w-full h-[200px]" alt="Side Image 1" />
          <img src={Slider3} className="w-full h-[200px]" alt="Side Image 2" />
        </div>
      </div>
    </>
  );
};

export default MainSlider;
