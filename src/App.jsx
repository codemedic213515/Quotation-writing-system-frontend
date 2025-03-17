import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth, Main, Master, Dashboard } from '@/layouts';
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/main/*" element={<Main />} />

      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="*"
        element={<Navigate to="/main/createquotation" replace />}
      />
      <Route path="/master/*" element={<Master />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
