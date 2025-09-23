import { motion } from 'motion/react'
import './App.css'
import Banner from './components/Banner/Banner'
import Categories from './components/Categories'
import FAQ from './components/FAQ'
import SmartLearnWorks from './components/SmartLearnWorks'
import Stats from './components/Stats'
import ExpertTutors from './components/ExpertTutors'


function App() {

  return (
    <div className='min-h-screen'>

      <Banner />

      <div className='text-center p-4 overflow-hidden font-bold sm:hidden'>
        <motion.div whileInView={{ scale: 1.1, fontSize: '26px' }} initial={{ fontSize: '20px' }}>
          <h1 className='px-4'>Learn Languages, Anytime, Anywhere.</h1>
        </motion.div>
      </div>
      <div className='text-center p-4 overflow-hidden font-bold hidden sm:block'>
        <motion.div whileInView={{ scale: 1.1, fontSize: '30px' }} initial={{ fontSize: '26px' }}>
          <h1 className='px-4'>Learn Languages, Anytime, Anywhere.</h1>
        </motion.div>
      </div>

      <div className='py-6 px-4 flex justify-center items-center'>
        <Stats />
      </div>

      <div className='py-6 px-4 flex justify-center items-center'>
        <Categories />
      </div>

      <div className='text-center p-4 my-4'>
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: -50 }}
          transition={{ duration: 0.5 }}
        ><h1 className='py-6 text-3xl sm:text-4xl font-bold'>Discover the Language of Possibilities</h1>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 0.6 }}
        >Discover the joy of language learning with SmartLearn. We combine expert guidance, innovative tools, and flexible scheduling to create a personalized experience that ensures your success.
        </motion.div>

      </div>

      <div className='py-6 px-4'>
        <div className='overflow-hidden'>
          <h1 className='text-3xl sm:text-4xl font-bold my-4 text-center'>Expert Tutors at Your Service</h1>
          <ExpertTutors />
        </div>

      </div>

      <div className='py-6'>
        <SmartLearnWorks />
      </div>

      <div className='py-6 px-4 flex justify-center items-center'>
        <FAQ />
      </div>

    </div>
  )
}

export default App
