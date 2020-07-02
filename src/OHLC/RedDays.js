import React from 'react'
import Day from './Day.js'

const RedDays = props => {

    let avgDown = 0
    let avgPop = 0
    // console.log(props.stats.avgDownFromOpen)

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
        <div className='red-days'>
            <h3>Red Days: <span>{props.stats.redDays}</span></h3>
            <Day 
             color='red'
            //  days={props.stats.redDays}
             avgPercentFromClose={props.stats.redDays === 0 ? 0 : avgDown / props.stats.avgDownFromOpen.length}
             largestClosePercentage={props.stats.redDays === 0 ? 0 : props.stats.largestLosingClosePercentage}
             smallestClosePercentage={props.stats.redDays === 0 ? 0 : props.stats.smallestLosingClosePercentage}
             pop={props.stats.redDays === 0 ? 0 : avgPop / props.stats.avgPop.length}
            />
        </div>
    )
}

export default RedDays