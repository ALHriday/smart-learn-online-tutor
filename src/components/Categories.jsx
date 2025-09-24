import { motion } from 'motion/react'
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const Categories = () => {
    const { setSearch, stats } = useContext(AuthContext);

    return (
        <Link className="w-full md:w-11/12 md:mx-auto" to='/find_tutors'>
            <div className=" grid-cols-2 grid md:grid-cols-3 gap-1 md:gap-2">
                {stats?.languages?.map((language, idx) =>
                    <div key={idx}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}>
                            <div onClick={() => setSearch(language.toLowerCase())} className="flex justify-evenly items-center border-collapse border rounded-md py-4 md:py-6 shadow-md hover:bg-slate-900 hover:text-white cursor-pointer">

                                <div className="w-5 md:w-6">
                                    <img src="https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000" alt="" />
                                </div>

                                <div className="text-sm md:text-xl font-bold">
                                    {language} Tutors
                                </div>
                                <div className="w-5 md:w-6">
                                    <img src="https://img.icons8.com/?size=100&id=49411&format=png&color=000000" alt="" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

            </div>
        </Link>
    );
};

export default Categories;