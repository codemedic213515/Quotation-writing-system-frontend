import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth, Main } from '@/layouts';

function App() {
  return (
    <Routes>
      <Route path="/main/*" element={<Main />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="*"
        element={<Navigate to="/main/createquotation" replace />}
      />
    </Routes>
  );
}

export default App;
