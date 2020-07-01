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
        <div>
            <h3>Green Days: {props.stats.greenDays}</h3>
            <Day 
             color='green'
            //  days={props.stats.greenDays}
             avgPercentFromClose={avgUp / props.stats.avgUpFromOpen.length}
             largestClosePercentage={props.stats.largestGainClosePercentage}
             smallestClosePercentage={props.stats.smallestGainClosePercentage}
             pop={''}
            />
        </div>
    )
}

export default GreenDays