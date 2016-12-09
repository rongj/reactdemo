import React, { Component } from 'react';
import {Container} from '../components';
import FooterBar from '../common/footer'

class HomeTop extends Component {
	render() {
		return (
			<div>
				发现
			</div>
		);
	}
}


export default class Home extends Component {
	render() {
		return (
			<Container direction="column">
				<Container scrollable>
					<HomeTop/>
				</Container>
				<FooterBar current={2}/>
			</Container>
		);
	}
}
