import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './addItem';
import TodoItem from './todoItem';
import './css/index.css'
import About from './about';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


const TODO_KEY = "todos";
class TodoComponent extends React.Component {

    constructor(props) {
        super(props);

        const data = localStorage.getItem(TODO_KEY);

        // 把[]作为默认值
        this.state = {
            todos: JSON.parse(data) || []
        };

    }

    handleAdd = (val)=>{
        console.log(val);
        const todos = this.state.todos;
        todos.push(val);
        this.setState({
            todos
        });

        localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    };
    handleDelete = (index)=>{
        console.log("删除条目: "+index); // 0 => 1,2
        let todos = this.state.todos;
        todos = todos.filter(function (val, i) {
            return index !== i   //true保留；false删除
        });
        console.log(todos);
        this.setState({
            todos
        });

        localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    };
    render(){
        let subTitle = null
        let length = this.state.todos.length;
        if(length % 2 === 0){
            subTitle = <h3>明日复明日, 明日何其多{length}</h3>;
        }else {
            subTitle = <h3>今日事, 今日毕{length}</h3>;
        }

        // 集合的每个元素执行fun函数进行转换, 得到一个新的集合
        // const list = [1, 2, 3].map(function (val, index) {return val * 2});

        const list = this.state.todos.map((val, index) => {
            return <TodoItem key={index} index={index} val={val} onDelete={this.handleDelete}/>;
        });
        console.log(list);

        if(true){
            // return null;
        }
        return(
            <div className='todo-list'>
                <Link to="/about">关于About</Link>

                { this.props.showTitle && <h2>GTD记事本</h2>}

                {subTitle}

                {
                    length === 0 ?
                        (<p>恭喜你, 任务全部完成!</p>) :
                        (<ul>{list}</ul>)
                }

                <AddItem onInputChange={this.handleAdd}/>
            </div>
        )
    }
}

class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Route path="/" exact={true} render={() => <TodoComponent showTitle={true}/>}/>
                    <Route path="/about" component={About}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
