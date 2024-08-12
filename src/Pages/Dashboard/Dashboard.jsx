import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaBus } from 'react-icons/fa';

const Dashboard = () => {
  const cards = [
    { title: 'Students', count: 50, icon: <FaUserGraduate className="text-3xl text-blue-500" />, para: 'This is students' },
    { title: 'Teachers', count: 10, icon: <FaChalkboardTeacher className="text-3xl text-green-500" size={38} />, para: 'This is teacher' },
    { title: 'Classrooms', count: 20, icon: <FaSchool className="text-3xl text-yellow-500" size={38}  />, para: 'This is classroom' },
    { title: 'Buses', count: 5, icon: <FaBus className="text-3xl text-red-500"  />, para: 'This is bus' },
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between p-4 bg-white shadow-lg rounded-lg "
            style={{ height: '150px', width: '100%' }}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col">
                <h5 className="font-bold text-sm lg:text-base text-gray-800">
                  {card.title}
                </h5>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mt-1">
                  {card.count}
                </h1>
              </div>
              <div className="flex items-center justify-center h-10 w-10">
                {card.icon}
              </div>
            </div>
            <p className="text-xs lg:text-sm text-gray-600 mt-2">{card.para}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
