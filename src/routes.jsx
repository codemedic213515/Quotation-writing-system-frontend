import {
  FolderPlusIcon,
  PencilSquareIcon,
  CalculatorIcon,
  PrinterIcon,
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
// import { Home, Profile, Notifications } from '@/pages/dashboard';
import {
  CreateQuotation,
  EditQuotation,
  Calculation,
  Print,
} from '@/pages/main';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  // {
  //   title: 'Dashboard',
  //   layout: 'dashboard',
  //   pages: [
  //     {
  //       icon: <HomeIcon {...icon} />,
  //       name: 'dashboard',
  //       path: '/home',
  //       element: <Home />,
  //     },
  //     {
  //       icon: <UserCircleIcon {...icon} />,
  //       name: 'profile',
  //       path: '/profile',
  //       element: <Profile />,
  //     },
  //     {
  //       icon: <InformationCircleIcon {...icon} />,
  //       name: 'notifications',
  //       path: '/notifications',
  //       element: <Notifications />,
  //     },
  //   ],
  // },
  {
    title: '基本作業',
    layout: 'main',
    pages: [
      {
        icon: <FolderPlusIcon {...icon} />,
        name: '明細書作成',
        path: '/createquotation',
        element: <CreateQuotation />,
      },
      {
        icon: <PencilSquareIcon {...icon} />,
        name: '明細書修正',
        path: '/editquotation',
        element: <EditQuotation />,
      },
      {
        icon: <CalculatorIcon {...icon} />,
        name: '明細集計処理',
        path: '/calculate',
        element: <Calculation />,
      },
      {
        icon: <PrinterIcon {...icon} />,
        name: '見積書発行',
        path: '/print',
        element: <Print />,
      },
    ],
  },
];

export default routes;
