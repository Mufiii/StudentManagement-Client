import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBusData } from '../../Redux/Slices/fetchBusDataSlice'
import { fetchSchoolBus } from '../../Redux/Actions/Action'
import { Button, Card, Typography } from '@material-tailwind/react'

const SchoolBus = () => {

  const dispatch = useDispatch()
  const schoolbus = useSelector(selectBusData)


  useEffect(() => {
    dispatch(fetchSchoolBus())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Typography variant="h4" color="blue-gray">
          School Bus List
        </Typography>
        <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold">
          Add New Bus
        </Button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {schoolbus && schoolbus.length > 0 ? (
          schoolbus.map((bus, index) => (
            <div key={index} className='mb-2'>
              <Card className='w-44 h-44 flex items-center justify-center'>
                <div className='flex'>
                  <Typography className='text-sm font-bold'>Bus No: {bus.bus_no}</Typography>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <Typography>No buses available</Typography>
        )}
      </div>
    </div>
  )
}

export default SchoolBus