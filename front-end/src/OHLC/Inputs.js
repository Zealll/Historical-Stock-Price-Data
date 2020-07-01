import React, { useState, useEffect } from 'react'

const Inputs = props => {

    const changeHandler = e => {
        props.setTicker(e.target.value)
    }

    const yearHandler = e => {
        props.setYears(Number(e.target.value))
    }

    const percentHandler = e => {
        props.setGapPercentage(Number(e.target.value))
        props.setFilter(true)
    }

    return (
        <div className='inputs'>
            <div className='input-flex second'>
                <div className='input-flex'>
                    <h6>Ticker Symbol:</h6>
                    <form onSubmit={props.search}>
                        <input 
                        value={props.ticker.toUpperCase()}
                        onChange={changeHandler}
                        placeholder='Ticker'
                        />
                    </form>
                </div>

                <div className='input-flex'>
                    <h6>Last</h6>
                    <form className='input-flex' onSubmit={props.search}>

                        <select onChange={yearHandler}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        {props.years === 1 ? <h6>year</h6> : <h6>years</h6>}
                        {/* <button>hello</button> */}
                    </form>
                </div>
            </div>

            <button onClick={props.search}>Analyze</button>
            

            <div className='input-flex middle'>
                <h6>Gap percentage above:</h6>
                <select onChange={percentHandler}>
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                    <option value={25}>25%</option>
                    <option value={30}>30%</option>
                    <option value={35}>35%</option>
                    <option value={40}>40%</option>
                    <option value={45}>45%</option>
                    <option value={50}>50%</option>
                    <option value={55}>55%</option>
                    <option value={60}>60%</option>
                    <option value={65}>65%</option>
                    <option value={70}>70%</option>
                    <option value={75}>75%</option>
                    <option value={80}>80%</option>
                    <option value={85}>85%</option>
                    <option value={90}>90%</option>
                    <option value={95}>95%</option>
                    <option value={100}>100%</option>
                </select>
            </div>

        </div>
    )
}

export default Inputs