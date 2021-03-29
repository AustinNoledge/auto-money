import React from 'react'
import OverlapHoldings from './components/OverlapHoldings'
import StockDetails from './components/StockDetails'
import Portfolio from './components/Portfolio'
import SectorPerformance from './components/SectorPerformance'

const App = () => {

  return (
    <div className='grid-container'>
      <OverlapHoldings />
      <StockDetails />
      <Portfolio />
      <SectorPerformance />
    </div>
  )
}

export default App