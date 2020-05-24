import React, { Component } from 'react';
import {  Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <ul className="App-header">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/hacker">Hacker News</Link>
                </li>
            </ul>
        )
    }
}

export default Home