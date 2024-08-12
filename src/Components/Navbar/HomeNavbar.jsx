import React from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";






const HomeNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  // const isLoggedIn = !!localStorage.getItem('authToken');

  const handleLoginClick = () => {
    console.log("Login button clicked");
    console.log("Navigating to /login");
    navigate("/login");
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
   
    <div className="max-h-[768px] w-100  ">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography style={{ fontSize: "1.3em" }} as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-extrabold ">
            KKMHS
          </Typography>
          <div className="flex items-center gap-4 ">
            <div className="flex ">
              <input
                type="text"
                placeholder="Search"
                className="bg-white text-gray-900 border border-gray-300 rounded-lg py-2 px-4 block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-x-1">
              <p>
                <UserCircleIcon className="h-7 w-7" />
              </p>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        {/* <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="" onClick={handleLoginClick}>
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="" onClick={handleLoginClick}>
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav> */}
      </Navbar>
    </div>
  );
};

export default HomeNavbar;
