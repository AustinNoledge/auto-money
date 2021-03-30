import React, { useState } from 'react'
import financialService from '../../services/financialModelingPrepAPI'
import OneLineStock from '../overlap-holdings/OneLineStock'
import Fundamental from './Fundamental'
import Technical from './Technical'

const StockDetails = () => {
    const [ watchResult, setWatchResult ] = useState([{'pass': 'pass'}])
    const [ queryStock, setQueryStock ] = useState('')

    const changeWatchResult = (event) => {
        event.preventDefault()
        financialService
            .getQuote(queryStock)
            .then(response => {
                setWatchResult(response)
            })
            .catch(error => {
                console.log(`getQuote failed with error ${error}`);
            })
    }

    return (
        <div className="stock-details">
            <h1>Stock Details</h1>
            <form onSubmit={event => changeWatchResult(event)}>
                <input size={30} value={queryStock} onChange={event => setQueryStock(event.target.value.toUpperCase())} />
                <button type='submit'>Query</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>General Info</th>
                    </tr>
                </thead>
                <tbody style={{tableLayout:'fixed', display:'block', height:'30vh', width:'22vw', overflowY:'scroll'}}>
                    {Object.keys(watchResult[0]).map(eachKey => {
                        if (eachKey !== 'pass') {
                            return (
                                <tr key={eachKey}>
                                    <td>{eachKey}</td>
                                    <td style={{textAlign: 'right', width: '100%'}}>{watchResult[0][eachKey]}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StockDetails