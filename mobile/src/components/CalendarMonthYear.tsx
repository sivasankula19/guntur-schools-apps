import React, { useState, useEffect } from 'react';

const CalendarComponent = ({ month, year }:any) => {
  const [dates, setDates] = useState<any>([]);

  useEffect(() => {
    const datesList:any = getDatesForMonth(month, year);
    setDates(datesList);
  }, [month, year]);

  return (
    <div>
      <h1>Dates for {month}/{year}</h1>
      <ul>
        {dates.map((date:any, index:number) => (
          <li key={index}>
            {date.day}, {date.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

const getDatesForMonth = (month:number, year:number) => {
  const dates = [];
  let date = new Date(year, month - 1, 1);

  while (date.getMonth() === month - 1) {
    dates.push({
      day: date.toLocaleString('en-US', { weekday: 'long' }),
      date: date.getDate(),
    });
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export default CalendarComponent;
