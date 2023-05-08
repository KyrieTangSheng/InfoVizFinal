import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./heatmap/cell";
import Box from '@mui/material/Box';
import { ScatterPlot } from "./scatterplot/scatterplot";
import {
  Typography,
} from "@mui/material";
import {
  csv,
  min,
  max,
  median,
  interpolateOrRd,
  mean,
} from "d3";
import { Scales } from "./utils/scale";
import { Legend } from "./heatmap/legend";
import PosSelect from "./selection/pos_selection";
import AttrSelect from "./selection/attr_selection"
import LeagueSelect from "./selection/league_selection"
import DataSorting from "./utils/sorting";
const lplTeamUrl =
  "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/26e459da2bd101af0bd17b4c5bbe4b950eeb13be/T_lpl_team.csv";
const lckTeamUrl =
  "https://gist.githubusercontent.com/KyrieTangSheng/be96c5e4df7748a5d8462fe618451bc6/raw/26e459da2bd101af0bd17b4c5bbe4b950eeb13be/T_lck_team.csv"
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
  const HEIGHT = 600;
  const margin = { top: 150, right: 40, bottom: 50, left: 50 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;

  const [attr, setAttr] = React.useState('GP');
  const [league,setLeague] = React.useState('lpl')
  const [selectedPos,setSelectedPos] = React.useState('TOP');
  const [lplTeamData, setLplTeamData] = React.useState(null);
  const [selectedTeam,setSelectedTeam] = React.useState('JD Gaming');
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

  React.useEffect(()=>{
    console.log("Now Selected Team:",selectedTeam);
  }, [selectedTeam]);

  if (!lplTeamData) {
    return <pre>Loading...</pre>;
  }
  let TEAMATTR = getAllAttr(lplTeamData);
  let LPLTEAM = lplTeamData["columns"].slice(1);
  let xScale = Scales.band(LPLTEAM, 0, width);
  let yScale = Scales.band(TEAMATTR, 0, height);

  const playerData = {'TOP': [{'Team': 'T1', 'KDA': 0.29, 'CTR%': 0.46, 'KP': 0.4079999999999999, 'DTH%': 0.49, 'DMG%': 0.45}, {'Team': 'Gen.G', 'KDA': 0.35, 'CTR%': 0.31, 'KP': 0.32599999999999985, 'DTH%': 0.492, 'DMG%': 0.42}, {'Team': 'Bilibili Gaming', 'KDA': 0.37, 'CTR%': 0.5, 'KP': 0.17199999999999993, 'DTH%': 0.392, 'DMG%': 0.438}, {'Team': 'JD Gaming', 'KDA': 0.46, 'CTR%': 0.75, 'KP': 0.29800000000000004, 'DTH%': 0.414, 'DMG%': 0.376}], 'JUN': [{'Team': 'T1', 'KDA': 0.4, 'CTR%': 0.31, 'KP': 0.6019999999999999, 'DTH%': 0.416, 'DMG%': 0.296}, {'Team': 'Gen.G', 'KDA': 0.41, 'CTR%': 0.69, 'KP': 0.484, 'DTH%': 0.48, 'DMG%': 0.29}, {'Team': 'Bilibili Gaming', 'KDA': 0.43, 'CTR%': 0.46, 'KP': 0.6139999999999999, 'DTH%': 0.496, 'DMG%': 0.33}, {'Team': 'JD Gaming', 'KDA': 0.57, 'CTR%': 0.5, 'KP': 0.5979999999999999, 'DTH%': 0.43, 'DMG%': 0.372}], 'MID': [{'Team': 'T1', 'KDA': 0.4, 'CTR%': 0.54, 'KP': 0.526, 'DTH%': 0.396, 'DMG%': 0.428}, {'Team': 'Gen.G', 'KDA': 0.76, 'CTR%': 0.56, 'KP': 0.54, 'DTH%': 0.27, 'DMG%': 0.554}, {'Team': 'Bilibili Gaming', 'KDA': 0.58, 'CTR%': 0.73, 'KP': 0.554, 'DTH%': 0.354, 'DMG%': 0.47}, {'Team': 'JD Gaming', 'KDA': 0.53, 'CTR%': 0.25, 'KP': 0.6099999999999999, 'DTH%': 0.46, 'DMG%': 0.552}], 'ADC': [{'Team': 'T1', 'KDA': 0.59, 'CTR%': 0.69, 'KP': 0.6759999999999999, 'DTH%': 0.292, 'DMG%': 0.628}, {'Team': 'Gen.G', 'KDA': 0.64, 'CTR%': 0.44, 'KP': 0.6319999999999999, 'DTH%': 0.34, 'DMG%': 0.6}, {'Team': 'Bilibili Gaming', 'KDA': 0.64, 'CTR%': 0.46, 'KP': 0.5640000000000001, 'DTH%': 0.328, 'DMG%': 0.63}, {'Team': 'JD Gaming', 'KDA': 1.0, 'CTR%': 0.58, 'KP': 0.5779999999999998, 'DTH%': 0.238, 'DMG%': 0.57}], 'SUP': [{'Team': 'T1', 'KDA': 0.46, 'CTR%': 0.46, 'KP': 0.794, 'DTH%': 0.406, 'DMG%': 0.198}, {'Team': 'Gen.G', 'KDA': 0.53, 'CTR%': 0.38, 'KP': 0.6699999999999999, 'DTH%': 0.422, 'DMG%': 0.134}, {'Team': 'Bilibili Gaming', 'KDA': 0.49, 'CTR%': 0.58, 'KP': 0.5839999999999999, 'DTH%': 0.43, 'DMG%': 0.134}, {'Team': 'JD Gaming', 'KDA': 0.58, 'CTR%': 0.33, 'KP': 0.744, 'DTH%': 0.46, 'DMG%': 0.13}]};
  // const selectedPosData = playerData[selectedPos];

  // const startRange = [min(data, d => d.start), median(data, d => d.start), max(data, d => d.start)];
  // const colorRange = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];



  return (
    <React.Fragment>

      <Box sx={{ margin: "20px", display: "flex", flexDirection: "column" }}>
        <Typography fontWeight="bold" fontSize={30} m={1}>
        A Visualized Investigation into LPL & LCK 2023 Spring Playoffs Statistics
        </Typography>
        <Typography fontWeight="bold" m={1}>
          Tang Sheng (ts3906), Yuhong Wang (wy913)
        </Typography>
        <Typography>
        League of Legends (LOL) is a popular multiplayer(5vs5) online battle arena game, which has millions of players around the world. It became the performing event at 2018 Jakarta Asian Games and formal event at 2022 Hangzhou Asian Games (to be held this year due to the covid). While professional esport teams have their own group of analysts to support daily training by cooperating with coaches and players, we amateur audience lack supportive techniques to understand the tactics and strategies behind the games.
As the Mid Season Invitational tournament (MSI, an important international match of LOL) is approaching, we gather and process some up key data to help amateur audiences like us to better understand and enjoy the match. All video games are essentially made up of codes and numbers, which means the analysis consists of much complexity and data-cleaning. In our project, we collect the raw data from the website https://oracleselixir.com/, which shows basic variables directly exported from game records in all LOL regions around the world.
        </Typography>
      </Box>
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
      {<PosSelect
      pos = {selectedPos}
      setPos = {setSelectedPos}
        />}
      </Box>
      <svg width={WIDTH+500} height={HEIGHT+300}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {lplTeamData.map((d, index) => {
          const sliced_d = Object.keys(d).slice(1).reduce((result, key) => {
            result[key] = parseFloat(d[key]);
            return result;
        }, {});
        const min_val = min(Object.values(sliced_d));
        const max_val = max(Object.values(sliced_d));
        const stat_range = [min_val,max_val];
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
                  setSelectedTeam = {setSelectedTeam}
                />
              );
            }
          });
        })}
        {LPLTEAM.map((s) => {
          let myColor;
          (s=="Bilibili Gaming" || s=="JD Gaming" || s=="T1" || s=="Gen.G")
          ? myColor = "red"
          : myColor = "black"
          return (
            <g key={s} transform={`translate(${xScale(s) + 100},-8)rotate(60)`}>
              <text style={{ textAnchor: "end", fill:myColor}}>{s}</text>
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

      {/* {Line Chart} */}
      {
            <React.Fragment>
              <text width="20" height="900">
              <tspan x="900" y="-130" font-size="smaller" fill="blue">GP = Games played.</tspan>
              <tspan x="900" y="-120" font-size="smaller" fill="blue">W = Total Wins</tspan>
              <tspan x="900" y="-110" font-size="smaller" fill="blue">AGT = Average time duration (in mins)</tspan>
              <tspan x="900" y="-100" font-size="smaller" fill="blue">KD = Kill-to-Death ratio</tspan>
              <tspan x="900" y="-90" font-size="smaller" fill="blue">CKPM = Average combined kills per minute</tspan>
              <tspan x="900" y="-80" font-size="smaller" fill="blue">FB = First blood rate</tspan>
              <tspan x="900" y="-70" font-size="smaller" fill="blue">DRG = Dragon control rate</tspan>
              <tspan x="900" y="-60" font-size="smaller" fill="blue">BN = Baron control rate</tspan>
              <tspan x="900" y="-50" font-size="smaller" fill="blue">LNE = Lane control rate</tspan>
              <tspan x="900" y="-40" font-size="smaller" fill="blue">WPM = Average wards placed per minute</tspan>
              <tspan x="900" y="-30" font-size="smaller" fill="blue">WCPM = Average wards cleared per minute</tspan>
              <tspan x="900" y="-20" font-size="smaller" fill="orange">KDA = Total kill/death/assist ratio</tspan>
              <tspan x="900" y="-10" font-size="smaller" fill="orange">CTR% = Counter-pick rate</tspan>
              <tspan x="900" y="0" font-size="smaller" fill="orange">KP = Kill participation</tspan>
              <tspan x="900" y="10" font-size="smaller" fill="orange">DTH% = Average share of team's deaths</tspan>
              <tspan x="900" y="20" font-size="smaller" fill="orange">DMG% =  Average share of team's total damage</tspan>
        </text>
              <ScatterPlot
                offsetX={1000}
                offsetY={100}
                playerData = {playerData}
                selectedPos = {selectedPos}
                selectedTeam = {selectedTeam}
                height={280}
                width={280}
              />

            </React.Fragment>


          }
      </g>
    </svg>

    </React.Fragment>


  );
}

ReactDOM.render(<HeatMap />, document.getElementById("root"));
