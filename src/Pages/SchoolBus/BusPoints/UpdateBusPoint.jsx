import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { fetchSchoolBusPoints } from "../../../Redux/Actions/Action";
import { selectBusRoutes } from "../../../Redux/Slices/FetchBusRouteSlice";

const UpdateBusPoint = ({ isOpen, handleClose, busPointId }) => {

  const routeNumbers = useSelector(selectBusRoutes);
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    route: '',
    name: '',
    fee: '',  
  });
  console.log(formData, 'ppppppppppp');


  const fetchBusPointDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/bus/buspoint/${busPointId}/`,

      );
      const data = response.data;
      console.log(data, '555555');
      setFormData({
        route: data.route,
        name: data.name,  
        fee: data.fee,
      });
    } catch (error) {
      console.error("Error fetching route details:", error);
    }
  };

  useEffect(() => {
    if (busPointId) {
      fetchBusPointDetails();
    }
    // dispatch(fetchSchoolBusPoints()); 
  }, [busPointId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_URL_SERVER}/bus/buspoint/${busPointId}/`,
        {
          route: formData.route,
          name: formData.name,
          fee: formData.fee,
        },
      );
      handleClose();
      dispatch(fetchSchoolBusPoints())
    } catch (error) {
      console.error("Error updating route:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_SERVER}/bus/buspoint/${busPointId}/`);
      handleClose();
      dispatch(fetchSchoolBusPoints());
    } catch (error) {
      console.error("Error deleting bus point:", error);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="route_no" className="mb-2 text-sm font-bold text-gray-900">
                  Route No
                </label>
                <select
                  id="route"
                  name="route_no"
                  value={formData.route}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="">Select Route No</option>
                  {routeNumbers.map((route, index) => (
                    <option key={index} value={route.route_no}>
                      {route.route_no}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col mb-2">
                <label htmlFor="fee" className="mb-2 text-sm font-bold text-gray-900">
                  From
                </label>
                <input
                  type="text"
                  id="fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="From"
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3">
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

export default UpdateBusPoint;
