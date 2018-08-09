import React from "react";
import './css/addItem.css'

class AddItem extends React.Component {

    handleAdd = (e)=>{
        e.preventDefault(); // 阻止默认事件，表单提交会默认刷新

        // 从input 拿到用户输入的内容, 传出去
        console.log(this.inputNode.value);

        this.props.onInputChange(this.inputNode.value);

        this.inputNode.value = ''
    };

    render(){
        return(
            //使用表单可以使用enter键，并使用onSubmit事件鉴定提交行为，有提交行为后检查form表单里面的字段，并执行后面的
            //handleAdd函数
            <form className='add-item' onSubmit={this.handleAdd}>
                {/*通过ref获取input节点的引用*/}
                {/*将input节点信息传给this中的inputNode*/}
                <input type="text" required ref={(input) => this.inputNode = input}/>
                {/*value用来修改按钮上的显示的文字*/}
                <input type="submit" value="添加"/>
            </form>
        )
    }
}

export default AddItem;