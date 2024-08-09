import React from 'react';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Button } from '@material-tailwind/react';

const ConfirmationModal = ({ isOpen, handleConfirm, handleCancel, message }) => {
  
  return (
    <Dialog open={isOpen} handler={handleCancel}>
      <DialogHeader>Confirmation</DialogHeader>
      <DialogBody>
        <p>{message}</p>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="gradient" color="blue" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmationModal;
