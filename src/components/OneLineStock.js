import React from 'react'

const OneLineStock = ({symbol, colSpan, realtime}) => {

    if (realtime) {
        return (
            <tr>
                <td>{symbol}</td>
                <td>{realtime.price}$</td>
                <td>{realtime.change}%</td>
                <td>{realtime.volume}</td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td colSpan={colSpan-1}>
                    {symbol}
                </td>
                <td>
                    <button>Details</button>
                </td>
            </tr>
        )
    }
    
}

export default OneLineStock