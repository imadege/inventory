import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MaterialsPage from './pages/MaterialsPage';
import PreferencesPage from './pages/PreferencePage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<MaterialsPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
      </Layout>
      
    </Router>
  );
};

export default App;
