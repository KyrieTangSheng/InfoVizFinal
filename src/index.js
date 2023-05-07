import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import Box from '@mui/material/Box';
import {
  csv,
  min,
  max,
  median,
  interpolateGnBu,
  interpolateRdBu,
  interpolateYlOrBr,
  interpolateOrRd,
  mean,
} from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import Papa from "papaparse";
import AttrSelect from "./attr_selection"
import LeagueSelect from "./league_selection"
import DataSorting from "./sorting";
//const lplTeamUrl =
// "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/89c13d0e20363745625b391fade85c5cc081d8db/lpl_team.csv";
const lplTeamUrl =
  "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/636bf006070229d7f59a8a90e5cc14b5218f525d/T_lpl_team.csv";
const lckTeamUrl =
  "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/636bf006070229d7f59a8a90e5cc14b5218f525d/T_lck_team.csv"
  function useData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      data.forEach((d) => {});
      setData(data);
    });
  }, []);
  return dataAll;
}

function getAllAttr(data) {
  const temp = data.map((d) => d.Team);
  return temp;
}
function medianArray(arr) {
  const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };
  return median(arr);
}
function HeatMap() {
  const WIDTH = 900;
  const HEIGHT = 900;
  const margin = { top: 150, right: 40, bottom: 50, left: 50 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;

  const [attr, setAttr] = React.useState('GP');
  const [league,setLeague] = React.useState('lpl')

  const [lplTeamData, setLplTeamData] = React.useState(null);
  React.useEffect(()=>{
    async function fetchData() {
      let selected_url;
      if(league=="lpl"){
        selected_url = lplTeamUrl;
      } else{
        selected_url = lckTeamUrl;
      }
      const data = await csv(selected_url);
      data.forEach((d) => {});
      const sortedData = DataSorting(attr, data);
      setLplTeamData(sortedData);
    }
    fetchData();
  }, [attr,league]);


  if (!lplTeamData) {
    return <pre>Loading...</pre>;
  }
  let TEAMATTR = getAllAttr(lplTeamData);
  let LPLTEAM = lplTeamData["columns"].slice(1);
  let xScale = Scales.band(LPLTEAM, 0, width);
  let yScale = Scales.band(TEAMATTR, 0, height);


  // const startRange = [min(data, d => d.start), median(data, d => d.start), max(data, d => d.start)];
  // const colorRange = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];



  return (
    <React.Fragment>
      <Box sx={{ minWidth: 150 ,margin: "1px", display: "flex", flexDirection: "row"}}>
      {<AttrSelect
      attr = {attr}
      setAttr = {setAttr}
      attrList = {TEAMATTR}
        />}
      {<LeagueSelect
      league = {league}
      setLeague = {setLeague}
      leagueList = {['lpl','lck']}
      />}
      </Box>
      <svg width={WIDTH+100} height={HEIGHT+100}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {lplTeamData.map((d, index) => {
          console.log("mapped data:",d);
          const sliced_d = Object.keys(d).slice(1).reduce((result, key) => {
            result[key] = parseFloat(d[key]);
            return result;
        }, {});
        const min_val = min(Object.values(sliced_d));
        const max_val = max(Object.values(sliced_d));
        const median_val = medianArray(Object.values(sliced_d));
        const stat_range = [min_val,max_val];
        console.log("Attr:",d.Team);
        console.log("sliced_d:",sliced_d);
        console.log("min:",min_val);
        console.log("max:",max_val);
        const color_range = ["#ffe4e1", "#f7d0cb", "#ba1016"];
        // if(attr!==d.Team){
        //   color_range = ["#ffe4e1", "#f7d0cb", "#ba1016"];
        // } else{
        //   color_range = ["#ffe4e1", "#f7d0cb", "#ba1016"];
        // }
        const colormap = Scales.colorSequential(
          stat_range,
          // color_range
          interpolateOrRd
        );
        const needStroke = (attr===d.Team);
        console.log("Color for Max Value",colormap[max_val]);
        console.log("Color for Min Value",colormap[min_val]);
          return Object.keys(d).map((element) => {
            if (element!="Team") {
              return (
                <Cell
                  key={element + d.Team}
                  dAttr={d.Team}
                  dTeam={element}
                  xScale={xScale}
                  yScale={yScale}
                  color={colormap(d[element])}
                  my_val = {d[element]}
                  needStroke = {needStroke}
                />
              );
            }
          });
        })}
        {LPLTEAM.map((s) => {
          return (
            <g key={s} transform={`translate(${xScale(s) + 100},-8)rotate(60)`}>
              <text style={{ textAnchor: "end" }}>{s}</text>
            </g>
          );
        })}
        {TEAMATTR.map((m) => {
          return (
            <text key={m} style={{ textAnchor: "middle" }} x={0} y={yScale(m)+15}>
              {m}
            </text>
          );
        })}
         <Legend
          x={0}
          y={height + 20}
          width={width / 2}
          height={20}
          numberOfTicks={3}
          rangeOfValues={[0, 1]}
          colormap={Scales.colorSequential([0,1],interpolateOrRd)}
        />
      </g>
    </svg>
    </React.Fragment>


  );
}

ReactDOM.render(<HeatMap />, document.getElementById("root"));
