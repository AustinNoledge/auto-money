import React from 'react'
import OneLineStock from './OneLineStock'

const StoredCombination = ({combination, expandOrCollapse, remove}) => {


    if (combination.expand) {
        return (
            <>
                <tr>
                    <td>
                        {`${combination.fundOne}-${combination.fundTwo}`}
                    </td>
                    <td>
                        <button onClick={expandOrCollapse}>
                            Collapse
                        </button>
                    </td>
                    <td>
                        <button onClick={remove}>
                            Remove
                        </button>
                    </td>
                </tr>
                {combination.overlap.map((each, index) => {
                    return (
                        <OneLineStock key={index} symbol={each} colSpan={3} details={false} />
                    )
                })}
            </>
        )
    } else {
        return (
            <>
                <tr>
                    <td>
                        {`${combination.fundOne}-${combination.fundTwo}`}
                    </td>
                    <td>
                        <button onClick={expandOrCollapse}>
                            Expand{` ${combination.overlap.length}`}
                        </button>
                    </td>
                    <td>
                        <button onClick={remove}>
                            Remove
                        </button>
                    </td>
                </tr>
            </>
        )
    }
}

export default StoredCombination