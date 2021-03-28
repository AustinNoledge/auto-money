import React, { useState, useEffect } from 'react'
import OneLineStock from './OneLineStock'
import Fundamental from './Fundamental'
import Technical from './Technical'
import watchResultService from '../services/watchResult'

const StockDetails = () => {
    const [ watchResult, setWatchResult ] = useState([])

    useEffect(() => {
        watchResultService
            .getOne()
            .then(response => {
                setWatchResult(response)
            })
    }, [])

    return (
        <div className="stock-details">
            <h1>Stock Details</h1>
            <table>
                <tbody>
                    <OneLineStock symbol={watchResult.symbol}
                    colSpan={0} realtime={watchResult.realtime} />
                    <Fundamental fundamental={watchResult.fundamental} />
                    <Technical technical={watchResult.technical} />
                </tbody>
            </table>
        </div>
    )
}

export default StockDetails