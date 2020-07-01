import React, {useState, useEffect} from 'react'
import Day from './Day.js'

const RedDays = props => {

    let avgDown = 0
    let avgPop = 0

    for (let i = 0; i < props.stats.avgDownFromOpen.length; i++) {
        avgDown += props.stats.avgDownFromOpen[i]
        avgPop += props.stats.avgPop[i]

        if (props.stats.avgDownFromOpen[i] > props.stats.largestLosingClosePercentage){
            props.stats.largestLosingClosePercentage = props.stats.avgDownFromOpen[i]
        }

        if (props.stats.avgDownFromOpen[i] < props.stats.smallestLosingClosePercentage) {
            props.stats.smallestLosingClosePercentage = props.stats.avgDownFromOpen[i]
        }

    }

    // console.log('AVG FROM RED', avgDown / props.stats.avgDownFromOpen.length)
    // console.log('LENGTH', props.stats.avgDownFromOpen.length, props.stats.avgPop.length)

    return (
        <div>
            <h3>Red Days: {props.stats.redDays}</h3>
            <Day 
             color='red'
            //  days={props.stats.redDays}
             avgPercentFromClose={avgDown / props.stats.avgDownFromOpen.length}
             largestClosePercentage={props.stats.largestLosingClosePercentage}
             smallestClosePercentage={props.stats.smallestLosingClosePercentage}
             pop={avgPop / props.stats.avgPop.length}
            />
        </div>
    )
}

export default RedDays