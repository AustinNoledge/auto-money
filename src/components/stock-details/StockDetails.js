import React, { useState } from 'react'
import financialService from '../../services/financialModelingPrepAPI'

const StockDetails = () => {
    const [ watchResult, setWatchResult ] = useState([{'pass': 'pass'}])
    const [ queryStock, setQueryStock ] = useState('')
    const [ watchMode, setWatchMode ] = useState(0)

    const changeWatchResult = (event) => {
        event.preventDefault()
        const methods = [financialService.getQuote, financialService.getRatios]
        const promises= []
        const results = []
        methods.forEach(method => {
            promises.push(
                method(queryStock)
                    .then(response => {
                        results.push(response)
                    })
            )
        })
        Promise.all(promises).then(() => {
            console.log(results);
            setWatchResult(results)
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
                <select onChange={event => setWatchMode(event.target.value)}>
                    <option value={0} selected>General Info</option>
                    <option value={1}>Financial Ratios</option>
                    <option value={2}>Technical Indicators未完成</option>
                    <option value={3}>Patterns Recognition未完成</option>
                </select>
                <tbody style={{tableLayout:'fixed', display:'block', height:'35vh', width:'30vw', overflowY:'scroll'}}>
                    {Object.keys(watchResult[watchMode]).map(eachKey => {
                        if (eachKey !== 'pass') {
                            return (
                                <tr key={eachKey}>
                                    <td>{eachKey}</td>
                                    <td style={{textAlign: 'right', width: '100%'}}>{watchResult[watchMode][eachKey]}</td>
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