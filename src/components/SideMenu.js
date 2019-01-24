import React, {Component} from 'react'
import { Menu, Icon, Popup, Form } from 'semantic-ui-react'
import SideMenuTagsContainer from '../container/SideMenuTagsContainer'
import TagsSearch from './TagsSearch'
const Cookies = require('cookies-js')

class SideMenu extends Component {
	state = { 
		newNoteIsOpen: false,
		tagsIsOpen: false,
		newNoteValue: '',
		tagSearchValue: ''
	}

	// handle new note input
	handleChange = (e) => {
		this.setState({newNoteValue: e.target.value})
	}

	// handle opening and closing of popups on icon click
	handleItemClick = (e, { name }) => {
		name === 'new-note' && this.setState({newNoteIsOpen: !this.state.newNoteIsOpen, newNoteValue: '', tagsIsOpen: false})
		name === 'tags' && this.setState({tagsIsOpen: !this.state.tagsIsOpen, tagSearchValue: '', newNoteIsOpen: false})
		name === 'notes' && this.props.setActiveTag(null)
		name === 'notes' && this.props.clearNotesSearch()
		name === 'notes' && this.setState({newNoteIsOpen: false, tagsIsOpen: false})
	}

	// handle new note submit (closes popup and posts to /notes)
	handleSubmit = (e) => {
		this.setState({newNoteIsOpen: false})
		const url = 'http://localhost:3000/api/v1/notes'
		const token = Cookies.get('token')
		const data = {note: {
			title: this.state.newNoteValue.trim(),
			user_id: this.props.user.id,
			content: '',
			location: ''
		}}
		const fetchParams = {
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
				'Authorization':`Bearer ${token}`
			},
			body: JSON.stringify(data)
		}
		this.setState({newNoteValue: ''})
		fetch(url, fetchParams)
			.then(() => this.props.fetchUser())
	}

	// provide all user's tags to SideMenuTagsContainer.js
	provideTags = () => {
		return this.props.user.tags.filter(tag => tag.name.includes(this.state.tagSearchValue))
	}

	// close popup on tag click and provide tag name to state.activeTag in MainInterface.js
	handleTagClick = (e) => {
		this.setState({tagsIsOpen: !this.state.tagsIsOpen})
		this.setState({tagSearchValue: ''})
		this.props.handleTagClick(e.target.name)
	}

	onTagSearchChange = (e, data) => {
		this.setState({tagSearchValue: data.value})
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
							<Icon name='add' inverted/>
							<span className='side-menu-icon-text'>New</span>
						</Menu.Item>
					}
					content={
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Input name='newNoteValue' value={this.state.newNoteValue} placeholder='Title' onChange={this.handleChange} />
								<Form.Button icon><Icon name='add' /></Form.Button>
							</Form.Group>
						</Form>
					}
				/>
				<Menu.Item
					name='notes'
					onClick={this.handleItemClick}
				>
					<Icon name='sticky note' inverted/>
					<span className='side-menu-icon-text'>All Notes</span>
				</Menu.Item>
				
				<Popup
					on='click'
					position='top right'
					wide
					open={this.state.tagsIsOpen}
					trigger={
						<Menu.Item
							name='tags'
							onClick={this.handleItemClick}
						>
							<Icon name='tags' inverted/>
							<span className='side-menu-icon-text'>Tags</span>
						</Menu.Item>
					}
					content={
						<>
							<TagsSearch 
								tagSearchValue={this.state.tagSearchValue}
								onTagSearchChange={this.onTagSearchChange}	
								/>
							<SideMenuTagsContainer 
								tags={this.provideTags()} 
								handleTagClick={this.handleTagClick}/>
						</>
					}
				/>
			</Menu>
		)
   }
}

export default SideMenu
