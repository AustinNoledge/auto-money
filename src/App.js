import React from 'react'
import OverlapHoldings from './components/overlap-holdings/OverlapHoldings'
import StockDetails from './components/stock-details/StockDetails'
import Portfolio from './components/portfolio/Portfolio'
import SectorPerformance from './components/sector-performance/SectorPerformance'

const App = () => {

  return (
    <div className='grid-container'>
      <SectorPerformance />
      <OverlapHoldings />
      <StockDetails />
      <Portfolio />
    </div>
  )
}

export default App