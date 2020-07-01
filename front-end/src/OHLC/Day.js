import React from 'react'

const Day = props => {
    // console.log('POP',props.pop)
    return (
        <div className='left'>
            {props.color === 'red' && <h6>Avg. Pop: <span className='green-span'>+{props.pop.toFixed(2)}%</span></h6>}
            <h6>Avg. close from Open: <span>{props.color === 'red' ? '-':'+'}{props.avgPercentFromClose.toFixed(2)}%</span></h6>
            <h6>Biggest close from open: <span>{props.color === 'red' ? '-':'+'}{props.largestClosePercentage.toFixed(2)}%</span></h6>
            <h6>Smallest close from open: <span>{props.color === 'red' ? '-':'+'}{props.smallestClosePercentage.toFixed(2)}%</span></h6>
        </div>
    )
}

export default Day