import {
  Button,
  Dialog,
  Card,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import TeachersListView from "./TeachersListView";
import { useDispatch, useSelector } from "react-redux";
import { selectTeachers } from "../../../Redux/Slices/FetchAllTeacherSlice";
import { fetchAllTeachers } from "../../../Redux/Actions/Action";

const TeacherPostView = ( {isOpen , handleClose} ) => {

  const dispatch = useDispatch()

  const authToken = JSON.parse(localStorage.getItem('authToken'));
  const [formData, setFormData] = useState({
    name: '',
    pen_no: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/admins/teachers/`, {
        user: {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          date_of_birth: formData.date_of_birth,
        },
        pen_no: formData.pen_no,
      }, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      console.log('Teacher registered successfully:', response.data);
      handleClose()
      dispatch(fetchAllTeachers())
    } catch (error) {
      console.error('Error registering teacher:', error);
      // Handle error scenario
    }
  };



  return (
    <>
      <Dialog
        size="md"
        open={isOpen}
        onClose={handleClose} // Close modal when clicked outside or on close button
        className="bg-transparent shadow-none"
      >

        <Card className="p-6 overflow-y-auto">
          <Typography variant="h4" color="blue-gray">
            Add Teacher
          </Typography>
          <form className="mt-2 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="w-full h-36 flex justify-center items-end rounded-t-lg">
                <img
                  src="https://imgs.search.brave.com/g7dKezKWVTxg4bO0zAStpbkT-dim0uK3tjt7i0NWjPI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ueXBv/c3QuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9zaXRlcy8yLzIw/MjQvMDcvcm9uYWxk/by1ldXJvLmpwZz93/PTEwMjQ"
                  // alt={user.user.name}
                  className="w-32 flex items-center h-32 rounded-full border-4 border-white"
                />
              </div>
              <div className="mt-2">
                <Typography color="blue" className="text-center">+ Add Picture</Typography>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-3  gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="pen_no"
                  value={formData.pen_no}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Permenent Number" required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:SHort-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Short Name" required
                />
              </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gender" required
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone" required
                />
              </div>
            </div>
              <div className="flex flex-col mt-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address" required
                />
              </div>
            <div className="flex justify-end gap-3">
              <Button style={{ backgroundColor: "#E4E5E7" }} className="mt-6 rounded-full text-white" onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#8581B8" }} className="mt-6 rounded-full text-white" type="submit">
                Add
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
}

export default TeacherPostView;