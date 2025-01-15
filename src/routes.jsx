import {
  FolderPlusIcon,
  PencilSquareIcon,
  CalculatorIcon,
  PrinterIcon,
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import {CreateQuotation} from "@/pages/createQuotation"
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {title: "基本作業",
    layout: "dashboard",
    pages: [
      {
        icon:<FolderPlusIcon {...icon}/>,
        name: "明細書作成",
        path: "/createquotation",
        element: <CreateQuotation />,
      },
      {
        icon:<PencilSquareIcon {...icon}/>,
        name: "明細書修正",
        path: "/home",
        element: <Home />,
      },
      {
        icon:<CalculatorIcon {...icon}/>,
        name: "明細集計処理",
        path: "/home",
        element: <Home />,
      },
      {
        icon:<PrinterIcon {...icon}/>,
        name: "見積書発行",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
