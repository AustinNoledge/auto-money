import React, { useState } from 'react'
import financialService from '../../services/financialModelingPrepAPI'
import swingTradeBotScraper from '../../services/swingTradeBotScraper'

const OverlapHoldings = () => {
    const [ overlapResult, setOverlapResult ] = useState([])
    const [ inputFields, setInputFields ] = useState([''])
    const [ queryMode, setQueryMode ] = useState('ets')

    const changeInputFields = (event, index) => {
        const changedInput = inputFields.map((each, eachIndex) =>
            (eachIndex === index)
                ? event.target.value.toUpperCase()
                : each
        )
        setInputFields(changedInput)
    }

    const changeOverlapResult = (event) => {
        event.preventDefault()
        const promises = []
        const results  = []
        inputFields.forEach(each => {
            if (queryMode === 'ets') {
                promises.push(
                    financialService
                        .getETFHoldings(each)
                        .then(response => {
                            results.push(response)
                        })
                )
            } else {
                promises.push(
                    financialService
                        .getETFHolders(inputFields)
                        .then(response => {
                            results.push(response)
                        })
                )
            }
            
        })
        Promise.all(promises)
            .then(() => {
                setOverlapResult(results.reduce((first, second) => {
                    return first.filter(each => second.indexOf(each) > -1)
                }))
            })
    }

    return (
        <div className='overlap-holdings'>
            <h1>Overlap Holdings</h1>

            <form onSubmit={event => changeOverlapResult(event)}>
                {inputFields.map((each, index) => {
                    if (index === inputFields.length-1) {
                        return  (
                            <div key={index}>
                                <input size={12} value={each} onChange={event => changeInputFields(event, index)} required />
                                <button onClick={() => {
                                    if (inputFields.length > 1) {
                                        setInputFields(inputFields.filter((each, index) => index!==inputFields.length-1))
                                    }
                                }}>-</button>
                                <button onClick={() => {
                                    if (inputFields.length < 4) {
                                        setInputFields(inputFields.concat(''))
                                    }
                                }}>+</button>
                                <select onChange={event => setQueryMode(event.target.value)}>
                                    <option value='ets' selected={queryMode==='ets'}>正向查询持仓</option>
                                    <option value='ste' selected={queryMode==='ste'}>逆向查询机构</option>
                                </select>
                                <button type='submit'>Query</button>
                                <br></br>
                            </div>
                        )
                    }
                    return (
                        <div key={index}>
                            <input size={12} value={each} onChange={event => changeInputFields(event, index)} required />
                            <br></br>
                        </div>
                    )
                })}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>
                            Total {overlapResult.length} results
                        </th>
                    </tr>
                </thead>
                <tbody style={{display:'block', height:'30vh', width:'22vw', overflowY:'scroll'}}>
                    {overlapResult.map((each, index) => {
                        if (queryMode === 'ets') {
                            return (
                                <tr key={index}>
                                    <td>{each}</td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index}>
                                    <td>{each.holder}</td>
                                    <td style={{textAlign: 'right', width: '100%'}}>{each.change}</td>
                                </tr>
                            )
                        }
                        
                    })}
                </tbody>
            </table>

            
        </div>
    )
}

export default OverlapHoldings