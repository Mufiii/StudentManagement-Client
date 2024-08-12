import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaSchool, FaBus } from 'react-icons/fa';

const Dashboard = () => {

  const cards = [
    { title: 'Students', count: 50, icon: <FaUserGraduate className="text-4xl text-blue-500" /> },
    { title: 'Teachers', count: 10, icon: <FaChalkboardTeacher className="text-4xl text-green-500" /> },
    { title: 'Classrooms', count: 20, icon: <FaSchool className="text-4xl text-yellow-500" /> },
    { title: 'Buses', count: 5, icon: <FaBus className="text-4xl text-red-500" /> },
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-6 bg-white shadow-lg rounded-xl cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="absolute top-4 right-4 transform transition-transform hover:rotate-12 hover:scale-110">
              {card.icon}
            </div>
            <div className="flex flex-col items-center pt-12 pb-8">
              <h5 className="font-bold text-lg lg:text-xl text-gray-800 transform transition-colors duration-300 hover:text-blue-500">
                {card.title}
              </h5>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 transform transition-colors duration-300 hover:text-gray-700">
                {card.count}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
