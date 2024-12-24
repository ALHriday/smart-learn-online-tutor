
import './App.css'
import Banner from './components/Banner/Banner'
import Categories from './components/Categories'
import Stats from './components/Stats'

function App() {

  return (
    <div className='min-h-screen'>
      <Banner></Banner>
      <div className='py-12 px-4 flex justify-center items-center'>
        <Stats></Stats>
      </div>
      <div className='py-12 px-4 flex justify-center items-center'>
        <Categories></Categories>
      </div>
    </div>
  )
}

export default App
