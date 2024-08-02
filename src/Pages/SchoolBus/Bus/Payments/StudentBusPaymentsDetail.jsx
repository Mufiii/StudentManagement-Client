import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import NewPayment from "./NewPayment";
import { selectStudentTransactions } from "../../../../Redux/Slices/fetchStudentTransactionSlice";
import { fetchStudentTransactions } from "../../../../Redux/Actions/Action";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



const StudentBusPaymentsDetail = () => {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const transactionData = useSelector(selectStudentTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (transactionId) => {
    // Handle edit logic here
    console.log('Edit transaction with ID:', transactionId);
  };

  const handleDelete = (transactionId) => {
    // Handle delete logic here
    console.log('Delete transaction with ID:', transactionId);
  };

  useEffect(() => {
    if (user_id) {
      console.log("Fetching transactions for user_id:", user_id);
      dispatch(fetchStudentTransactions(user_id))
        .then((result) => console.log('Fetch success:', result))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [dispatch, user_id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between mb-5">
        <Typography variant="h2" color="blue-gray">
          Payment
        </Typography>
        <Button onClick={handleOpenModal} className="bg-green-500 hover:bg-green-600 text-white font-normal">
          Create New Payment
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 flex-grow">
        <div className="col-span-9 flex flex-col">
          {/* Main Card */}
          {transactionData && (
            <Card className="bg-white shadow-lg rounded-lg mb-4 p-8">
              <Typography className="text-3xl font-bold text-black-900 mb-5">
                Total Amount: {transactionData.bus_service.annual_fees}
              </Typography>
              <div className="flex justify-between">
                <Typography className="text-3xl font-semibold text-gray-700 mb-1">
                  <span style={{ color: "green" }}>Paid: {transactionData.paid_amount}</span>
                </Typography>
                <Typography className="text-3xl font-semibold text-gray-700 mb-1">
                  <span style={{ color: "red" }}>Balance: {transactionData.balance_amount}</span>
                </Typography>
              </div>
            </Card>
          )}

          {/* Transactions List */}
          <div className='mt-2'>
            <Typography variant="h4" className='mb-2'>Transaction Details:</Typography>
            {transactionData && transactionData.transactions && transactionData.transactions.length > 0 ? (
              <div>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b border-gray-200">Sl.No</th>
                      <th className="px-4 py-2 border-b border-gray-200">Amount</th>
                      <th className="px-4 py-2 border-b border-gray-200">Paid Amount</th>
                      <th className="px-4 py-2 border-b border-gray-200">Balance Amount</th>
                      <th className="px-4 py-2 border-b border-gray-200">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.transactions.map((transaction, index) => (
                      <tr key={index} >
                        <td className="px-4 py-2 border-b border-gray-200 flex justify-center">{index + 1}</td>
                        <td className="px-4 py-2 border-b border-gray-200 ">{transaction.amount}</td>
                        <td className="px-4 py-2 border-b border-gray-200 ">{transaction.paid_amount}</td>
                        <td className="px-4 py-2 border-b border-gray-200 ">{transaction.balance_amount}</td>
                        <td className="px-4 py-2 border-b border-gray-200 ">{new Date(transaction.created_at).toLocaleDateString('en-GB')}</td>
                        <td className="px-4 py-2 border-b border-gray-200  flex space-x-2">
                          <FaRegEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(transaction)} />
                          <MdDelete className="text-red-500 cursor-pointer" onClick={() => handleDelete(transaction.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Typography>No transactions available</Typography>
            )}
          </div>
        </div>

        {/* Vertical Card */}
        <Card className="col-span-3 p-4 bg-gray-100 shadow-lg rounded-lg self-stretch">
          <Typography className="text-2xl font-bold text-gray-800 mb-2 mt-2">
            Bus Information
          </Typography>
          {/* Route Information Goes Here */}
        </Card>
      </div>
      <NewPayment isOpen={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

export default StudentBusPaymentsDetail;
