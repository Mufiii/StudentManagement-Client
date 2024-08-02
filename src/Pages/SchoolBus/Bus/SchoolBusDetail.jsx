import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBusDetail } from "../../../Redux/Slices/FetchBusDetailSlice";
import { fetchSchoolBusData } from "../../../Redux/Actions/Action";
import { useEffect } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { BiSolidReport } from "react-icons/bi";



const SchoolBusDetail = () => {
  const { schoolBusId } = useParams();
  const dispatch = useDispatch();
  const schoolBusData = useSelector(selectBusDetail);

  useEffect(() => {
    if (schoolBusId) {
      dispatch(fetchSchoolBusData(schoolBusId));
    }
  }, [dispatch, schoolBusId]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between mb-5">
        <div>
          <Typography variant="h2" color="blue-gray">
            School Bus Detail
          </Typography>
        </div>
        <div className="flex">
          <Button className="flex items-center space-x-2">
            <Typography className="font-bold">
              Report
            </Typography>
            <BiSolidReport className="text-lg" />
          </Button>
        </div>

      </div>
      <div className="grid grid-cols-12 gap-4 flex-grow">
        <div className="col-span-9 flex flex-col">
          {/* Main Card */}
          {schoolBusData && (
            <Card className="p-4 bg-white shadow-lg rounded-lg mb-4">
              <Typography className="text-3xl font-bold text-black-900 mb-2">
                Bus No: {schoolBusData.bus_no}
              </Typography>
              <Typography className="text-lg font-semibold text-gray-700 mb-1">
                <span className="text-black-500">Vehicle Number:</span> {schoolBusData.plate_number}
              </Typography>
              <Typography className="text-lg font-semibold text-gray-700 mb-1">
                <span className="text-black-500">Driver Name:</span> {schoolBusData.driver_name}
              </Typography>
              <Typography className="text-lg font-semibold text-gray-700 mb-1">
                <span className="text-black-500">Capacity:</span> {schoolBusData.capacity}
              </Typography>
            </Card>
          )}

          {/* Tabs directly below the main card */}
          <div className='mt-2'>
            <Typography variant="h3" className='text-lg mb-2'>Routes:</Typography>
            {schoolBusData && schoolBusData.routes && schoolBusData.routes.length > 0 ? (
              <Tabs value={schoolBusData.routes[0].route_no.toString()}>
                <TabsHeader>
                  {schoolBusData.routes.map((route, routeIndex) => (
                    <Tab key={routeIndex} value={route.route_no.toString()}>
                      Route No: {route.route_no}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {schoolBusData.routes.map((route, routeIndex) => (
                    <TabPanel key={routeIndex} value={route.route_no.toString()}>
                      <Typography variant="h4" className=' mb-2'>Students:</Typography>
                      {route.students && route.students.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 border-b border-gray-200">S.No</th>
                              <th className="px-4 py-2 border-b border-gray-200">Name</th>
                              <th className="px-4 py-2 border-b border-gray-200">Admission No</th>
                              <th className="px-4 py-2 border-b border-gray-200">Class</th>
                              <th className="px-4 py-2 border-b border-gray-200">Gender</th>
                            </tr>
                          </thead>
                          <tbody>
                            {route.students.map((student, studentIndex) => (
                              <tr key={studentIndex}>
                                <td className="px-4 py-2 border-b border-gray-200">{studentIndex + 1}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{student.user.name}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{student.admission_no}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{student.classRoom.name}{student.classRoom.division}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{student.user.gender}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <Typography className='text-sm'>No students available</Typography>
                      )}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            ) : (
              <Typography>No bus routes available</Typography>
            )}
          </div>
        </div>

        {/* Vertical Card */}
        <Card className="col-span-3 p-4 bg-gray-100 shadow-lg rounded-lg self-stretch">
          <Typography className="text-3xl font-bold text-gray-800 mb-4">
            Route Information
          </Typography>
          {schoolBusData && schoolBusData.routes && schoolBusData.routes.length > 0 ? (
            schoolBusData.routes.map((route, index) => (
              <div key={index} className="mb-4">
                <Typography className="text-lg font-semibold text-gray-700">
                  <span className="text-blue-500">Route No: {route.route_no}</span>
                </Typography>
                <Typography className="text-md font-semibold text-gray-700">
                  <span className="text-blue-500">From:</span> {route.from_location}
                </Typography>
                <Typography className="text-md font-semibold text-gray-700">
                  <span className="text-blue-500">To:</span> {route.to_location}
                </Typography>
              </div>
            ))
          ) : (
            <Typography className="text-sm text-gray-600">No routes available</Typography>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SchoolBusDetail;
