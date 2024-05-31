
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import axios from "axios"
import { useState } from "react";

const AdminLogin = () => {
  const [forms, setForms] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

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
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/admins/login/`, forms);
      console.log(response.data);
      console.log("Login Successfull");
    } catch (error) {
      console.error(error);
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
            <div className="-ml-2.5">
              <Checkbox
                label="Remember Me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
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