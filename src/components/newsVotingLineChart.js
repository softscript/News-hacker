import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvas/canvasjs.react';
import _ from 'lodash';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	render() {
		// console.log(`------props  ${JSON.stringify(this.props)}`)
		const newsRows = _.get(this.props,'data.hits', [])
		const hiddenNewsIds = _.get(this.props,'hiddenNewsId', [])
		const voteCounts = _.get(this.props,'voteCountObj', {})
		// console.log(`------hits  ${JSON.stringify(newsRows)}`)
let idArray = [];
_.forEach(newsRows, element => {
		if (!hiddenNewsIds.includes(element.objectID))
		idArray.push(element.objectID)
	})
	console.log(`------ids  ${JSON.stringify(idArray)}`)

let dataPoints =  _.compact(
    newsRows.map((row, index) => {
      if (!hiddenNewsIds.includes(row.objectID)) {
		return {
			x: row.objectID,
			y:  voteCounts[row.objectID] || 0
		}
	  }
	}))
let dataPoints1= [
		{ x: 1, y: 64 },
		{ x: 2, y: 61 },
		{ x: 3, y: 64 },
		{ x: 4, y: 62 },
		{ x: 5, y: 64 },
		{ x: 6, y: 60 },
		{ x: 7, y: 58 },
		{ x: 8, y: 59 },
		{ x: 9, y: 53 },
		{ x: 10, y: 54 },
		{ x: 11, y: 61 },
		{ x: 12, y: 60 },
		{ x: 13, y: 55 },
		{ x: 14, y: 60 },
		{ x: 15, y: 56 },
		{ x: 16, y: 60 },
		{ x: 17, y: 59.5 },
		{ x: 18, y: 63 },
		{ x: 19, y: 58 },
		{ x: 20, y: 54 },
		{ x: 21, y: 59 },
		{ x: 22, y: 64 },
		{ x: 23, y: 59 }
	]

	// console.log(`------hits  ${JSON.stringify(dataPoints)}`)

		const options = {
			animationEnabled: true,
			exportEnabled: false,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: ""
			},
			axisY: {
				title: "Votes",
				includeZero: false,
				suffix: ""
			},
			axisX: {
				title: "ID",
				prefix: "",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "Votes {x}: {y}",
				axisXIndex: 0,
				dataPoints:dataPoints
				// dataPoints: [
				// 	{ x: 1, y: 64 },
				// 	{ x: 2, y: 61 },
				// 	{ x: 3, y: 64 },
				// 	{ x: 4, y: 62 },
				// 	{ x: 5, y: 64 },
				// 	{ x: 6, y: 60 },
				// 	{ x: 7, y: 58 },
				// 	{ x: 8, y: 59 },
				// 	{ x: 9, y: 53 },
				// 	{ x: 10, y: 54 },
				// 	{ x: 11, y: 61 },
				// 	{ x: 12, y: 60 },
				// 	{ x: 13, y: 55 },
				// 	{ x: 14, y: 60 },
				// 	{ x: 15, y: 56 },
				// 	{ x: 16, y: 60 },
				// 	{ x: 17, y: 59.5 },
				// 	{ x: 18, y: 63 },
				// 	{ x: 19, y: 58 },
				// 	{ x: 20, y: 54 },
				// 	{ x: 21, y: 59 },
				// 	{ x: 22, y: 64 },
				// 	{ x: 23, y: 59 }
				// ]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineChart;                           