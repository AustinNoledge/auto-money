import React, { useState, useEffect } from 'react'
import overlapResultsService from '../services/overlapResults'
import scraperService from '../services/swingTradeBotScraper'
import StoredCombination from './StoredCombination'

const OverlapHoldings = () => {
    const [ overlapResult, setOverlapResult ] = useState([])
    const [ queryMode, setQueryMode ] = useState('')
    const [ firstQuery, setFirstQuery ] = useState('')
    const [ secondQuery, setSecondQuery ] = useState('')

    useEffect(() => {
        overlapResultsService
            .getAll()
            .then(response => {
                setOverlapResult(response)
            })
            .catch(error => console.log(`fail to get overlapResult with error ${error}`))
    }, [])

    const addOverlapResult = (event) => {
        event.preventDefault()
        if (queryMode === '2') {
            scraperService
                .getOverlapHoldings(firstQuery, secondQuery)
                .then(holdings => {
                    console.log(holdings);
                    const newOverlapResult = {
                        fundOne: firstQuery,
                        fundTwo: secondQuery,
                        overlap: holdings,
                        expand: false
                    }
                    overlapResultsService
                        .create(newOverlapResult)
                        .then(response => {
                            setOverlapResult(overlapResult.concat(response))
                            setFirstQuery('')
                            setSecondQuery('')
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        } else if (queryMode === '1') {

        } else if (queryMode === '1b') {

        } else if (queryMode === '3') {

        } else {
            throw new Error('Query mode error')
        }
    }

    const expandOrCollapse = (id) => {
        const origin = overlapResult.find(each => each.id === id)
        const change = {
            ...origin,
            expand: !origin.expand
        }
        overlapResultsService
            .update(id, change)
            .then(response => {
                setOverlapResult(overlapResult.map(each => {
                    return (
                        each.id === id
                        ? response
                        : each
                    )
                }))
            })
            .catch(error => console.log(`fail to update overlapResult with error ${error}`))
    }

    const remove = (id) => {
        overlapResultsService
            .remove(id)
            .then(response => {
                setOverlapResult(overlapResult.filter(each => {
                    return (
                        each.id !== id
                    )
                }))
            })
            .catch(error => console.log(`fail to remove overlapResult with error ${error}`))
    }

    return (
        <div className='overlap-holdings'>
            <h1>Overlap Holdings</h1>

            <form onSubmit={addOverlapResult}>
                <select onChange={event => setQueryMode(event.target.value)}>
                    <option value='2'>两支重叠</option>
                    <option value='3'>三支以上</option>
                    <option value='1'>单支持仓</option>
                    <option value='1b'>反向查询</option>
                </select>
                <br></br>
                <input size={10} value={firstQuery} onChange={event => setFirstQuery(event.target.value.toUpperCase())} />
                AND
                <input size={10} value={secondQuery} onChange={event => setSecondQuery(event.target.value.toUpperCase())} />
                <button type='submit'>
                    Query
                </button>
            </form>

            <table>
                <tbody>
                    {overlapResult.map(each => {
                        return (
                            <StoredCombination key={each.id} combination={each}
                            expandOrCollapse={() => expandOrCollapse(each.id)}
                            remove={() => remove(each.id)} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default OverlapHoldings