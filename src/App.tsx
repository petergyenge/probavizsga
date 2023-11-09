import { useEffect, useState } from 'react'
import './App.css'
import { loadMessages } from './api/get'
import { Laptops } from './api/get'
import LaptopComponent from './components/laptop'
import LaptopMask from './components/loadingMask'
import { searchLaptops } from './api/search'

function App() {

  const [laptopsData, setLaptopsData] = useState<Laptops[] | null>()
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
      setLoading(false)
    }
  }

  const searchLaptopsCall = async (inputValue: string) => {
    const response = await searchLaptops(inputValue)
    if (!response.success) {
    } else {
      if (laptopsData == null) {
      }
      setLaptopsData(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getLaptops();
    return () => {
    };
  });

  useEffect(() => {
    searchLaptopsCall(inputValue);
  }, [inputValue]);

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
              laptopsData?.slice().sort((a, b) => a.weight - b.weight).map((laptop) => (
                <LaptopComponent
                  brand={laptop.brand}
                  name={laptop.name}
                  weight={laptop.weight}
                />
              ))
            ) :
            (
              laptopsData?.slice().sort((a, b) => b.weight - a.weight).map((laptop) => (
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
