import React from 'react'
import { timeTableVal } from '../../common/utility';

function WeekDashboard() {
    const timeArr = timeTableVal;
    const fullAbs = [{
        shortName: 'MAT',
        fullName: 'Mathematics',
        id: '01'
    }, {
        shortName: 'ENG',
        fullName: 'English',
        id: '02'
    }, {
        shortName: 'TEL',
        fullName: 'Telugu',
        id: '03'
    }, {
        shortName: 'HIN',
        fullName: 'Hindi',
        id: '04'
    }, {
        shortName: 'SOC',
        fullName: 'Social',
        id: '05'
    }, {
        shortName: 'SCI-P',
        fullName: 'Physical Science',
        id: '06'
    }, {
        shortName: 'SCI-C',
        fullName: 'Chemical Science',
        id: '07'
    }, {
        shortName: 'PT',
        fullName: 'Games',
        id: '08'
    }, {
        shortName: 'LIB',
        fullName: 'Library',
        id: '09'
    }, {
        shortName: 'LIB-C',
        fullName: 'Computer Library',
        id: '10'
    },]
    
    return (
        <div>
            <div className="week-view-container">
                <div className="g_flex">
                    <div
                        className="g-height-45"
                        style={{
                            width: `${100 / 7}%`,
                        }}
                    ></div>
                    <div
                        className="g_flex g-height-45 day_display_item"
                        style={{
                            width: `${(100 / 7) * 6}%`,
                        }}
                    >
                        {timeArr.map((day) => (
                            <div
                                className="g_flex g-align-center g-justify-center"
                                style={{
                                    width: `${100 / timeArr.length}%`,
                                }}
                                key={`day${day.day}`}
                            >
                                {day.dayShort}
                            </div>
                        ))}
                    </div>
                </div>
                {timeArr.length &&
                    timeArr[0]?.periods.map((time, indx) => (
                        <div className="g_flex" key={`${indx}in`}>
                            <div
                                className="time_item_week"
                                style={{
                                    width: `${100 / 7}%`,
                                    borderTop: indx == 0 ? '1px solid #1D7AF5' : 'none',
                                    borderBottom:
                                        indx == timeArr[0].periods.length - 1
                                            ? '1px solid #1D7AF5'
                                            : 'none',
                                    borderTopLeftRadius: indx == 0 ? '4px' : 'none',
                                    borderTopRightRadius: indx == 0 ? '4px' : 'none',
                                    borderBottomLeftRadius:
                                        indx === timeArr[0].periods.length - 1
                                            ? '4px'
                                            : 'none',
                                    borderBottomRightRadius:
                                        indx === timeArr[0].periods.length - 1
                                            ? '4px'
                                            : 'none',
                                }}
                                key={`${time.timeStart}time_start`}
                            >
                                {time.timeStart}
                            </div>
                            {timeArr.map((tItem, ind) => (
                                <div
                                    key={`${tItem.day}tItem`}
                                    className="g_flex g-align-center g-justify-center"
                                    style={{
                                        width: `${100 / 7}%`,
                                    }}
                                >
                                    {tItem.periods[indx].subShort}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
            <div className='shorthand_names'>
                {fullAbs.map((item) => (
                    <div key={`${item.id}short`} className='short_item'>
                        {item.shortName} - {item.fullName}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeekDashboard