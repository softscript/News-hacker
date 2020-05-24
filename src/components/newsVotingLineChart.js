import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvas/canvasjs.react';
import _ from 'lodash';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VotingChart extends Component {
	render() {

		const newsRows = _.get(this.props, 'data.hits', [])
		const hiddenNewsIds = _.get(this.props, 'hiddenNewsId', [])
		const voteCounts = _.get(this.props, 'voteCountObj', {})


		let dataPoints = _.compact(
			newsRows.map((row, index) => {
				if (!hiddenNewsIds.includes(row.objectID)) {
					return {
						x: index + 1,
						y: (voteCounts && voteCounts[row.objectID]) || 0
					}
				}else{
					return undefined
				}
			}))


		const options = {
			animationEnabled: true,
			exportEnabled: false,
			theme: "light2",
			axisY: {
				title: "Votes",
				includeZero: false,
				suffix: ""
			},
			axisX: {
				title: "ID (Custom Id)",
				prefix: "",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Votes {x}: {y}",
				axisXIndex: 0,
				dataPoints: dataPoints

			}]
		}

		return (
			<div>
				<CanvasJSChart options={options} />
			</div>
		);
	}
}

export default VotingChart;                           