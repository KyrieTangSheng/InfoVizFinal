import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PosSelect(props) {

  const {pos,setPos} = props;

  const handleChange = (event) => {
    event.preventDefault();
    let newPos = event.target.value;
    setPos(newPos);
  };


  return (
    <Box  >
      <FormControl sx={{width: 120}}>
        <InputLabel id="league-simple-select-label">pos</InputLabel>
        <Select
          labelId="league-simple-select-label"
          id="league-simple-select"
          value={pos}
          label="Position"
          onChange={handleChange}
        >
          <MenuItem value={"TOP"}>TOP</MenuItem>
          <MenuItem value={"JUN"}>JUN</MenuItem>
          <MenuItem value={"MID"}>MID</MenuItem>
          <MenuItem value={"ADC"}>ADC</MenuItem>
          <MenuItem value={"SUP"}>SUP</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
