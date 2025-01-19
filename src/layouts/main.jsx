import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Sidenav, DashboardNavbar, Footer } from '@/widgets/layout';
import routes from '@/routes';
import { useMaterialTailwindController } from '@/context';

// Mock function to check if the user is authenticated
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      // Call your backend API to validate the token
      fetch(`/api/auth/validateToken?token=${token}`)
        .then((response) => {
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch(() => setIsAuthenticated(false))
        .finally(() => setLoading(false));
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading };
};

export function Main() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={sidenavType === 'dark' ? '/img/logo.webp' : '/img/logo.webp'}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />

        {/* Protected Routes */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === 'main' &&
              pages.map(({ path, element }) => (
                <Route
                  key={path}
                  exact
                  path={path}
                  element={
                    isAuthenticated ? (
                      element
                    ) : (
                      <Navigate to="/auth/sign-in" replace />
                    )
                  }
                />
              )),
          )}
        </Routes>

        {/* Footer */}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Main.displayName = '/src/layout/main.jsx';

export default Main;
