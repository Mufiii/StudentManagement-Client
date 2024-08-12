import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBusData } from '../../../Redux/Slices/fetchBusDataSlice'
import { fetchSchoolBus } from '../../../Redux/Actions/Action'
import { Button, Card, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import CreateSchoolBus from './CreateSchoolBus'

const SchoolBus = () => {

  const dispatch = useDispatch()
  const schoolbus = useSelector(selectBusData)
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };



  useEffect(() => {
    dispatch(fetchSchoolBus())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  return (
    <div className='h-[555px] overflow-y-auto hide-scrollbar'>
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sticky top-0 z-10">
  <Typography variant="h2" color="blue-gray" className="text-xl md:text-2xl lg:text-3xl">
    School Bus List
  </Typography>
  <Button
    onClick={handleOpenModal}
    className="mt-2 md:mt-0 bg-[#8581B8] text-white font-bold py-2 px-4 rounded-md"
  >
    Add New Bus
  </Button>
</div>

      <div>
      <div className='flex flex-wrap gap-4'>
        {schoolbus && schoolbus.length > 0 ? (
          schoolbus.map((bus, index) => (
            <div key={index} className='mb-2'>
              <Link to={`/schoolbus/${bus.id}`}>
                <Card className='w-44 h-44 flex items-center justify-center'>
                  <div className='flex'>
                    <Typography className='text-sm font-bold'>Bus No: {bus.bus_no}</Typography>
                  </div>
                </Card>
              </Link>
            </div>
          ))
        ) : (
          <Typography>No buses available</Typography>
        )}
      </div>
    </div>
    <CreateSchoolBus isOpen={isModalOpen} handleClose={handleCloseModal}/>
    </div>
  )
}

export default SchoolBus