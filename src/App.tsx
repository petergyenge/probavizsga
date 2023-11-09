import { useEffect, useState } from 'react'
import './App.css'
import { loadMessages } from './api/get'
import { Laptops } from './api/get'
import LaptopComponent from './components/laptop'
import LaptopMask from './components/loadingMask'

function App() {

  const [laptopsData, setLaptopsData] = useState<Laptops[] | null>()
  const [filteredLaptops, setFilteredLaptops] = useState<Laptops[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortButton, setSortButton] = useState(true);
  const [inputValue, setInputValue] = useState("")

  const getLaptops = async () => {
    const response = await loadMessages()
    if (!response.success) {
    } else {
      if (laptopsData == null) {
      }
      setLaptopsData(response.data)
      setFilteredLaptops(response.data)
      setLoading(false)
    }
  }
  useEffect(() => {
    getLaptops();
    return () => {
    };
  });

  useEffect(() => {
    if (inputValue) {
      const filteredData = laptopsData?.filter(
        (laptop) =>
          laptop.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      if (filteredData) {
        setFilteredLaptops(filteredData)
      }
    } else {
      if (laptopsData) {
        setFilteredLaptops(laptopsData)
      }
    }
  }, [inputValue, laptopsData])

  return (
    <div className='min-h-screen flex justify-center items-center flex-col main-container bg-[#353c51]'>
      <div className="card w-100 bg-base-100 shadow-xl">
        <input type="text" placeholder="Type Here" className="input input-ghost w-full max-w-xs border-[#DEF2F1] rounded-lg"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value) }}
        />
        <button className='btn btn-primary'
          onClick={() => { setSortButton(!sortButton) }}
        >Sort</button>
        <div className="card-body items-center text-center">
          <LaptopMask
            loading={loading}
          />
          {sortButton == true ?
            (
              filteredLaptops?.slice().sort((a, b) => a.weight - b.weight).map((laptop) => (
                <LaptopComponent
                  brand={laptop.brand}
                  name={laptop.name}
                  weight={laptop.weight}
                />
              ))
            ) :
            (
              filteredLaptops?.slice().sort((a, b) => b.weight - a.weight).map((laptop) => (
                <LaptopComponent
                  brand={laptop.brand}
                  name={laptop.name}
                  weight={laptop.weight}
                />
              ))
            )

          }

        </div>
      </div>
    </div>
  )
}

export default App
