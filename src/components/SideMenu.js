import React, {Component} from 'react'
import { Menu, Icon, Popup, Form } from 'semantic-ui-react'
const Cookies = require('cookies-js')

class SideMenu extends Component {
	state = { 
		newNoteIsOpen: false,
		tagsIsOpen: false,
		title: ''
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleItemClick = (e, { name }) => {
		name === 'new-note' && this.setState({newNoteIsOpen: !this.state.newNoteIsOpen})
		name === 'tags' && this.setState({tagsIsOpen: !this.state.tagsIsOpen})
	}

	handleSubmit = (e) => {
		this.setState({newNoteIsOpen: false})
		const url = 'http://localhost:3000/api/v1/notes'
		const token = Cookies.get('token')
		const data = {note: {
			title: this.state.title,
			user_id: this.props.user.id,
			content: ''
		}}
		const fetchParams = {
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
				'Authorization':`Bearer ${token}`
			},
			body: JSON.stringify(data)
		}
		this.setState({title: ''})
		fetch(url, fetchParams)
			.then(() => this.props.fetchUser())
	}

	render() {
		// const { activeItem } = this.state

		return (
			<Menu fluid secondary icon='labeled' vertical>
				<Popup
					on='click'
					position='top right'
					open={this.state.newNoteIsOpen}
					trigger={
						<Menu.Item 
							name='new-note' 
							onClick={this.handleItemClick}
						>
							<Icon name='add' />
							New
						</Menu.Item>
					}
					content={
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Input name='title' value={this.state.title} placeholder='Title' onChange={this.handleChange} />
								<Form.Button icon><Icon name='add' /></Form.Button>
							</Form.Group>
						</Form>
					}
				/>
				<Menu.Item
					name='notes'
					// onClick={this.handleItemClick}
				>
					<Icon name='sticky note' />
					Notes
				</Menu.Item>
				
				<Popup
					on='click'
					position='top right'
					open={this.state.tagsIsOpen}
					trigger={
						<Menu.Item
							name='tags'
							onClick={this.handleItemClick}
						>
							<Icon name='tags' />
							Tags
						</Menu.Item>
					}
					content={
						'Content here all the time'
					}
				/>
			</Menu>
		)
   }
}

export default SideMenu
