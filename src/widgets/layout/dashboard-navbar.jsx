import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useMaterialTailwindController, setOpenSidenav } from '@/context';

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split('/').filter((el) => el !== '');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Update user state based on token presence or changes
  const load = () => {
    if (!token) {
      setUserName(''); // Clear the user name if no token exists
      setUserRole(''); // Clear the role if no token exists
      return; // Exit if there is no token
    }

    try {
      // Decode the JWT token
      const decodedPayload = jwtDecode(token);

      // Access the claims
      const decodedName = decodedPayload.name; // User's name
      const userRole = decodedPayload.sub; // User's role

      setUserName(decodedName);
      setUserRole(userRole);
    } catch (error) {
      console.error('Failed to decode the token:', error);
      handleLogout(); // Log out the user if decoding fails
    }
  };

  useEffect(() => {
    load();
  }, [token]);

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
        {/* Breadcrumb and Page Info */}
        <div className="capitalize">
          <Typography variant="h4" color="blue-gray">
          {"株式会社     松 尾 電 設"}
          </Typography>
          {page=="createquotation"?(<Typography variant="h6" color="blue-gray">
            見積書作成
          </Typography>):page=="editquotation"?(<Typography variant="h6" color="blue-gray">
            明細書修正
          </Typography>):page=="calculate"?(<Typography variant="h6" color="blue-gray">
            明細集計処理
          </Typography>):page=="print"?(<Typography variant="h6" color="blue-gray">
            見積書発行
          </Typography>):page=="maininfo"?(<Typography variant="h6" color="blue-gray">
            基本情報
          </Typography>):page=="material"?(<Typography variant="h6" color="blue-gray">
            部材情報
          </Typography>):page=="others"?(<Typography variant="h6" color="blue-gray">
            その他の情報
          </Typography>):page=="user"?(<></>):(<></>)}
          
        </div>

        {/* User Info */}
        <div className="flex items-center">
          {userName ? (
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                </IconButton>
              </MenuHandler>
              <MenuList className="w-max border-0">
                <MenuItem className="flex items-center gap-3">
                  <IconButton variant="text" color="blue-gray">
                    <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
                  </IconButton>
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
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
