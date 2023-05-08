import React from "react";

export function Cell(props){
    const { dAttr, dTeam, xScale, yScale, color,my_val,needStroke,setSelectedTeam} = props;
    if(!needStroke){
    return <g transform={`translate(${xScale(dTeam)+80}, ${yScale(dAttr)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"None"}
        onMouseEnter={(e) => {
            setSelectedTeam(dTeam);
          }}
          onMouseOut={() => {
            setSelectedTeam(null);
          }}/>
    </g>
    } else{
        return <g transform={`translate(${xScale(dTeam)+80}, ${yScale(dAttr)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"}
        strokeWidth={3}
        onMouseEnter={(e) => {
            setSelectedTeam(dTeam);
          }}
          onMouseOut={() => {
            setSelectedTeam(null);
          }}/>
    </g>
    }
}
