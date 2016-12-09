import React, { Component } from 'react';
import {Router,Route,Redirect,IndexRoute,hashHistory} from 'react-router';

import {NavBar, Container} from './components';

class App extends Component{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    render(){
        let {location, params, children, ...props} = this.props;
        let backNav = {
            title: '返回',
            props: {
                onClick: () => this.context.router.goBack()
            }
        };
        return(
            <Container direction="column">
                <NavBar title="存票" className="bi-navbar" leftNav={[backNav]}></NavBar>
                {/*React.cloneElement(children, {key: location.key})*/}
            	{this.props.children}
            </Container>
        );
    }
};

const Home = (location, cb) => {	//首页
    require.ensure([], require => {
        cb(null, require('./pages/home').default)
    })
}

const Seller = (location, cb) => {	//商家列表
    require.ensure([], require => {
        cb(null, require('./pages/seller').default)
    })
}

const Find = (location, cb) => {	//发现
    require.ensure([], require => {
        cb(null, require('./pages/find').default)
    })
}

const My = (location, cb) => {	//我的
    require.ensure([], require => {
        cb(null, require('./pages/my').default)
    })
}

const ReduxTodo = (location, cb) => {	//reduxdemo
    require.ensure([], require => {
        cb(null, require('./pages/reduxtodo').default)
    })
}

const RouteConfig = (
    <Router history={hashHistory}>
		<Route path="/" component={App}>
	    	<IndexRoute getComponent={Home} />
	    	<Route path="seller" getComponent={Seller} />
	    	<Route path="find" getComponent={Find} />
	    	<Route path="my" getComponent={My} />
	    	<Route path="todo" getComponent={ReduxTodo} />
		</Route>
    </Router>
)
export default RouteConfig;