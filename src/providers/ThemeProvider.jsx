import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const ThemeProvider = ({ children }) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return children;
};
export default ThemeProvider;
