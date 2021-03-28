import React from 'react'
import OverlapHoldings from './components/OverlapHoldings'
import StockDetails from './components/StockDetails'

const App = () => {

  return (
    <div className='grid-container'>
      <OverlapHoldings />
      <StockDetails />
    </div>
  )
}

export default App