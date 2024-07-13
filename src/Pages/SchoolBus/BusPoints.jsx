import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBusData } from '../../Redux/Slices/fetchBusDataSlice'
import { fetchSchoolBus, fetchSchoolBusPoints } from '../../Redux/Actions/Action'
import { Button, Card, Typography } from '@material-tailwind/react'
import { selectBusPoints } from '../../Redux/Slices/fetchBuspointsSlice'

const BusPoints = () => {

  const dispatch = useDispatch()
  const buspoints = useSelector(selectBusPoints)
  console.log(buspoints);


  useEffect(() => {
    dispatch(fetchSchoolBusPoints())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Typography variant="h4" color="blue-gray">
          School Bus Points
        </Typography>
        <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold">
          Add New Bus Point
        </Button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {buspoints && buspoints.length > 0 ? (
          buspoints.map((bus, index) => (
            <div key={index} className='mb-2'>
              <Card className='w-44 h-44 flex items-center justify-center'>
                <div className='flex'>
                  <Typography className='text-sm font-bold'>Bus Point: {bus.name}</Typography>
                  <Typography className='text-sm font-bold'>Fees: {bus.fee}</Typography>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <Typography>No buspoints available</Typography>
        )}
      </div>
    </div>
  )
}

export default BusPoints