import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBusDetail } from "../../../Redux/Slices/FetchBusDetailSlice";
import { fetchSchoolBusData } from "../../../Redux/Actions/Action";
import { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

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
    <div>
      <div className='flex justify-between mb-4'>
        <Typography variant="h4" color="blue-gray">
          School Bus Detail
        </Typography>
      </div>
      <div className='flex flex-wrap gap-4'>
        {schoolBusData && (
          <div className='mb-2 w-full'>
            <div className='w-full h-auto flex flex-col items-start justify-start '>
              <Card className="w-full p-4">
                <Typography className='text-sm font-bold mb-2'>Bus No: {schoolBusData.bus_no}</Typography>
                <Typography className='text-sm font-bold mb-2'>Vehicle Number: {schoolBusData.plate_number}</Typography>
                <Typography className='text-sm font-bold mb-2'>Driver Name: {schoolBusData.driver_name}</Typography>
                <Typography className='text-sm font-bold mb-2'>Capacity: {schoolBusData.capacity}</Typography>
              </Card>
              <div className="mt-5">
                <Typography variant="h3" className='text-lg mb-2'>Routes:</Typography>
              </div>
              <div className='flex flex-wrap gap-8'>
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
                          <Typography className='text-lg mb-2 font-bold'>From: {route.from_location}</Typography>
                          <Typography className='text-lg mb-2 font-bold'>To: {route.to_location}</Typography>
                          <Typography variant="h4" className=' mb-2'>Students:</Typography>
                          {route.students && route.students.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-200">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 border-b border-gray-200">Name</th>
                                  <th className="px-4 py-2 border-b border-gray-200">Admission No</th>
                                  <th className="px-4 py-2 border-b border-gray-200">Class</th>
                                </tr>
                              </thead>
                              <tbody>
                                {route.students.map((student, studentIndex) => (
                                  <tr key={studentIndex}>
                                    <td className="px-4 py-2 border-b border-gray-200">{student.user.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-200">{student.admission_no}</td>
                                    <td className="px-4 py-2 border-b border-gray-200">{student.classRoom}</td>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolBusDetail;
