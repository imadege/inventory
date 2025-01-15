import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { Preference } from '../types';

interface PreferencesListProps {
  preferences: Preference[];
  onEdit: (preference: Preference) => void;
  onDelete: (id: string) => void;
}

const PreferencesList: React.FC<PreferencesListProps> = ({ preferences, onEdit, onDelete }) => {
  return (
    <Grid container spacing={3}>
      {preferences.map((preference) => (
        <Grid item xs={12} sm={6} md={4} key={preference.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{preference.material}</Typography>
              <Typography color="textSecondary">Form: {preference.form}</Typography>
              <Typography color="textSecondary">Grade: {preference.grade}</Typography>
              {preference.dimensions && (
                <Typography>Dimensions: {preference.dimensions}</Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => onEdit(preference)}>
                Edit
              </Button>
              <Button size="small" color="secondary" onClick={() => onDelete(preference.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PreferencesList;
