import React from 'react'

const Fundamental = ({fundamental}) => {

    if (!fundamental) {
        return (<tr></tr>)
    }

    return (
        <>
            <tr>
                <th colSpan={4}>Fundamental</th>
            </tr>
            <tr>
                <td colSpan={2}>EPS: {fundamental.eps}</td>
                <td colSpan={2}>PE: {fundamental.pe}</td>
            </tr>
            <tr>
                <td colSpan={2}>POG: {fundamental.pog}</td>
                <td colSpan={2}>PS: {fundamental.ps}</td>
            </tr>
            <tr>
                <td colSpan={2}>CAP: {fundamental.cap}</td>
                <td colSpan={2}>PB: {fundamental.pb}</td>
            </tr>
        </>
    )
}

export default Fundamental