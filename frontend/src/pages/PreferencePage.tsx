import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreferencesList from '../components/PreferenceList';
import { Preference } from '../types';

const PreferencesPage: React.FC = () => {
  const [preferences, setPreferences] = useState<Preference[]>([]);

  useEffect(() => {
    // Fetch preferences
    axios
      .get('/api/preferences')
      .then((response) => setPreferences(response.data))
      .catch((error) => console.error('Error fetching preferences:', error));
  }, []);

  const handleEdit = (preference: Preference) => {
    console.log('Edit preference:', preference);
    // Logic for editing a preference (e.g., open a dialog)
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`/api/preferences/${id}`)
      .then(() => {
        // Remove the deleted preference from the state
        setPreferences((prev) => prev.filter((preference) => preference.id !== id));
      })
      .catch((error) => console.error('Error deleting preference:', error));
  };

  return (
    <div>
      <h2>Preferences</h2>
      <PreferencesList preferences={preferences} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default PreferencesPage;
