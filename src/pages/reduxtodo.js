import React, { Component , PropTypes} from 'react';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../redux/action/actions';


class AddTodo extends Component {
	static propTypes = {
	 	onAddClick: React.PropTypes.func.isRequired
	}
	handleClick(e){
		const text = this.refs.input.value.trim();
		this.props.onAddClick(text);
		this.refs.input.value = '';
	}
	render() {
		return (
			<div>
				<input type="text" ref="input"/>
				<button onClick={ e => this.handleClick(e)}>添加</button>
			</div>
		);
	}
}

class Todo extends Component {
	static propTypes = {
		onClick: React.PropTypes.func.isRequired,
		text: React.PropTypes.string.isRequired,
		completed: React.PropTypes.bool.isRequired
	}
	render() {
		return (
			<li onClick={this.props.onClick} 
				style={{
					textDecoration: this.props.completed ? 'line-through' : 'none',
		            cursor: this.props.completed ? 'default' : 'pointer'
				}}>
				{this.props.text}
			</li>
		);
	}
}


class TodoList extends Component {
	static propTypes = {
		onTodoClick: React.PropTypes.func.isRequired,
		todos: React.PropTypes.arrayOf(React.PropTypes.shape({
			text: React.PropTypes.string.isRequired,
			completed: React.PropTypes.bool.isRequired
		}).isRequired).isRequired
	}

	render() {
		return (
			<ul>
				{
					this.props.todos.map( (todo, i) => 
						<Todo {...todo} key={i} onClick={ () => this.props.onTodoClick(i) } />
					)
				}
			</ul>
		);
	}
};

class TodoFilter extends Component {
    static propTypes = {
        onFilterChange: React.PropTypes.func.isRequired,
        filter: React.PropTypes.oneOf(['SHOW_ALL','SHOW_COMPLETED','SHOW_ACTIVE']).isRequired
    }

    renderFilter(filter, name){
        if(filter === this.props.filter){
            return name;
        }
        return(
            <button onClick={e => {e.preventDefault();this.props.onFilterChange(filter)}}>
                {name}
            </button>
        )
    }
    render() {
        return (
            <div>
            	<br/>
                {this.renderFilter('SHOW_ALL', '全部')}
                <br/>
                {this.renderFilter('SHOW_COMPLETED', '已完成')}
                <br/>
                {this.renderFilter('SHOW_ACTIVE', '未完成')}
            </div>
        );
    }
}

class ReduxTodo extends Component {
	static propTypes = {
		visibleTodos: React.PropTypes.arrayOf(
				React.PropTypes.shape({
					text: React.PropTypes.string.isRequired,
					completed : React.PropTypes.bool.isRequired
				})
			),
		visibilityFilter: React.PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
	}

	render() {
		const {dispatch, visibleTodos, visibilityFilter } = this.props;
		return (
			<div>
				<AddTodo onAddClick={ text => dispatch(addTodo(text)) } />
				<TodoList todos={this.props.visibleTodos} onTodoClick= { index => dispatch(completeTodo(index)) } />
				<TodoFilter filter={visibilityFilter} onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))} />
			</div>
		);
	}
};

const selectTodos = (todos, filter) => {
	switch(filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
	}
};

const select = (state) => {
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter	
	}
};

export default connect(select)(ReduxTodo);