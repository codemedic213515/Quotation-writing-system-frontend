import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans JP", sans-serif',
    allVariants: {
      fontFamily: '"Noto Sans JP", sans-serif', // ✅ Apply globally
    },
  },
});

export default theme;
