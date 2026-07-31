import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const AuthLayout = ({ title, subtitle, children, image }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-base-300/70 bg-base-100/80 shadow-2xl backdrop-blur lg:flex-row">
                <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 p-8 sm:p-10 lg:p-12">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                            Smart Learn
                        </div>
                        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">{title}</h1>
                        <p className="mt-3 max-w-md text-base text-base-content/70">{subtitle}</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="mt-8 hidden rounded-2xl border border-base-300/70 bg-base-200/70 p-4 shadow-inner lg:block"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-xl font-bold text-white">
                                {image}
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Learn with confidence</p>
                                <p className="text-sm text-base-content/70">Personalized guidance, engaging lessons, and vibrant support.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-1 items-center justify-center p-6 sm:p-8 lg:p-10">
                    <div className="w-full max-w-md">{children}</div>
                </div>
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    image: PropTypes.node
};

export default AuthLayout;
