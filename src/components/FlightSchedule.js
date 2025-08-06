import React, { useState } from 'react';
import './FlightSchedule.css';

const mockResults = [
  { flight: 'AI‑101', from: 'DEL', to: 'BLR', dep: '10:00', arr: '12:30', days: 'Mon,Wed,Fri', aircraft: 'A320' },
  { flight: 'AI‑202', from: 'BLR', to: 'DEL', dep: '14:15', arr: '16:45', days: 'Tue,Thu,Sat', aircraft: 'A320' },
];

const FlightSchedule = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [scheduleType, setScheduleType] = useState('weekly');
  const [date, setDate] = useState('');
  const [directOnly, setDirectOnly] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Normally API call here
    setResults(mockResults);
  };

  return (
    <div className="schedule-container">
      <h1>Flight Schedule</h1>
      <form className="schedule-form" onSubmit={handleSearch}>
        <div className="row">
          <select value={origin} onChange={e => setOrigin(e.target.value)} required>
            <option value="">Origin</option>
            <option>DEL</option>
            <option>BOM</option>
            <option>BLR</option>
          </select>
          <select value={destination} onChange={e => setDestination(e.target.value)} required>
            <option value="">Destination</option>
            <option>BLR</option>
            <option>DEL</option>
            <option>MUM</option>
          </select>
        </div>

        <div className="row">
          <label>
            <input
              type="radio"
              name="type"
              value="weekly"
              checked={scheduleType === 'weekly'}
              onChange={() => setScheduleType('weekly')}
            />
            Weekly Schedule
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="date"
              checked={scheduleType === 'date'}
              onChange={() => setScheduleType('date')}
            />
            Selected Date
          </label>
          {scheduleType === 'date' && (
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
          )}
        </div>

        <label className="direct">
          <input
            type="checkbox"
            checked={directOnly}
            onChange={e => setDirectOnly(e.target.checked)}
          />
          Direct flights only
        </label>

        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>From</th>
              <th>To</th>
              <th>Dep</th>
              <th>Arr</th>
              <th>Days</th>
              <th>Aircraft</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.flight}</td>
                <td>{r.from}</td>
                <td>{r.to}</td>
                <td>{r.dep}</td>
                <td>{r.arr}</td>
                <td>{r.days}</td>
                <td>{r.aircraft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlightSchedule;
