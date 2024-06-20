import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

const TeacherPostView = () => {

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
      const token = localStorage.getItem('authToken'); // Example: Retrieve token from local storage
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/admins/teachers/`,{
          user: {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            date_of_birth: formData.date_of_birth,
          },
          pen_no: formData.pen_no,
        },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Teacher registered successfully:', response.data);
      // Handle success scenario
    } catch (error) {
      console.error('Error registering teacher:', error);
      // Handle error scenario
    }
  };



  return (
    <Card className="w-full p-6 max-w-[54rem]">
      <Typography variant="h4" color="blue-gray">
        Register a Teacher
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Permenent no
            </Typography>
            <Input
              size="lg"
              placeholder="John"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              name="pen_no"
              value={formData.pen_no}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="Doe"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              name="name"
              value={formData.name}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="123456789"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              name="username"
              value={formData.username}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Gender
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Email Address
            </Typography>
            <Input
              size="lg"
              placeholder="123456789"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              name="email"
              value={formData.email}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="flex flex-col">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Phone
            </Typography>
            <Input
              size="lg"
              placeholder="username"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
        </div>
        <Button className="mt-6" fullWidth type="submit">
          Create
        </Button>
      </form>
    </Card>
  );
}

export default TeacherPostView;