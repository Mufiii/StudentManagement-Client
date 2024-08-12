import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { BiSolidBusSchool } from "react-icons/bi";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { SiGoogleclassroom } from "react-icons/si";
import { useNavigate } from "react-router-dom";




const Sidebar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Card className=" w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sticky top-0 ">
      {/* <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div> */}
      <List>
        <ListItem onClick={(() => navigate('/'))}>  
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
            Dashboard
        </ListItem>
        <ListItem onClick={(() => navigate('teacher'))}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Teachers
        </ListItem>
        <ListItem onClick={(() => navigate('classroom'))}>
          <ListItemPrefix>
            <SiGoogleclassroom className="h-5 w-5" />
          </ListItemPrefix>
          ClassRoom
        </ListItem>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1} onClick={(() => navigate('schoolbus'))}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BiSolidBusSchool className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                School Bus
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={(() => navigate('addservice'))}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Add Bus Service
              </ListItem>
              <ListItem onClick={(() => navigate('route'))}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Route
              </ListItem>
              <ListItem onClick={(() => navigate('buspoints'))}>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Bus Point
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default Sidebar;