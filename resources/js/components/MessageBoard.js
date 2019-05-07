import React, { Component } from 'react';
import { Input } from 'antd';
import { List, Avatar, Button} from 'antd';
import "antd/dist/antd.css";
import axios from 'axios';

const { TextArea } = Input;

class MessageBoard extends React.Component {

	componentWillMount() {
		this.getPosts();
	}

	componentDidMount() {
		Echo.private('new-post').listen('PostCreated', e => {
				if (window.Laravel.user.following.includes(e.post.user_id)) {
					console.log("triggered!");
						this.setState({ posts: [e.post, ...this.state.posts],
							current:false });

				}else (console.log('sorry failure'))

		});
	}

	constructor(props) {
 	super(props);
	 	this.state = {
			posts: [],
			body:'',
	    current: true
		};
	}

	componentDidUpdate() {
    if (this.state.current === false) {
			console.log('new comment arrived!!');
			this.getPosts();
			this.setState({current:true});
    }
  }



	hundleSubmit = (e) =>{
		axios.post("posts", {
            body:this.state.body
        })
        .then(response => {
            this.setState({
            	posts:[response.config.data, ...this.state.posts],
							body:'',
							current:false
      		});
        });
	};

	handleChange = (e) => {
        this.setState({
            body: e.target.value
        });
    }


	getPosts() {
    axios.get("posts").then(response => {
      this.setState({
        posts: [...response.data.posts],
      });
    });
  }

	handleEdit = () => {
        console.log("edit");
    }


    render() {
			const data =[...this.state.posts];
        return (
	      <div className="sample" style={{marginLeft :'5px', marginTop:'20px'}} >
					<List style={{marginLeft :'20px', width:'100%'}}
						itemLayout="horizontal"
						dataSource={data}
						renderItem={(key,value) => (
							<List.Item actions={[<span onClick={this.handleEdit}>edit</span>]}>
								<List.Item.Meta
									avatar={<Avatar>{key.user_id}</Avatar>}
									title={<a href="https://ant.design">{key.created_at}{" "}{key.user_id}</a>}
									description={key.body}
								/>
							</List.Item>)}
					/>
	        <div style={{position: 'relative', bottom:'0px', marginLeft:'20px', width:'100%'}}>
	        <TextArea rows={2} onChange={this.handleChange} value={this.state.body}/>
	        <Button onClick={this.hundleSubmit}>Post</Button>
	        <span>  Laravel, react, ant-design, and es6</span>
	        </div>
	      </div>
        );
    }
}

export default MessageBoard;
