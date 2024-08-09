import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBusData } from "../../../Redux/Slices/fetchBusDataSlice";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { fetchSchoolBusRoutes } from "../../../Redux/Actions/Action";

const RouteGetUpdateComp = ({ isOpen, handleClose, routeId }) => {
  
  const busNumbers = useSelector(selectBusData);
  console.log(busNumbers,'666666666');
  const [formData, setFormData] = useState({
    route_no: "",
    bus: "",
    from_location: "",
    to_location: "",
  });
  console.log(formData,'ppppppppppp');

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const fetchRouteDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/bus/routes/${routeId}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      );
      const data = response.data;
      console.log(data,'555555');
      setFormData({
        route_no: data.route_no,
        bus: data.bus,
        from_location: data.from_location,
        to_location: data.to_location,
      });
      console.log(data,'99999');
    } catch (error) {
      console.error("Error fetching route details:", error);
    }
  };

  useEffect(() => {
    if (routeId) {
      fetchRouteDetails();
    }
  }, [routeId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_URL_SERVER}/bus/routes/${routeId}/`,
        {
          route_no: formData.route_no,
          bus: formData.bus,
          from_location: formData.from_location,
          to_location: formData.to_location,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();
      dispatch(fetchSchoolBusRoutes())
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog open={isOpen} handler={handleClose}>
        <DialogHeader>Edit Route</DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleUpdate}>
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="route_no"
                  value={formData.route_no}
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
                  {busNumbers && busNumbers.map((bus, index) => (
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
            <DialogFooter className="flex justify-between gap-3">
              <Button style={{ backgroundColor: "#E4E5E7" }} className="rounded-full text-white" onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#8581B8" }} className="rounded-full text-white" type="submit" onClick={handleUpdate}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default RouteGetUpdateComp;
