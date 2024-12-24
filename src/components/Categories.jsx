import { useEffect, useRef, useState } from "react";


const Categories = () => {
    const [data, setData] = useState();
    const langRef = useRef();

    useEffect(() => {
        fetch('http://localhost:2100/tutors').then(res => res.json()
        ).then(d => {
            setData(d);
        })
    }, []);

    const everyLanguage = [...new Set(data && data.map(l => l.language))];
    const lang = [...everyLanguage].slice(0, 9);


    return (
        <div className="w-11/12 mx-auto grid-cols-2 grid md:grid-cols-3 gap-2">
            {lang && lang.map((language, idx) => <div className="flex justify-evenly items-center border-collapse border-2 py-4 " key={idx}>
                <div className="w-6">
                    <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="" />
                </div>

                <div ref={langRef} className="text-xl font-bold">
                    {language}
                </div>
                <div className="w-6">
                    <img src="https://img.icons8.com/?size=100&id=49411&format=png&color=000000" alt="" />
                </div>
            </div>)}

        </div>
    );
};

export default Categories;