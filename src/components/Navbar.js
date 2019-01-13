import React, {Component} from 'react'
import { Input, Menu } from 'semantic-ui-react'

class Navbar extends Component {
	state = { 
		activeItem: 'home' 
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Menu>
				<Menu.Item name='notebuddy logo' active={activeItem === 'home'} onClick={this.handleItemClick} />
				<Menu.Menu position='right'>
					<Menu.Item>
					<Input icon='search' placeholder='Search...' />
					</Menu.Item>
					<Menu.Item
					name='logout'
					active={activeItem === 'logout'}
					onClick={this.handleItemClick}
					/>
				</Menu.Menu>
			</Menu>
		)
   }
}

export default Navbar
