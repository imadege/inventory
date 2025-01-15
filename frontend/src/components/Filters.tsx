import React from 'react';
import { Autocomplete, TextField, Box, Typography, Grid } from '@mui/material';
import { Preference } from '../types';

interface FiltersProps {
  preferences: Preference[];
  onFilterChange: (preference: Preference | null) => void;
}

const Filters: React.FC<FiltersProps> = ({ preferences, onFilterChange }) => {
  const handlePreferenceChange = (event: React.SyntheticEvent, selectedPreference: Preference | null) => {
    console.log(event)
    onFilterChange(selectedPreference);
  };

  return (
    <Autocomplete
      options={preferences}
      getOptionLabel={(option) => `${option.material} (${option.form}) - Grade: ${option.grade} - Minimun width : ${option.widthMin} - Maximum width: ${option.widthMax} - Minimum Thickeness: ${option.thickenessMin} - Maximum thickeness: ${option.thickenessMax}`}
      onChange={handlePreferenceChange}
      renderOption={(props, option) => (
        <Box component="li" {...props} sx={{ padding: 1 }}>
          <Grid container spacing={2}>
            {/* Column 1: Material and Form */}
            <Grid item xs={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {option.material}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ({option.form})
              </Typography>
            </Grid>

            {/* Column 2: Grade */}
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Grade:
              </Typography>
              <Typography variant="body2">{option.grade || 'N/A'}</Typography>
            </Grid>

            {/* Column 3: Dimensions */}
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                WidthMin:
              </Typography>
              <Typography variant="body2">{option.widthMin || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                WidthMax:
              </Typography>
              <Typography variant="body2">{option.widthMax || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              ThicknessMin:
              </Typography>
              <Typography variant="body2">{option.thickenessMin || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                ThicknessMax:
              </Typography>
              <Typography variant="body2">{option.thickenessMax || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Match by Preference" variant="outlined" />}
    />
  );
};

export default Filters;
