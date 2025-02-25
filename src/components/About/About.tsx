import React, { useEffect, useState } from 'react';

import Style from './About.module.scss';

const About: React.FC = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        // Add your effect logic here
    }, []);

    return (
        <>
            <h1 className={ Style.test}>About</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab eius dolorum doloremque impedit nulla veritatis dolorem officia delectus?</p>
        </>
    );
};

export default About;
