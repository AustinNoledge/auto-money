import React, { useState, useEffect } from 'react'
import overlapResultsService from '../services/overlapResults'
import StoredCombination from './StoredCombination'

const OverlapHoldings = () => {
    const [ overlapResult, setOverlapResult ] = useState([])
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
        const newOverlapResult = {
            fundOne: firstQuery,
            fundTwo: secondQuery,
            overlap:[
                'Ticker#1',
                'Ticker#2'
            ],
            expand: false
        }
        overlapResultsService
            .create(newOverlapResult)
            .then(response => {
                setOverlapResult(overlapResult.concat(response))
                setFirstQuery('')
                setSecondQuery('')
            })
            .catch(error => console.log(`fail to create overlapResult with error ${error}`))
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