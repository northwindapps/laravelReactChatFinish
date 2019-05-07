import React, { Component } from 'react';
import { Button } from 'antd';
import { Menu, Breadcrumb, Icon } from 'antd';
import "antd/dist/antd.css";
import  { BrowserRouter, Route, Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideBar extends React.Component {
	constructor(props) {
 	super(props);
 	this.state = { list:[] };

 	this.handleClick = this.handleClick.bind(this);

	}

  handleClick(e) {
    console.log(this.state.list[e.key]);
    this.setState({
      current: e.key,
    });

		window.location.reload();

  }

  componentWillMount() {
        this.getPosts();
  }

  getPostsTwo() {
        axios.get('posts').then((
            response
        ) =>
            this.setState({
                list: [...response.config.data],
            })

        );
    }


	getPosts() {
	    axios.get('users').then(response => {


        console.log(JSON.stringify(response.data, null, 2));
        this.setState({
          list: [...response.data.users],
        });
      });
  }

    render() {
    	//console.log(this.state.list);
        return (
				<BrowserRouter>
	      <div style={{ height: '100vh'}}>
	        <Menu
	          theme={this.state.theme}
	          onClick={this.handleClick}
	          style={{ width: 256 }}
	          defaultOpenKeys={['sub1']}
	          selectedKeys={[this.state.current]}
	          mode="inline"
	          style={{ height: '100%' }}
	        >

	          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>User-list</span></span>}>
	          {this.state.list.map(function(item, i) {
  				return (<Menu.Item key={i}>
						<Link to={`users/${item}`}>{item}</Link>
					</Menu.Item>)

			  })}
	          </SubMenu>
	        </Menu>
	      </div>
			</BrowserRouter>
        );
    }
}

export default SideBar;
