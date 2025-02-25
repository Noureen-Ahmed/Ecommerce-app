import React, { useEffect, useState } from 'react';

const Notfound: React.FC = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        // You can add any effect logic here
    }, []);

    return (
        <>
            <h1>Not Found</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ab eius dolorum doloremque impedit nulla veritatis dolorem officia delectus?
            </p>
        </>
    );
};

export default Notfound;
