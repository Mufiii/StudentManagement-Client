import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const navigate = useNavigate()
  const [forms, setForms] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForms({
      ...forms,
      [name]: value,
    });
  };

  const AdminLoginView = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}admins/login/`, forms);
      const data = response.data;

      if (data.role === 'admin') {
        localStorage.setItem('authToken', JSON.stringify(data.token));
        toast.success("Login Successful");
        navigate('/');
      } else {
        toast.error("You are not authorized to log in as admin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    }
  };

  
  return (
    <div className="flex justify-center items-center h-screen bg-teal-50">

      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={AdminLoginView}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Username"
              size="lg"
              name="username"
              value={forms.username}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              name="password"
              value={forms.password}
              onChange={handleInputChange}
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;