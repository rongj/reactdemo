import React, { Component } from 'react';
import './../assets/scss/footer.scss';

const FOOTERNAV = [
	{
		'title':'存票',
		'link': '/'
	},
	{
		'title':'商家',
		'link': 'seller'
	},
	{
		'title':'发现',
		'link': 'find'
	},
	{
		'title':'我的',
		'link': 'my'
	}
]

export default class FooterBar extends Component {

	render() {
		const {current} = this.props;
		return (
			<footer className="footer-bar hasicon">
				{
					FOOTERNAV.map((item,i)=>
						<a href={'#'+item.link} key={i} className={ current === i ? 'active' : ''}>
							<i className={`footer-icon0${i+1}`}></i>
							<span>{item.title}</span>
						</a>
					)
				}
			</footer>
		);
	}
}
