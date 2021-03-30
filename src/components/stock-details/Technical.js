import React from 'react'

const Technical = ({technical}) => {

    if (!technical) {
        return (<tr></tr>)
    }

    return (
        <>
            <tr>
                <th colSpan={4}>Technical</th>
            </tr>
            <tr>
                <td colSpan={2}>MA10: {technical.ma['10']}</td>
                <td colSpan={2}>MACD: {technical.macd['line']}</td>
            </tr>
            <tr>
                <td colSpan={2}>MA50: {technical.ma['50']}</td>
                <td colSpan={2}>MACD-S: {technical.macd['signal']}</td>
            </tr>
            <tr>
                <td colSpan={2}>MA200: {technical.ma['200']}</td>
                <td colSpan={2}>MACD-H: {technical.macd['histogram']}</td>
            </tr>
            <tr>
                <td colSpan={2}>S1: {technical.rs['s1']}</td>
                <td colSpan={2}>R3: {technical.rs['r3']}</td>
            </tr>
            <tr>
                <td colSpan={2}>S2: {technical.rs['s2']}</td>
                <td colSpan={2}>R2: {technical.rs['r2']}</td>
            </tr>
            <tr>
                <td colSpan={2}>S3: {technical.rs['s3']}</td>
                <td colSpan={2}>R1: {technical.rs['r1']}</td>
            </tr>
        </>
    )
}

export default Technical