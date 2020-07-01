import React, {useState, useEffect} from 'react'
import axios from 'axios'
import GreenDays from './GreenDays.js'
import RedDays from './RedDays.js'


const Candles = props => {
    const [open, setOpen] = useState([])
    const [close, setClose] = useState([])
    const [high, setHigh] = useState([])
    const [time, setTime] = useState([])
  
    let today = new Date()
    let to = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)
    let from = new Date(`${today.getFullYear()-5}-${today.getMonth()+1}-${today.getDate()}`)
    // To convert regular date to UNIX we need to divide the result by 1000
  
    useEffect(() => {
      if(open.length === 0) {
        axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=TOPS&resolution=D&from=${from/1000}&to=${to/1000}&token=brtn2j7rh5r9gcjm05e0`)
        .then(res => {setClose(res.data.c); setOpen(res.data.o); setTime(res.data.t); setHigh(res.data.h)})
      }
    },[])
  
    // console.log(close)
    // let closeArr = []
    let stats = {
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

    let temp = []

    for (let i = 1; i < close.length; i++) {
      let openPrice = open[i]
      let closePrice = close[i-1]
    //   let highOfDay = high[i]
  
      let gapUp = openPrice - closePrice

      
  
      if (gapUp*100/closePrice > 30) {
        let timeStamp = new Date(time[i]*1000).toLocaleDateString("en-US")
        // closeArr.push({
        //   prevDayClose: close[i-1],
        //   gapDayOpen: open[i],
        //   gapDayClose: close[i],
        //   date: timeStamp
        // })

        if (open[i] > close[i]) {
            let avgDownFromOpen = (open[i] - close[i]) / open[i] * 100
            let avgPop = (high[i] - open[i]) / open[i] * 100
            stats = {...stats, redDays: stats.redDays + 1, avgDownFromOpen: [...stats.avgDownFromOpen, avgDownFromOpen], avgPop: [...stats.avgPop, avgPop]}
            // temp.push(avgDownFromOpen)
        } else  {
            let avgUpFromOpen = (close[i] - open[i]) / open[i] * 100
            stats = {...stats, greenDays: stats.greenDays + 1, avgUpFromOpen: [...stats.avgUpFromOpen, avgUpFromOpen]}
            temp.push(avgUpFromOpen)
        }
      }
    }
  
    console.log('hello', stats, temp)

    return (
        <div className='flex'>
            <RedDays stats={stats}/>
            <div>
                <h3>Red vs Green</h3>
                <h6>{((stats.avgDownFromOpen.length / (stats.avgDownFromOpen.length + stats.avgUpFromOpen.length)) * 100).toFixed(1)}% / {100 - ((stats.avgDownFromOpen.length / (stats.avgDownFromOpen.length + stats.avgUpFromOpen.length)) * 100).toFixed(1)}%</h6>
            </div>
            <GreenDays stats={stats}/>
        </div>
    )
}

export default Candles