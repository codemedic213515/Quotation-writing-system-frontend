import {
  FolderPlusIcon,
  PencilSquareIcon,
  CalculatorIcon,
  PrinterIcon,
  ServerStackIcon,
  PuzzlePieceIcon,
  AtSymbolIcon,
} from '@heroicons/react/24/solid';
import {
  CreateQuotation,
  EditQuotation,
  Calculation,
  Print,
} from '@/pages/main';
import { MainInfo, Material, Others } from '@/pages/master';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
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
  {
    title: 'マスターデータ',
    layout: 'master',
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: '基本情報',
        path: '/maininfo',
        element: <MainInfo />,
      },
      {
        icon: <PuzzlePieceIcon {...icon} />,
        name: '部材情報',
        path: '/material',
        element: <Material />,
      },
      {
        icon: <AtSymbolIcon {...icon} />,
        name: 'その他の情報',
        path: '/others',
        element: <Others />,
      },
    ],
  },
];

export default routes;
