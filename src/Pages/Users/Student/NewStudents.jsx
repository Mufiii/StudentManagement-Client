import React, { useState } from 'react';
import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const NewStudents = ({ isOpen, handleClose }) => {
  const [formData, setFormData] = useState({
    classroom_id: '',
    admission_no: '',
    guardian_name: '',
    pincode: '',
    house_name: '',
    post_office: '',
    place: '',
    user_name: '',
    user_phone: '',
    user_gender: '',
    user_dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      admission_no: formData.admission_no,
      guardian_name: formData.guardian_name,
      pincode: formData.pincode,
      house_name: formData.house_name,
      post_office: formData.post_office,
      place: formData.place,
      user: {
        name: formData.user_name,
        phone: formData.user_phone,
        gender: formData.user_gender,
        date_of_birth: formData.user_dob,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}admins/student/`,
        submissionData,
        { params: { classroom_id: formData.classroom_id } }
      );
      console.log(response.data);
      toast.success('Student added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add student');
    }
  };

  return (
    <Dialog open={isOpen} size="lg" handler={handleClose}>
      <Card className="p-6 rounded-lg shadow-lg">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Add New Student
        </Typography>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="admission_no" className="block text-sm font-medium text-gray-700">
                Admission Number
              </label>
              <input
                type="text"
                id="admission_no"
                name="admission_no"
                value={formData.admission_no}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Admission Number"
                required
              />
            </div>
            <div>
              <label htmlFor="guardian_name" className="block text-sm font-medium text-gray-700">
                Guardian Name
              </label>
              <input
                type="text"
                id="guardian_name"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Guardian Name"
                required
              />
            </div>
            {/* Add similar blocks for the other fields */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Phone"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="text"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Phone"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Pin Code
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">
                House Name
              </label>
              <input
                type="text"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Phone"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Post Office
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">
                Place
              </label>
              <input
                type="text"
                id="user_phone"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Phone"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              color="gray"
              className="px-6 py-2 rounded-full"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              color="blue"
              className="px-6 py-2 rounded-full"
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default NewStudents;
