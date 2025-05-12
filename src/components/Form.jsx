import { useSelector, useDispatch } from "react-redux";
import { Button, Box, Typography, TextField } from '@mui/material';
import { useEffect } from 'react';
import { setDetails, setDeleteDetails } from "../redux/slices/formSlice";
import { useForm } from "react-hook-form";

const Form = ({ setOpen, editData }) => {
  const details = useSelector((state) => state.form.details);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editData) {
      setValue("firstName", editData.firstName);
      setValue("lastName", editData.lastName);
      setValue("email", editData.email);
    } else {
      reset();
    }
  }, [editData]);

  const onSubmit = (data) => {
    if (editData) {
      const index = details.findIndex((d) => d.id === editData.id);

      if (
        data.firstName === editData.firstName &&
        data.lastName === editData.lastName &&
        data.email === editData.email
      ) {
        alert("No changes made. Skipping update.");
        setOpen(false);
        return;
      }

      if (index !== -1) {
        dispatch(setDeleteDetails(index));
      }

      dispatch(setDetails({ id: editData.id, ...data }));
    } else {
      dispatch(setDetails({ id: Date.now(), ...data }));
    }

    reset();
    setOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <Typography variant="h5" align="center">
        {editData ? "Edit Details" : "Add Details"}
      </Typography>

      <TextField
        label="First Name"
        fullWidth
        variant="outlined"
        sx={{ mt: 5 }}
        {...register("firstName", { required: "First Name is required" })}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        label="Last Name"
        fullWidth
        variant="outlined"
        sx={{ mt: 5 }}
        {...register("lastName", { required: "Last Name is required" })}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        inputProps={{ type: "email" }}
        sx={{ mt: 5 }}
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 5, backgroundColor: '#311b92' }}
      >
        {editData ? "Save" : "Submit"}
      </Button>
    </Box>
  );
};

export default Form;
