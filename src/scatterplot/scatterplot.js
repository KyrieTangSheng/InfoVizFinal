import React from "react";
import { max, min,scaleBand } from "d3";
import { Scales } from "../utils/scale";
import { XAxis, YAxis } from "./axes";
import * as d3shape from "d3-shape";

function Legend({ offsetX, offsetY }) {
  const rectSize = 10;
  const rectSpacing = 5;
  const textOffset = rectSize + rectSpacing;
  const rectX = offsetX + rectSize / 2;
  const rectY = offsetY + rectSpacing;

  return (
    <g className="legend">
      <rect x={rectX} y={rectY} width={rectSize} height={rectSize} fill="red" />
      <text x={rectX + textOffset} y={rectY + rectSize / 2 + 5}>JDG</text>

      <rect x={rectX} y={rectY + rectSize + rectSpacing} width={rectSize} height={rectSize} fill="orange" />
      <text x={rectX + textOffset} y={rectY + rectSize + rectSpacing + rectSize / 2 +5}>BLG</text>

      <rect x={rectX} y={rectY + 2 * (rectSize + rectSpacing)} width={rectSize} height={rectSize} fill="green" />
      <text x={rectX + textOffset} y={rectY + 2 * (rectSize + rectSpacing) + rectSize / 2 +5}>GENG</text>

      <rect x={rectX} y={rectY + 3 * (rectSize + rectSpacing)} width={rectSize} height={rectSize} fill="blue" />
      <text x={rectX + textOffset} y={rectY + 3 * (rectSize + rectSpacing) + rectSize / 2+5}>T1</text>
    </g>
  );
}

export function ScatterPlot(props) {
  const {
    offsetX,
    offsetY,
    playerData,
    selectedPos,
    selectedTeam,
    height,
    width,
  } = props;
  console.log("From scatterplot --> Selected Team:",selectedTeam);
  const selectedPosData = playerData[selectedPos];
  const jdgData = selectedPosData[3];
  const blgData = selectedPosData[2];
  const gengData = selectedPosData[1];
  const t1Data = selectedPosData[0];
  console.log("TeamName:",jdgData);
  console.log("TeamName:",blgData);
  console.log("TeamName:",gengData);
  console.log("TeamName:",t1Data);
  const jdgLineChart = []
  const blgLineChart = []
  const gengLineChart = []
  const t1LineChart = []
  Object.keys(jdgData).map((key) => {
    key != "Team"
      ? jdgLineChart.push({ "attr": key, value: jdgData[key] })
      : null;
  })
  Object.keys(blgData).map((key) => {
    key != "Team"
      ? blgLineChart.push({ "attr": key, value: blgData[key] })
      : null;
  })
  Object.keys(gengData).map((key) => {
    key != "Team"
      ? gengLineChart.push({ "attr": key, value: gengData[key] })
      : null;
  })
  Object.keys(t1Data).map((key) => {
    key != "Team"
      ? t1LineChart.push({ attr: key, value: t1Data[key] })
      : null;
  })

  const attrOrdinal = jdgLineChart.map(d => d.attr);

const xScale = scaleBand()
.domain(attrOrdinal)
.range([0, width])
.padding(0.1);
  const yScale = Scales.linear(
    0,
    1,
    height,
    0
  );

  const lineGenerator = d3shape
    .line()
    .x((d) => xScale(d.attr))
    .y((d) => yScale(d.value));

    const normalStrokeWidth = 3;
    const highlightedStrokeWidth = 3*normalStrokeWidth;
  return (
    <React.Fragment>
        <g transform={`translate(${offsetX}, ${offsetY})`}>
          <path
            d={lineGenerator(jdgLineChart)}
            stroke={"red"}
            strokeWidth={selectedTeam==jdgData.Team
              ? highlightedStrokeWidth
              : normalStrokeWidth}
            fill={"none"}
            opacity={0.7}
          />
          <path
            d={lineGenerator(blgLineChart)}
            stroke={"orange"}
            strokeWidth={selectedTeam==blgData.Team
              ? highlightedStrokeWidth
              : normalStrokeWidth}
            fill={"none"}
            opacity={0.7}
            text={"aaaa"}
          />
          <path
            d={lineGenerator(gengLineChart)}
            stroke={"green"}
            strokeWidth={selectedTeam==gengData.Team
              ? highlightedStrokeWidth
              : normalStrokeWidth}
            fill={"none"}
            opacity={0.7}
          />
          <path
            d={lineGenerator(t1LineChart)}
            stroke={"blue"}
            strokeWidth={selectedTeam==t1Data.Team
              ? highlightedStrokeWidth
              : normalStrokeWidth}
            fill={"none"}
            opacity={0.7}
          />

        <YAxis
          yScale={yScale}
          height={height}
          axisLabel={
            "Player Statistics"
          }
        />

        <XAxis
          chartType={"scatter"}
          xScale={xScale}
          height={height}
          width={width}
          axisLabel={"Attribute"}
        />

<Legend offsetX={width-30} offsetY={0} />
      </g>
    </React.Fragment>
  );
}
