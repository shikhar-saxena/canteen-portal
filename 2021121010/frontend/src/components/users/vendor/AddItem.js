import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FoodItems from "../../templates/FoodItems";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Food Item</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}

          <TextField
            autoFocus
            margin="dense"
            label="Item Name"
            type="text"
            name="name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Item Price"
            type="number"
            fullWidth
            variant="standard"
          />
          <InputLabel id="user-type">User Type</InputLabel>
          <Select label="User Type" labelId="user-type" onChange={() => {}}>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <FoodItems choice={"vendor"} />
    </div>
  );
}

// name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   foodType: {
//     type: String,
//     enum: ["Veg", "Non-Veg"],
//     required: true,
//   },
//   addons: [AddonSchema],
//   tags: [String],
