import React from "react";

export function Cell(props){
    const { dAttr, dTeam, xScale, yScale, color,my_val,needStroke} = props;
    console.log("COLOR:",color,"; my_val",my_val);
    if(!needStroke){
    return <g transform={`translate(${xScale(dTeam)+80}, ${yScale(dAttr)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"None"} />
    </g>
    } else{
        return <g transform={`translate(${xScale(dTeam)+80}, ${yScale(dAttr)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"}
        stroke-width={3}/>
    </g>
    }
}
