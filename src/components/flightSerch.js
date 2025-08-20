// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function FlightSearch() {
//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     departureDate: new Date(),
//     returnDate: null,
//     passengers: 1,
//     tripType: 'oneway'
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (date, field) => {
//     setFormData(prev => ({ ...prev, [field]: date }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams({
//       from: formData.from,
//       to: formData.to,
//       date: formData.departureDate.toISOString().split('T')[0],
//       passengers: formData.passengers
//     }).toString();
//     navigate(`/flights?${query}`);
//   };

//   return (
//     <div className="flight-search">
//       <h2>Find Your Flight</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-md-6">
//             <div className="form-group">
//               <label>From</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="from"
//                 value={formData.from}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="form-group">
//               <label>To</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="to"
//                 value={formData.to}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-6">
//             <div className="form-group">
//               <label>Departure Date</label>
//               <DatePicker
//                 selected={formData.departureDate}
//                 onChange={(date) => handleDateChange(date, 'departureDate')}
//                 className="form-control"
//                 minDate={new Date()}
//                 required
//               />
//             </div>
//           </div>
//           {formData.tripType === 'roundtrip' && (
//             <div className="col-md-6">
//               <div className="form-group">
//                 <label>Return Date</label>
//                 <DatePicker
//                   selected={formData.returnDate}
//                   onChange={(date) => handleDateChange(date, 'returnDate')}
//                   className="form-control"
//                   minDate={formData.departureDate}
//                   required={formData.tripType === 'roundtrip'}
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="row mt-3">
//           <div className="col-md-6">
//             <div className="form-group">
//               <label>Trip Type</label>
//               <select
//                 className="form-control"
//                 name="tripType"
//                 value={formData.tripType}
//                 onChange={handleChange}
//               >
//                 <option value="oneway">One Way</option>
//                 <option value="roundtrip">Round Trip</option>
//               </select>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="form-group">
//               <label>Passengers</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="passengers"
//                 value={formData.passengers}
//                 onChange={handleChange}
//                 min="1"
//                 max="10"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary mt-3">
//           Search Flights
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FlightSearch;