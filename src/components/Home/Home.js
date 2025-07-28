import React from 'react'
import "./Home.css"
import CsvTable from '../CsvTable/CsvTable'

export const Home = () => {
  return (
    <div className='home'>
      <div className='home__inner'>
        {/* CSVテーブルコンポーネントを表示 */}
        <CsvTable />
      </div>
    </div>
  )
}

export default Home;