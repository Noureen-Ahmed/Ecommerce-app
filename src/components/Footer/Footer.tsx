import React, { useEffect, useState } from 'react';
import Style from './Footer.module.scss';

// Footer component
export default function Footer() {
  // Define the counter state and type it as a number
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    // You can implement any side effects here
  }, []);

  return (
    <>
      <h1>Footer</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab eius dolorum
        doloremque impedit nulla veritatis dolorem officia delectus?
      </p>
    </>
  );
}
