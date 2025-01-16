import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialsTable from '../components/MaterialsTable';
import Filters from '../components/Filters';
import { Material, Preference } from '../types';
import { Grid, Typography, Card, CardContent} from '@mui/material';

const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  const [totalTons, setTotalTons] = useState(0);

  useEffect(() => {
    // Fetch materials
    axios
      .get('/api/inventory', { params: { page, limit: rowsPerPage } })
      .then((response) => {
        const materials = response.data.data;
        const processedData = materials.map((item: any) => {
          // Define the mapping of attributes to their labels
          const attributeLabels: { [key: string]: string } = {
            length: 'L',
            width: 'W',
            height: 'H',
            thickness: 'T',
            outerDiameter: 'OD',
            wallThickness: 'Wt',
            webThickness: 'Tw',
            flangeThickness: 'Tf',
          };
        
          // Build the dimension string dynamically
          const dimension = Object.keys(attributeLabels)
            .filter((key) => item[key] !== null && item[key] !== undefined) // Only include available attributes
            .map((key) => `${attributeLabels[key]}=${item[key]}`) // Map attribute to label=value format
            .join(', '); // Join with commas
        
          return {
            ...item,
            dimension, // Add the dynamically created dimension string
          };
        });
        console.log('Processed data:', response.data.totalTons);
        
        setMaterials(processedData);
        setFilteredMaterials(processedData);
        setTotal(response.data.total);
        setTotalTons(response.data.totalTons);
      })
      .catch((error) => console.error('Error fetching materials:', error));

    // Fetch preferences
    axios
      .get('/api/preferences')
      .then((response) => {
        setPreferences(response.data);
      })
      .catch((error) => console.error('Error fetching preferences:', error));
  }, [page, rowsPerPage]);

  const handleFilterChange = (preference: Preference | null) => {
    if (preference) {
      // Apply filtering logic based on selected preference
      const baseURL = '/api/';
      const url = preference.id ? `${baseURL}preferences/${preference.id}/inventories` : `${baseURL}/inventory`;
      console.log('URL:', url);
      axios
      .get(url, { params: { page, limit: rowsPerPage } })
      .then((response) => {
        const materials = response.data.data;
        const processedData = materials.map((item: any) => {
          // Define the mapping of attributes to their labels
          const attributeLabels: { [key: string]: string } = {
            length: 'L',
            width: 'W',
            height: 'H',
            thickness: 'T',
            outerDiameter: 'OD',
            wallThickness: 'Wt',
            webThickness: 'Tw',
            flangeThickness: 'Tf',
          };
        
          // Build the dimension string dynamically
          const dimension = Object.keys(attributeLabels)
            .filter((key) => item[key] !== null && item[key] !== undefined) // Only include available attributes
            .map((key) => `${attributeLabels[key]}=${item[key]}`) // Map attribute to label=value format
            .join(', '); // Join with commas
        
          return {
            ...item,
            dimension, // Add the dynamically created dimension string
          };
        });
        console.log('Processed data:', processedData);
        
        setFilteredMaterials(processedData);
        setMaterials(processedData);
        setTotal(response.data.total);
        setTotalTons(response.data.totalTons);
      })
      .catch((error) => console.error('Error fetching materials:', error));
      //setFilteredMaterials(filtered);
    } else {
      // If no preference is selected, show all materials
      setFilteredMaterials(materials);
    }
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>| null , newPage: number) => {
    console.log(event)
    setPage(newPage + 1); // Material-UI uses 0-based indexing for pages
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
  };

  return (
    
    <div>
      <h2>Materials</h2>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
  <Grid item xs={12} sm={6}>
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Total Materials:
        </Typography>
        <Typography variant="h4">{total}</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Total Tons (Weight):
        </Typography>
        <Typography variant="h4">{totalTons.toFixed(2)} Tons</Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

      <Filters preferences={preferences} onFilterChange={handleFilterChange} />
      <MaterialsTable
        materials={filteredMaterials}
        total={total}
        page={page - 1} // Material-UI uses 0-based indexing for pages
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default MaterialsPage;
