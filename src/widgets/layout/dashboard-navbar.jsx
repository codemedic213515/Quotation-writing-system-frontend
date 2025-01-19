import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid';
import { useMaterialTailwindController, setOpenSidenav } from '@/context';

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split('/').filter((el) => el !== '');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const base64UrlToBase64 = (base64Url) => {
    return base64Url
      .replace(/-/g, '+') // Replace '-' with '+'
      .replace(/_/g, '/'); // Replace '_' with '/'
  };

  const token = localStorage.getItem('token');

  // Update user state based on token presence or changes
  const load = () => {
    if (!token) {
      setUserName(''); // Clear the user name if no token exists
      setUserRole(''); // Clear the role if no token exists
      return; // Exit if there is no token
    }

    try {
      // Get the payload part of the JWT token (second part)
      const payload = token.split('.')[1];
      // Convert Base64 URL to Base64
      const base64 = base64UrlToBase64(payload);

      // Decode the payload using atob()
      const decodedPayload = JSON.parse(atob(base64)); // Decode Base64 and parse JSON

      // Decode the name if it's URL encoded (handles Japanese or other special characters)
      const decodedName = decodeURIComponent(decodedPayload.name);

      // Now you can access the payload values
      setUserName(decodedName);
      setUserRole(decodedPayload.sub); // This will store the role

      console.log('User Name:', decodedName);
      console.log('User Role:', decodedPayload.sub);
      console.log('Expiration Time:', new Date(decodedPayload.exp * 1000)); // Expiration time
    } catch (error) {
      console.error('Failed to decode the token:', error);
      handleLogout();
    }
  };
  useEffect(() => {
    load();
  });
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/auth/sign-in'); // Redirect to sign-in page
  };

  return (
    <Navbar
      color={fixedNavbar ? 'white' : 'transparent'}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? 'sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5'
          : 'px-0 py-1'
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? 'mt-1' : ''
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          {/* User Info or Sign In */}
          {userName ? (
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0">
                <MenuItem className="flex items-center gap-3">
                  <Avatar
                    src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                    alt="user-avatar"
                    size="sm"
                    variant="circular"
                  />
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-normal"
                    >
                      {userName}
                    </Typography>
                  </div>
                </MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>
                  <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Edit Profile
                  </Typography>
                </MenuItem>
                {userRole === 'admin' && (
                  <MenuItem onClick={() => navigate('/admin/users')}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      User Management
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Log Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/auth/sign-in">
              <Button
                variant="text"
                color="blue-gray"
                className="hidden items-center gap-1 px-4 xl:flex normal-case"
              >
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                Sign In
              </Button>
            </Link>
          )}

          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = '/src/widgets/layout/dashboard-navbar.jsx';

export default DashboardNavbar;
