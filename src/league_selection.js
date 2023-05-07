import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LeagueSelect(props) {

  const {league,leagueList,setLeague} = props;

  const handleChange = (event) => {
    event.preventDefault();
    let newLeague = event.target.value;
    setLeague(newLeague);
  };


  return (
    <Box  >
      <FormControl sx={{width: 120}}>
        <InputLabel id="league-simple-select-label">League</InputLabel>
        <Select
          labelId="league-simple-select-label"
          id="league-simple-select"
          value={league}
          label="League"
          onChange={handleChange}
        >
          <MenuItem value={"lpl"}>LPL</MenuItem>
          <MenuItem value={"lck"}>LCK</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
