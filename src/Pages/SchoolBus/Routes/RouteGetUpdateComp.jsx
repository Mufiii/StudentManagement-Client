import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectBusData } from "../../../Redux/Slices/fetchBusDataSlice";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";

const RouteGetUpdateComp = ({ isOpen, handleClose }) => {

  const { route_id } = useParams()
  const busNumbers = useSelector(selectBusData); 
  const inputRef = useRef()
  const [routes,setRoutes] = useState([])
  const [formData, setFormData] = useState({
    route_no: '',
    bus_no: '',
    from_location: '',
    to_location: '',
  });

  console.log(routes);

  const authToken = JSON.parse(localStorage.getItem('authToken'));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      const response = await axios({
        method: e ? 'PUT' : 'GET',
        url: `${import.meta.env.VITE_URL_SERVER}/bus/routes/${route_id}/`,
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
          'Content-Type': 'application/json',
        },
        data: e
          ? {
              route: formData.route_no,
              bus: formData.bus_no,
              from_location: formData.from_location,
              to_location: formData.to_location,
            }
          : null,
      });

      const data = response.data;
      if (!e && response.status === 200) {
        setRoutes(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  useEffect(() => {
      if (route_id) {
        handleSubmit()
    }
  }, [route_id])


  return (
    <div>
      <Dialog open={isOpen} handler={handleClose}>
            <DialogHeader>Edit Route</DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="route_no"
                  value={formData.value}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Route No"
                  required
                />
              </div>
              <div className="flex flex-col">
                <select
                  name="bus_no"
                  value={formData.bus_no}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select Bus No</option>
                  {busNumbers.map((bus, index) => (
                    <option key={index} value={bus.bus_no}>
                      {bus.bus_no}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="from_location"
                  value={formData.from_location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="From"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="to_location"
                  value={formData.to_location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="To"
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3">
              <Button style={{ backgroundColor: "#E4E5E7" }} className="rounded-full text-white" onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#8581B8" }} className="rounded-full text-white" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  )
}

export default RouteGetUpdateComp