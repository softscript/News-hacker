import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import history from './history.js';
import HackerNewsList from './containers/NewsContainer';

function Routes() {

	return (
		<Router history={history}>
			<div className="App">
				<Route path="/" exact component={HackerNewsList} />
                <Route path="/page/:page_no" component={HackerNewsList} />
			</div>
		</Router>
	)
}

export default Routes;