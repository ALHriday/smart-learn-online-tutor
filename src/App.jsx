import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import './App.css';
import Banner from './components/Banner/Banner';
import FAQ from './components/FAQ';
import SmartLearnWorks from './components/SmartLearnWorks';
import Stats from './components/Stats';
import Categories from './components/Categories';
import ExpertTutors from './components/ExpertTutors';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiBookOpen, FiCompass, FiStar } from 'react-icons/fi';

function App() {
  return (
    <main className='min-h-screen bg-base-100 text-base-content'>
      <Helmet>
        <title>SmartLearn | Home</title>
        <meta name="description" content="Discover expert tutors, explore languages, and build your learning path with SmartLearn." />
      </Helmet>

      <Banner />

      <section aria-labelledby="hero-title" className='mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.35 }}
          className='rounded-[2rem] border border-base-300 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-8 shadow-sm sm:p-10'
        >
          <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <p className='text-sm uppercase tracking-[0.3em] text-primary'>Learn smarter</p>
              <h1 id="hero-title" className='mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl'>Learn languages anytime, anywhere.</h1>
              <p className='mt-4 text-base leading-8 text-base-content/70'>SmartLearn connects you with expert tutors for real conversation, guided practice, and meaningful progress in a flexible online space.</p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Link to='/find_tutors' className='btn btn-secondary rounded-full'>Explore tutors</Link>
              <Link to='/become_tutor' className='btn btn-outline rounded-full'>Become a tutor</Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section aria-label="Platform statistics" className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
        <Stats />
      </section>

      <section aria-labelledby="categories-title" className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
          <div>
            <p className='text-sm uppercase tracking-[0.3em] text-secondary'>Popular languages</p>
            <h2 id="categories-title" className='mt-2 text-2xl font-semibold sm:text-3xl'>Pick a path that fits your goals</h2>
          </div>
          <Link to='/find_tutors' className='inline-flex items-center gap-2 text-sm font-medium text-primary'>Browse all tutors <FiArrowRight /></Link>
        </div>
        <Categories />
      </section>

      <section className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35 }}
          className='rounded-[2rem] border border-base-300 bg-base-100 p-8 shadow-sm sm:p-10'
        >
          <div className='grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
            <div>
              <p className='text-sm uppercase tracking-[0.3em] text-accent'>Why learners choose us</p>
              <h2 className='mt-3 text-2xl font-semibold sm:text-3xl'>Discover the language of possibilities</h2>
              <p className='mt-4 text-base leading-8 text-base-content/70'>We blend expert guidance, flexible scheduling, and interactive lessons to make progress feel motivating from day one.</p>
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border border-base-300 bg-base-200/70 p-4'>
                <FiBookOpen className='text-2xl text-primary' />
                <p className='mt-3 font-semibold'>Structured lessons</p>
                <p className='mt-1 text-sm text-base-content/70'>Tailored sessions designed around your pace and goals.</p>
              </div>
              <div className='rounded-2xl border border-base-300 bg-base-200/70 p-4'>
                <FiCompass className='text-2xl text-secondary' />
                <p className='mt-3 font-semibold'>Personal guidance</p>
                <p className='mt-1 text-sm text-base-content/70'>Mentors that help you speak with confidence in real situations.</p>
              </div>
              <div className='rounded-2xl border border-base-300 bg-base-200/70 p-4 sm:col-span-2'>
                <FiStar className='text-2xl text-accent' />
                <p className='mt-3 font-semibold'>A calm, focused experience</p>
                <p className='mt-1 text-sm text-base-content/70'>Enjoy a welcoming platform built for learners who want clarity, support, and momentum.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="tutors-title" className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mb-6 text-center'>
          <p className='text-sm uppercase tracking-[0.3em] text-primary'>Meet the tutors</p>
          <h2 id="tutors-title" className='mt-2 text-2xl font-semibold sm:text-3xl'>Expert tutors at your service</h2>
        </div>
        <ExpertTutors />
      </section>

      <section className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <SmartLearnWorks />
      </section>

      <section aria-labelledby="faq-title" className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <FAQ />
      </section>
    </main>
  );
}

export default App;
