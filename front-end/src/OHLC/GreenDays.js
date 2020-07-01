import React, {useSate, useEffect} from 'react'
import Day from './Day.js'

const GreenDays = props => {

    let avgUp = 0
    // console.log(props.stats.avgUpFromOpen)

    for (let i of props.stats.avgUpFromOpen) {
        avgUp += i

        if (i > props.stats.largestGainClosePercentage) {
            props.stats.largestGainClosePercentage = i
        }

        if (i < props.stats.smallestGainClosePercentage) {
            props.stats.smallestGainClosePercentage = i
        }
    }

    // console.log('AVG FROM GREEN', avgUp / props.stats.avgUpFromOpen.length)

    return (
        <div className='green-days'>
            <h3>Green Days: <span className='green-span'>{props.stats.greenDays}</span></h3>
            <Day 
             color='green'
            //  days={props.stats.greenDays}
             avgPercentFromClose={props.stats.greenDays === 0 ? 0 : avgUp / props.stats.avgUpFromOpen.length}
             largestClosePercentage={props.stats.greenDays === 0 ? 0 : props.stats.largestGainClosePercentage}
             smallestClosePercentage={props.stats.greenDays === 0 ? 0 : props.stats.smallestGainClosePercentage}
             pop={''}
            />
        </div>
    )
}

export default GreenDays