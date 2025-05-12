import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { setDeleteDetails } from '../redux/slices/formSlice';

export default function BasicTable({ setOpen, setEditDetails }) {
  const details = useSelector((state) => state.form.details);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    const item = details.find((d) => d.id === id);
    if (item) {
      setOpen(true);
      setEditDetails(item); 
    }
  };

  const handleDelete = (index) => {
    dispatch(setDeleteDetails(index));
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#ede7f6' }}>
            <TableCell>Id</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(details) && details.length > 0 ? (
            details.map((detail, index) => (
              <TableRow key={detail.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{detail?.firstName}</TableCell>
                <TableCell>{detail?.lastName}</TableCell>
                <TableCell>{detail?.email}</TableCell>
                <TableCell sx={{ display: 'flex', gap: '10px' }}>
                  <EditSquareIcon sx={{ cursor: 'pointer' }} onClick={() => handleEdit(detail.id)} />
                  <DeleteOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(index)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
