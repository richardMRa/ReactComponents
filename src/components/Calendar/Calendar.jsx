import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import './calendar.css'

const Calendar = (props) => {
    const monthDate = {
        lang: 'en-US',
        options: {
            month: 'long'
        }
    }
    const arrMonth = {
        January: 31,
        February: 28,
        March: 31,
        April: 30,
        May: 31,
        June: 30,
        July: 31,
        August: 31,
        September: 30,
        October: 31,
        November: 30,
        December: 31
    }
    const arrDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    const [today, setToday] = useState(new Date())
    const [isFirstRender, setFirstRender] = useState(true)
    const [date, setDate] = useState(new Date())
    const [state, setState] = useState(null)
    const [displaySelect, setDisplaySelect] = useState({ class: '', active: false })
    const [optionsRefs, setOptionsRefs] = useState(null)
    const [selectCurrent, setSelectCurrent] = useState('')
    const selectRef = useRef(null)
    const exitEventRef = props.exitEventRef
    const ifDatesAreEqual = () => {
        if (state) {
            if (today.toLocaleDateString('default', {
                year: 'numeric',
                month: 'long'
            }) === state.selectedDate.toLocaleDateString('default', {
                year: 'numeric',
                month: 'long'
            })) {
                return true
            }
        }
        return false
    }

    const handleNextMonth = () => {
        if (displaySelect.class !== '') {
            setDisplaySelect({ class: '', active: false })
        }
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, '1'))

    }

    const handlePrevMonth = () => {
        if (displaySelect.class !== '') {
            setDisplaySelect({ class: '', active: false })
        }
        if (ifDatesAreEqual()) {
            return
        }
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, '1'))

    }

    const handleMonthSelect = () => {
        if (displaySelect.class === '') {
            setDisplaySelect({ class: 'calendar-month-select-active', active: true })
            return
        }
        setDisplaySelect({ class: '', active: false })

    }
    const handleOptions = (e) => {
        console.log(document.activeElement)
        setSelectCurrent(e.target.innerHTML)
        setDate(new Date(date.getFullYear(), e.target.attributes.monthindex.value, '1'))

    }

    useEffect(() => {
        exitEventRef.current.addEventListener('click', () => {
            if (displaySelect.active) {

                if (document.activeElement !== selectRef.current) {
                    setDisplaySelect({ class: '', active: false })
                }
            }
        })


    }, [state, displaySelect, selectRef])
    useEffect(() => {


        if (isFirstRender) {
            setOptionsRefs(Array(12).fill().map((_, i) => {
                return React.createRef();
            }))
            setFirstRender(false)
        }
        setState({
            firstDay: new Date(date.getFullYear(), date.getMonth(), '1').getDay(),
            selectedDate: new Date(date.getFullYear(), date.getMonth(), date.getDay()),
            selectedYear: date.getFullYear(),
            selectedMonth: date.toLocaleDateString(monthDate.lang, monthDate.options),
            selectedDay: date.getDay(),

        })

    }, [date])

    return (
        <div>
            {state ? (
                <div className="calendar-main-container">
                    <div className="calendar-header">
                        <div className="calendar-controls">
                            <div className={
                                `calendar-prev-button 
                                ${today.toLocaleDateString('default', {
                                    year: 'numeric',
                                    month: 'long'
                                }) === state.selectedDate.toLocaleDateString('default', {
                                    year: 'numeric',
                                    month: 'long'
                                }) ? '' : 'calendar-prev-button-active'}`
                            }
                                onClick={handlePrevMonth}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </div>
                            <div className="calendar-header-label">
                                <div className="calendar-month" onClick={handleMonthSelect}>{state.selectedMonth}
                                    <div className={`calendar-month-select ${displaySelect.class}`} tabIndex={0} ref={selectRef} >
                                        {Array(12).fill().map((_, i) => {
                                            if (date.getFullYear() === today.getFullYear() ){
                                                if (i >= today.getMonth()){
                                                    return (
                                                        <div className={`month-select-option ${optionsRefs[i].current && optionsRefs[i].current.innerHTML === state.selectedMonth ? 'calendar-options-active' : ''}`}
                                                            ref={ele => optionsRefs[i].current = ele}
                                                            onClick={handleOptions}
                                                            monthindex={i}
                                                        >{(new Date(date.getFullYear(), i, '1')).toLocaleDateString(monthDate.lang, monthDate.options)}</div>
                                                    )
                                                }
                                                
                                            } else {
                                                return (
                                                    <div className={`month-select-option ${optionsRefs[i].current && optionsRefs[i].current.innerHTML === state.selectedMonth ? 'calendar-options-active' : ''}`}
                                                        ref={ele => optionsRefs[i].current = ele}
                                                        onClick={handleOptions}
                                                        monthindex={i}
                                                    >{(new Date(date.getFullYear(), i, '1')).toLocaleDateString(monthDate.lang, monthDate.options)}</div>
                                                )
                                            }

                                                
                                        })}
                                    </div>
                                </div>

                                <div className="calendar-year">{state.selectedYear}</div>
                            </div>
                            <div className="calendar-next-button" onClick={handleNextMonth}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className="calendar-body">
                        <div className="calendar-days-main-container">
                            {
                                arrDays.map((weekDay) => {
                                    return (
                                        <div className="calendar-body-weekday">{weekDay.slice(0, 3)}</div>
                                    )
                                })
                            }
                            {
                                /*Days offset*/
                                Array(state.firstDay).fill().map((_, index) => {
                                    return (
                                        <div className="calendar-day-container" key={'calendar-day-offset' + index}></div>
                                    )

                                })
                            }
                            { /* Day tiles*/
                                Array(arrMonth[state.selectedMonth]).fill().map((_, index) => {
                                    return (
                                        <div className="calendar-day-container">
                                            <div key={'calendar-day-key' + index}>{index + 1}</div>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <div> cargando...</div>
            )
            }

        </div>
    )
}

export default Calendar;