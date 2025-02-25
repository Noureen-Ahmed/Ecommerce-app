import React, { useEffect, useState } from 'react';
import Style from './Brands.module.scss';

const Brands: React.FC = () => {
  // State: counter, typed as a number
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    // Any side effects or actions you want to perform when the component mounts
  }, []);

  return (
    <>
      <h1 className={Style.heading}>Brands</h1>
      <p className={Style.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab eius dolorum doloremque impedit nulla veritatis dolorem officia delectus?
      </p>
    </>
  );
}

export default Brands;
