import React, { Component } from 'react';
import {Container} from '../components';
import FooterBar from '../common/footer'

class HomeTop extends Component {
	render() {
		return (
			<div className="home-top">
				<div className="home-top-bill">
					<i></i>
					<span>账单</span>
				</div>
				<div className="home-top-check">
					<i></i>
					<span>买单</span>
				</div>
			</div>
		);
	}
}

class HomeList extends Component{
	constructor(props) {
	  	super(props);
	  	this.state = {
	  		listdata:[],
	  		page: 1,
	  		showrate: false
	  	};
	}

	//设置默认props
	// static defaultProps = {
	// 	scrollheight: this.scrollFetch()
	// }
	// static propTypes = {
	// 	scrollheight: React.PropTypes.func.isRequired,
	// }

	componentWillMount() {
		this.fetchList(this.state.page)
		// fetch('https://cptest.cunpiao.com/apish/m/v1/store/details', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/x-www-form-urlencoded',
		//   },
		//   body: 'store_id=3'
		// })
		// .then(response => response.json())
  //     	.then(responseJson => {
  //       	return console.log(responseJson.data);
  //     	})
  //     	.catch((error) => {
  // 	        console.error(error);
  // 	    });
	}

	// 获取会员卡列表
	fetchList(p){
  	    fetch('https://cptest.cunpiao.com/apish/m/v1/business/collection_businesses', {
		  	method: 'POST',
		  	headers: {
		    	'Content-Type': 'application/x-www-form-urlencoded',
		  	},
		  	body: 'uid=24&page='+p
		})
		.then(response => response.json())
      	.then(responseJson => {
      		if(responseJson.data.count>0){
		  	    this.setState({
		  	    	listdata: this.state.listdata.concat(responseJson.data.items),
		  	    	page: this.state.page+1
		  	    })
		  	    console.log('C：'+this.state.page);
      		}else{
      			console.log('没有更多数据了')
      		}
      	})
      	.catch((error) => {
  	        console.error(error);
  	    });
	}

	componentWillReceiveProps(nextProps){
		// console.log(nextProps.scrollheight);
		if(nextProps.scrollheight<20){
			console.log('D：'+this.state.page);
			this.fetchList(this.state.page);
		}
	}

	//切换分红分红率
	onSwitchRate = () =>{
		this.setState({
			showrate:!this.state.showrate
		})

		//假设我要传当前组件的值给父组件,如是否显示了分红率
		this.props.transmit(this.state.showrate)
	}

	render() {
		const {listdata,showrate} = this.state;
		const {scrollheight} = this.props;
		return (
			<div className="home-list">
				<div className="home-list-top">
					<ul>
						<li>店名{scrollheight}</li>
						<li>当前余额</li>
						<li>{showrate?'昨日分红率':'昨日分红'}</li>
					</ul>
				</div>
				<ul className="home-list-content">
					{
						listdata.map((item,i)=> 
							<li key={i}>
								<a href="javascript:;">
									<div className="home-list-l">
										<h2>{item.business_name}</h2>
										<span>{item.vip_card_title}</span>
									</div>
									<div className="home-list-c">￥{item.account_money}</div>
									<div className="home-list-r" onClick={this.onSwitchRate}>
										<span>{showrate?item.yield_rate:item.yield_money}</span>
									</div>
								</a>
							</li>
						)
					}
				</ul>
			</div>
		);
	}
}

export default class Home extends Component {
	constructor(props) {
	  	super(props);
	  	this.state = {
	  		scrollheight : null
	  	};
	}

	//将滚动离底部的高度传递给子组件HomeList
	handScroll = e =>{
		this.setState({
			scrollheight: e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight
		})
	}

	//从子组件接收的信息
	showRate = bool =>{
		console.log('我是子组件传过来的是否显示分红率：'+bool);
	}
	render() {
		const {scrollheight} = this.state;
		return (
			<Container direction="column">
				<Container scrollable onScroll={this.handScroll}>
					<HomeTop/>
					<HomeList scrollheight={scrollheight} transmit={this.showRate}/>
				</Container>
				<FooterBar current={0}/>
			</Container>
		);
	}
}
