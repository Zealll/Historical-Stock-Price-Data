import React from 'react'

const Day = props => {
    console.log('POP',props.pop)
    return (
        <div>
            {props.color === 'red' && <h6>Avg. Pop: +{props.pop.toFixed(2)}%</h6>}
            <h6>Avg. close from Open: {props.color === 'red' ? '-':'+'}{props.avgPercentFromClose.toFixed(1)}%</h6>
            <h6>Biggest close from open: {props.color === 'red' ? '-':'+'}{props.largestClosePercentage.toFixed(2)}%</h6>
            <h6>Smallest close from open: {props.color === 'red' ? '-':'+'}{props.smallestClosePercentage.toFixed(2)}%</h6>
        </div>
    )
}

export default Day