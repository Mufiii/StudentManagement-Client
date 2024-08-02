import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStudentTransactions } from "../../../../Redux/Actions/Action";
import { useParams } from "react-router-dom";

const NewPayment = ({ isOpen, handleClose }) => {

  const dispatch = useDispatch(); 
  const { user_id } = useParams();

  const [formData, setFormData] = useState({
    amount: "",
    created_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = JSON.parse(localStorage.getItem("authToken"));
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/teacher/payment/`,
        {
          amount: formData.amount,
          created_at: formData.created_at,
          student:user_id
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      );
      console.log("New Payment created successfully:", response.data);
      handleClose();
      dispatch(fetchStudentTransactions()); // Fetch updated transactions after successful payment
    } catch (error) {
      console.error("Error creating new payment:", error);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} handler={handleClose}>
        <DialogHeader>Add New Payment</DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="amount" className="mb-2 text-sm font-bold text-gray-900">
                Amount
              </label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Amount"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="created_at" className="mb-2 text-sm font-bold text-gray-900">
                Date
              </label>
              <input
                type="date"
                name="created_at" // Corrected the name attribute
                value={formData.created_at}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Date"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg py-2.5 px-5 hover:bg-blue-600"
            >
              Add Payment
            </button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default NewPayment;
