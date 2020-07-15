import React, { useState } from 'react'
import axios from 'axios'
import GreenDays from './GreenDays.js'
import RedDays from './RedDays.js'
import Inputs from './Inputs.js'


const Candles = props => {
    const [open, setOpen] = useState([])
    const [close, setClose] = useState([])
    const [high, setHigh] = useState([])
    // const [time, setTime] = useState([])
    const [years, setYears] = useState(1)
    const [gapPercentage, setGapPercentage] = useState(0)
    const [ticker, setTicker] = useState('')
    const [filter, setFilter] = useState(false)
    const [stats, setStats] = useState({
        redDays: 0,
        greenDays: 0,
        avgDownFromOpen: [],
        avgUpFromOpen: [],
        largestLosingClosePercentage: 0,
        largestGainClosePercentage: 0,
        smallestLosingClosePercentage: Infinity,
        smallestGainClosePercentage: Infinity,
        avgPop: []
    })
  
    let today = new Date()
    let to = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)
    let from = new Date(`${today.getFullYear()-years}-${today.getMonth()+1}-${today.getDate()}`)
    // To convert regular date to UNIX we need to divide the result by 1000
    
    const search = e => {
        e.preventDefault()
        axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${ticker.toUpperCase()}&resolution=D&from=${from/1000}&to=${to/1000}&token=brtn2j7rh5r9gcjm05e0`)
        .then(res => { 
            if (res.data.error) {
                window.alert(`${res.data.error} Please enter a correct Ticker`)
            } else {
                setClose(res.data.c)
                setOpen(res.data.o)
                // setTime(res.data.t)
                setHigh(res.data.h)
                setFilter(true)
            }
        })
    }
  
    

    if (filter) {
        let statsObj = {
            redDays: 0,
            greenDays: 0,
            avgDownFromOpen: [],
            avgUpFromOpen: [],
            largestLosingClosePercentage: 0,
            largestGainClosePercentage: 0,
            smallestLosingClosePercentage: Infinity,
            smallestGainClosePercentage: Infinity,
            avgPop: []
        }

        for (let i = 1; i < close.length; i++) {
          let openPrice = open[i]
          let closePrice = close[i-1]
      
          let gapUp = openPrice - closePrice
    
          
      
          if (gapUp*100/closePrice > gapPercentage) {
            // let timeStamp = new Date(time[i]*1000).toLocaleDateString("en-US")
    
            if (open[i] > close[i]) {
                let avgDownFromOpen = (open[i] - close[i]) / open[i] * 100
                let avgPop = (high[i] - open[i]) / open[i] * 100
                statsObj = {...statsObj, redDays: statsObj.redDays + 1, avgDownFromOpen: [...statsObj.avgDownFromOpen, avgDownFromOpen], avgPop: [...statsObj.avgPop, avgPop]}
            } else if(open[i] < close[i])  {
                let avgUpFromOpen = (close[i] - open[i]) / open[i] * 100
                statsObj = {...statsObj, greenDays: statsObj.greenDays + 1, avgUpFromOpen: [...statsObj.avgUpFromOpen, avgUpFromOpen]}
            }
          }
        }
        setStats(statsObj)
        setFilter(false)
    }
    
    return (
            <div className='wrapper'>
                <Inputs 
                ticker={ticker}
                setTicker={setTicker}
                years={years}
                setYears={setYears}
                gapPercentage={gapPercentage}
                setGapPercentage={setGapPercentage}
                search={search}
                setFilter={setFilter}
                />
                <div className='flex'>
                    <RedDays stats={stats}/>
                    <div className='basic-stats'>
                        <h3><span className='red-span'>Red</span> vs <span className='green-span'>Green</span></h3>
                        {stats.avgDownFromOpen.length + stats.avgUpFromOpen.length === 0 ? <h6><span className='red-span'>0%</span> / <span className='green-span'>0%</span></h6> : <h6><span className='red-span'>{((stats.avgDownFromOpen.length / (stats.avgDownFromOpen.length + stats.avgUpFromOpen.length)) * 100).toFixed(1)}%</span> / <span className='green-span'>{(100 - ((stats.avgDownFromOpen.length / (stats.avgDownFromOpen.length + stats.avgUpFromOpen.length)) * 100)).toFixed(1)}%</span></h6>}
                    </div>
                    <GreenDays stats={stats}/>
                </div>
            </div>
        )
}

export default Candles