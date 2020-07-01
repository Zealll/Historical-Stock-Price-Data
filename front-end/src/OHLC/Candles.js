import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Candles = props => {
    const [open, setOpen] = useState([])
    const [close, setClose] = useState([])
    const [time, setTime] = useState([])
  
    let today = new Date()
    let to = new Date(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)
    let from = new Date(`${today.getFullYear()-5}-${today.getMonth()+1}-${today.getDate()}`)
    // To convert regular date to UNIX we need to divide the result by 1000
  
    useEffect(() => {
      if(open.length === 0) {
        axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=TOPS&resolution=D&from=${from/1000}&to=${to/1000}&token=brtn2j7rh5r9gcjm05e0`)
        .then(res => {setClose(res.data.c); setOpen(res.data.o); setTime(res.data.t)})
      }
    },[])
  
    // console.log(close)
    let closeArr = []
    let stats = {
        redDays: 0,
        greenDays: 0,
        avgDownFromClose: [],
        avgUpFromClose: [],
        largestLosingClosePercentage: 0,
        largestGainClosePercentage: 0,
        smallestLosingClosePercentage: Infinity,
        smallestGainClosePercentage: Infinity
    }

    let temp = []

    for (let i = 1; i < close.length; i++) {
      let openPrice = open[i]
      let closePrice = close[i-1]
  
      let gapUp = openPrice - closePrice

      
  
      if (gapUp*100/closePrice > 30) {
        let timeStamp = new Date(time[i]*1000).toLocaleDateString("en-US")
        closeArr.push({
          prevDayClose: close[i-1],
          gapDayOpen: open[i],
          gapDayClose: close[i],
          date: timeStamp
        })

        if (open[i] > close[i]) {
            let avgDownFromClose = (open[i] - close[i]) / open[i] * 100
            stats = {...stats, redDays: stats.redDays + 1, avgDownFromClose: [...stats.avgDownFromClose, avgDownFromClose]}
            // temp.push(avgDownFromClose)
        } else  {
            let avgUpFromClose = (close[i] - open[i]) / open[i] * 100
            stats = {...stats, greenDays: stats.greenDays + 1, avgUpFromClose: [...stats.avgUpFromClose, avgUpFromClose]}
            temp.push(avgUpFromClose)
        }
      }
    }
  
    console.log('hello',closeArr, stats, temp)

    let avgDown = 0
    let avgUp = 0

    for (let i of stats.avgDownFromClose) {
        avgDown += i

        if (i > stats.largestLosingClosePercentage){
            stats.largestLosingClosePercentage = i
        }

        if (i < stats.smallestLosingClosePercentage) {
            stats.smallestLosingClosePercentage = i
        }
    }
    for (let i of stats.avgUpFromClose) {
        avgUp += i

        if (i > stats.largestGainClosePercentage) {
            stats.largestGainClosePercentage = i
        }

        if (i < stats.smallestGainClosePercentage) {
            stats.smallestGainClosePercentage = i
        }
    }
    // console.log(avgDown / stats.avgDownFromClose.length, avgUp / stats.avgUpFromClose.length)

    return (
        <div></div>
    )
}

export default Candles