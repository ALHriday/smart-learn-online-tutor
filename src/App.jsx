
import './App.css'
import Banner from './components/Banner/Banner'
import Categories from './components/Categories'
import FAQ from './components/FAQ'
import Stats from './components/Stats'

function App() {

  return (
    <div className='min-h-screen'>

      <Banner></Banner>

      <div className='text-center p-4'>
        <h1 className='text-2xl'>Learn Languages, Anytime, Anywhere.</h1>
      </div>

      <div className='py-6 px-4 flex justify-center items-center'>
        <Stats></Stats>
      </div>

      <div className='py-6 px-4 flex justify-center items-center'>
        <Categories></Categories>
      </div>

      <div className='text-center p-4'>
        <h1 className='py-6 text-2xl'>Discover the Language of Possibilities</h1>
        Discover the joy of language learning with SmartLearn. We combine expert guidance, innovative tools, and flexible scheduling to create a personalized experience that ensures your success.
      </div>

      <div className='py-6 px-4 flex justify-center items-center'>
        <FAQ></FAQ>
      </div>

    </div>
  )
}

export default App
