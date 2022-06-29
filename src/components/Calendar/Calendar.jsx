import React, { useState } from "react";
import { useEffect } from "react";
import './calendar.css'

const Calendar = () => {
    const monthDate = {
        lang: 'en-ES',
        options: {
            month: 'long'
        }
    };
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
    };
    const [date, setDate] = useState(new Date())
    const [state, setState] = useState(
        {
            firstDay: '',
            selectedDate: '',
            selectedYear: date.getFullYear(),
            selectedMonth: date.toLocaleDateString(monthDate.lang, monthDate.options),
            selectedDay: date.getDate(),
        }
    );
    
    useEffect(() => {
        console.log(arrMonth[state.selectedMonth])
    })

    return (
        <div>
            <div className="calendar-main-container">
                <div className="calendar-header">
                    <div className="calendar-controls">
                        <div className="calendar-prev-button">
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="calendar-header-label">
                            <div className="calendar-month">{state.selectedMonth}</div>
                            <div className="calendar-year">{state.selectedYear}</div>
                        </div>
                        <div className="calendar-next-button">
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <div className="calendar-days-container">
                    Array(arrMonth[state.selectedMonth])
                </div>
            </div>
        </div>
    )
}

export default Calendar;