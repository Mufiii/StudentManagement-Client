import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { selectStudent } from '../../../Redux/Slices/StudentDataSlice';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button } from '@material-tailwind/react';

const AddBusService = () => {
  const { studentId } = useParams();
  const student = useSelector(selectStudent);
  const [busData, setBusData] = useState([]);
  const [busRoute, setBusRoute] = useState(-1);
  const [edit, setEdit] = useState(false);
  const [studentBusData, setStudentBusData] = useState(0);
  const [TotalFeeConfirm, setTotalFeeConfirm] = useState(false)

  console.log(student);

  const AddBusSearcheApi = async (e) => {

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}students/buspoints/search/?query=${e}`
      );
      const data = response.data;
      console.log(data);
      setBusData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const AddBusServiceApi = async (busPointId, routeNumber) => {
    console.log(studentBusData, 'lllllllllllllllllll');
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL_SERVER}students/schoolbus/`,
        {
          "student_id": student.id,
          "bus_point_id": busPointId,
          "route_number": routeNumber,
          "changed_fee": studentBusData
        },

      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(busRoute, 'dd');
  const anualIncomeHandler = (e) => {
    e.preventDefault()
    console.warn(e.target[0].value);
    setEdit(false)
    setStudentBusData(parseInt(e.target[0].value))

  }
  const finalSaveHandler = (busPointId, routeNumber) => {
    console.log(student);

    // Update state using a function to access the previous state


    // Call the API to save the data
    AddBusServiceApi(busPointId, routeNumber);
  };
  console.log(studentBusData, '................................');
  const editerHandler = () => {
    setEdit(true)
    TotalFeeConfirm(false)
  }
  return (
    <div>
      <Typography variant='h2'>Add Bus Service for {studentId && student.user.name}</Typography>
      <div className='flex mt-5 gap-5'>
        {!studentId && (
          <div className='flex flex-col'>
            <label className='font-bold text-lg mb-2'>Search for Students: </label>
            <TextField
              type='text'
              name='pen_no'
              id='student-search'
              InputProps={{
                className: 'bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-1', // Increase padding
              }}
              placeholder='Search for a student'
              required
              sx={{ width: 400 }}
            />
          </div>
        )}
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <label className='font-bold text-lg mb-2'>Search for a bus point: </label>
            <TextField
              id='buspoint-search'
              onChange={(e) => AddBusSearcheApi(e.target.value)}
              type='text'
              name='pen_no'
              variant='outlined'
              InputProps={{
                className: 'bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-1', // Increase padding
              }}
              placeholder='Search for a bus point'
              required
              sx={{ width: 400 }} // Adjust the width using the sx prop
            />
          </div>
          {busData.length > 0 && (
            <div className='mt-2'>
              {busData && busData.map((item, index) => (
                <Card
                  key={index}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2'
                  onClick={(e) => setBusRoute(index)}
                >
                  <div className="p-2">
                    buspoint :  <span className="font-semibold">{item.name}</span> | <br />
                    monthly charge : <span className="font-semibold">{item.fee}</span> | <br />
                    yearly charge : <span className="font-semibold">{10 * item.fee}</span> | <br />
                    from location : <span className="font-semibold">{item.route.from_location}</span> | <br />
                    route number : <span className="font-semibold">{item.route.route_no}</span> |
                    to location :  <span className="font-semibold">{item.route.to_location}</span> | <br />
                    bus number : <span className="font-semibold">{item.route.bus.bus_no}</span> | <br />
                    capacity :  <span className="font-semibold">{item.route.bus.capacity}</span>

                  </div>
                </Card>
              ))}
            </div>
          )}

        </div>
        {busRoute !== -1 &&
          <Card className='bg-white border border-gray-300 shadow-md rounded-lg w-full mb-4'>
            <div className="p-4 space-y-4">
              {student && (
                <div className="border-b border-gray-200 pb-2 mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Student Information</h2>
                  <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">Name:</span> {student.user.name}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Admission Number:</span> {student.admission_no}</p>
                  <p className="text-sm text-gray-600"><span className="font-semibold">Gender:</span> {student.user.gender}</p>
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Bus Service Details</h2>
                <p className="text-md text-gray-600 mt-1"><span className="font-semibold">Bus Point:</span> {busData[busRoute].name}</p>
                <p className="text-md text-gray-600"><span className="font-semibold">From Location:</span> {busData[busRoute].route.from_location}</p>
                <p className="text-md text-gray-600"><span className="font-semibold">Route Number:</span> {busData[busRoute].route.route_no}</p>
                <p className="text-md text-gray-600"><span className="font-semibold">To Location:</span> {busData[busRoute].route.to_location}</p>
                <p className="text-md text-gray-600"><span className="font-semibold">Bus Number:</span> {busData[busRoute].route.bus.bus_no}</p>
                <p className="text-md text-gray-600"><span className="font-semibold">Capacity:</span> {busData[busRoute].route.bus.capacity}</p>
                <p className="text-md text-gray-600"><span className="font-semibold">Monthly Charge:</span> {busData[busRoute].fee}</p>
                <div className='flex'>
                  {edit ? (
                    <form onSubmit={anualIncomeHandler}>

                      <input name="annualcharge" defaultValue={10 * busData[busRoute].fee} />

                      <Button type='submit' onClick={() => TotalFeeConfirm(true)} >Save</Button>
                    </form>

                  ) :
                    <>
                      <p className="text-lg text-gray-600"><span className="font-semibold">Yearly Charge:</span> {10 * busData[busRoute].fee}</p>
                      <Button onClick={editerHandler}>Edit</Button>
                      <Button onClick={() => setTotalFeeConfirm(true)}>Confirm</Button>
                    </>
                  }
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  onClick={TotalFeeConfirm ? () => finalSaveHandler(busData[busRoute].id, busData[busRoute].route.route_no) : () => { }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Card>
        }



      </div>
    </div>
  );
};

export default AddBusService;
