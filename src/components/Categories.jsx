import { motion } from 'motion/react';
import useAppStore from "../store/useAppStore";
import { Link } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi';

const Categories = () => {
    const { setSearch, stats } = useAppStore();
    const iconUrl = 'https://img.icons8.com/?size=100&id=9m2yplxz2fr3&format=png&color=000000';

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stats?.languages?.map((language) => (
                <motion.div key={language} whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        to="/find_tutors"
                        onClick={() => setSearch(language.toLowerCase())}
                        aria-label={`Explore ${language} tutors`}
                        className="flex items-center justify-between rounded-[1.5rem] border border-base-300 bg-base-100 p-5 shadow-sm transition hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-base-200">
                                <img
                                    src={iconUrl}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div>
                                <p className="font-semibold">{language} tutors</p>
                                <p className="text-sm text-base-content/70">Tailored lessons and speaking practice</p>
                            </div>
                        </div>
                        <FiArrowRight className="text-xl text-primary" />
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default Categories;