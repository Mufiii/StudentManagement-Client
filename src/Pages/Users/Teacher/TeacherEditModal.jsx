import React, { useRef } from 'react';
import { Button, Card, Dialog, Typography, Input } from '@material-tailwind/react';
import { FaPlus } from 'react-icons/fa'; 

const TeacherEditModal = ({ open, onClose }) => {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <Dialog open={open} onClose={onClose}  className="flex items-center justify-center p-4">
      <Card className="w-full p-6  rounded-lg ">
        <Typography variant="h5" className="text-center font-semibold mb-4">
          Edit Teacher
        </Typography>
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src=''
              className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
              alt="Teacher"
            />
            <button
              type="button"
              onClick={handleFileInputClick}
              className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full flex items-center justify-center"
            >
              <FaPlus size={20} />
            </button>
          </div>
          <input
            type="file" 
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div className="mb-4">
          <Input label="Name" placeholder="Enter name" />
        </div>
        <div className="mb-4">
          <Input label="Email" type="email" placeholder="email@example.com" />
        </div>
        <div className="mb-4">
          <Input  type='number' label="Phone" placeholder="123-456-7890" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg py-2 px-4">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <Button className='bg-[#a47cc4]'>Save</Button>
          <Button color="gray" onClick={onClose}>Cancel</Button>
        </div>
      </Card>
    </Dialog>
  );
}

export default TeacherEditModal;
