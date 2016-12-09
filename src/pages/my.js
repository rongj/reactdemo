import React, { Component } from 'react';
import {Container} from '../components';
import FooterBar from '../common/footer'

class HomeTop extends Component {
	render() {
		return (
			<div>
				我的
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
				<FooterBar current={3}/>
			</Container>
		);
	}
}
