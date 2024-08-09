import { Typography } from '@material-tailwind/react';
import React from 'react'
import { PiStudentFill } from "react-icons/pi";

const Dashboard = () => {

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="flex text-black text-xl font-bold mb-4">
            <div className="bg-blue-gray-100 p-2 rounded-full mr-3">
              <PiStudentFill size={30} className="text-blue-600" />
            </div>
            <Typography variant="h3" className="text-gray-800">
              Students
            </Typography>
          </div>
          <div className="text-gray-500">Details about the teacher go here.</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-black text-xl font-bold mb-4">Teachers</div>
          <div className="text-gray-500">Details about the teacher go here.</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-black text-xl font-bold mb-4">Classrooms</div>
          <div className="text-gray-500">Details about the teacher go here.</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-black text-xl font-bold mb-4">Teacher</div>
          <div className="text-gray-500">Details about the teacher go here.</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard