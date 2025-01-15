import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { Material } from '../types';

interface MaterialsTableProps {
  materials: Material[];
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null , newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaterialsTable: React.FC<MaterialsTableProps> = ({
  materials,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Number</TableCell>
            <TableCell>Form and Choice</TableCell>
            <TableCell>Grade and Surface</TableCell>
            <TableCell>Finish</TableCell>
            <TableCell>Dimensions</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Weight (tons)</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.productNumber}</TableCell>
              <TableCell>{material.form}  {material.choice}</TableCell>
              <TableCell>{material.grade}  {material.surface}</TableCell>
              <TableCell>{material.finish}</TableCell>
              <TableCell>{material.dimension}</TableCell>
              <TableCell align='right'>{material.quantity}</TableCell>
              <TableCell align="right">{material.weight}</TableCell>
              <TableCell align="right">{material.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default MaterialsTable;
