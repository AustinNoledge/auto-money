import React, { useState, useEffect } from 'react'
import financialService from '../../services/financialModelingPrepAPI'

const SectorPerformance = () => {
    const [ sectors, setSectors ] = useState([])

    useEffect(() => {
        console.log('1 time');
        financialService
            .getSectorsPerformance()
            .then(response => {
                setSectors(response)
            })
    }, [])
    

    return (
        <div className='sector-performance'>
            <h1>Sectors Performance</h1>
            <table>
                <tbody style={{display:'block', height:'100vh', overflowY:'scroll'}}>
                    {sectors.map((each, index) => {
                        return (
                            <tr key={index}>
                                <td>{each.sector}</td>
                                <td style={{textAlign:'right'}}>{each.changesPercentage}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SectorPerformance