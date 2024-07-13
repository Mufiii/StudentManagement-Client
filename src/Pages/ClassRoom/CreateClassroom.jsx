import { Button, Typography } from "@material-tailwind/react";
import axios from "axios"
import { useRef } from "react";



const CreateClassroom = () => {

  const authToken = JSON.parse(localStorage.getItem('authtoken'));
  console.log(authToken, '5555');
  const inputRef = useRef();

  const NewClassroom = async (e) => {

    e.preventDefault()
    try {
      const response = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_URL_SERVER}/admins/classroom/`,
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
          'Content-Type': 'application/json',
        },
      });
      const data = response.data
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }

  return (
    <div>
      
      <form action="" ref={inputRef} onSubmit={NewClassroom}>
        <div>
          <div>
            <Typography>
              Classroom Name
            </Typography>
            <input
              type="text"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address" required
            />
          </div>
          <div>

            <Typography>
              capacity
            </Typography>
            <input
              type="text"
              name="capacity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email Address" required
            />
          </div>
          <Button>
              Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateClassroom