import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AttrSelect(props) {

  const {attr,attrList,setAttr} = props;

  const handleChange = (event) => {
    event.preventDefault();
    let newAttr = event.target.value;
    setAttr(newAttr);
  };


  return (
    <Box >
      <FormControl sx={{width: 120}}>
        <InputLabel id="demo-simple-select-label">Order By...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={attr}
          label="Attr"
          onChange={handleChange}
        >
          <MenuItem value={"GP"}>GP</MenuItem>
          <MenuItem value={"W"}>W</MenuItem>
          <MenuItem value={"L"}>L</MenuItem>
          <MenuItem value={"AGT"}>AGT</MenuItem>
          <MenuItem value={"K"}>K</MenuItem>
          <MenuItem value={"D"}>D</MenuItem>
          <MenuItem value={"KD"}>KD</MenuItem>
          <MenuItem value={"CKPM"}>CKPM</MenuItem>
          <MenuItem value={"GSPD"}>GSPD</MenuItem>
          <MenuItem value={"FB"}>FB</MenuItem>
          <MenuItem value={"DRG"}>DRG</MenuItem>
          <MenuItem value={"BN"}>BN</MenuItem>
          <MenuItem value={"LNE"}>LNE</MenuItem>
          <MenuItem value={"JNG"}>JNG</MenuItem>
          <MenuItem value={"WPM"}>WPM</MenuItem>
          <MenuItem value={"CWPM"}>CWPM</MenuItem>
          <MenuItem value={"WCPM"}>WCPM</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}
