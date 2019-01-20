import React, {Component, Fragment} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagSelector from '../components/TagSelector'
import NotesSearch from '../components/NotesSearch'
const Cookies = require('cookies-js')

class MainInterface extends Component {
   constructor(props) {
      super(props)
      this.state = {
         activeNote: null,
         currentValues: [],
         notesSearch: '',
         notesSearchEmpty: false,
         activeTag: null,
         createdTags: []
      }
      // props.fetchUser()
   }

   addToCreatedTags = (tagObj) => {
      this.setState({
         createdTags: [...this.state.createdTags, {id: tagObj.tag_id, name: tagObj.tag_name}]
      })
   }

   // determine which note the editor is displaying (props for Editor)
   setActiveNote = (noteId) => {
      this.setState({activeNote: noteId})
   }

   // provide all users tags to select from in input box in TagSelector
   provideAllTags = () => {
      let options = []
      this.props.user.tags.forEach(tag => options.push({ key: `${tag.id}`, text: `${tag.name}`, value: `${tag.name}` }))
      return options
   }

   // provide current tags of note from state.activeNote to TagSelector
   provideAssignedTags = () => {
      let options = []
      // eslint-disable-next-line
      let note = this.props.user.notes.find(note => note.id == this.state.activeNote)
      note.tags.forEach(tag => options.push(`${tag.name}`))
      return options
   }

   // receive values of tags selected in TagSelector (props for TagSelector)
   setCurrentValues = (valuesArr) => {
      this.setState({currentValues: valuesArr})
   }

   saveNote = (title, content) => {
      const url = `http://localhost:3000/api/v1/notes/${this.state.activeNote}`
      const token = Cookies.get('token')
      const note_tags_attributes = []
      // this.props.user.tags.forEach(tag => {
      //    if (this.state.currentValues.includes(tag.name)) {
      //       note_tags_attributes.push({tag_id: tag.id})
      //    }
      // })
      this.state.currentValues.forEach(tagName => {
         const existingTag = this.props.user.tags.find(tag => tag.name === tagName)
         const createdTag = this.state.createdTags.find(tag => tag.name === tagName)
         if (!!existingTag) {
            note_tags_attributes.push({tag_id: existingTag.id})
         } else if (!!createdTag) {
            note_tags_attributes.push({tag_id: createdTag.id})
         }
      })
      const data = {note: {
         title: title,
         user_id: this.props.user.id,
         content: content,
         note_tags_attributes: note_tags_attributes
      }}
      const fetchParams = {
         method: 'PUT',
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
      console.log('pre-fetch:')
      console.log(data)
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            console.log('post-fetch:')
            console.log(data)
            this.props.fetchUser()
         })
   }

   createTagFetch = (tagName) => {
      const url = 'http://localhost:3000/api/v1/tags'
      const data = {tag: {name: tagName, user_id: this.props.user.id}}
      const token = Cookies.get('token')
      const fetchParams = {
         method: "POST",
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            console.log('new tag:')
            console.log(data)
            return data.id
            // push to array of {tag_id: id, tag_name: name}
         })
   }

   setActiveTag = (tagName) => {
      this.setState({activeTag: tagName})
	}

   notesContainerFilter = () => {
      if (this.state.activeTag) {
         // eslint-disable-next-line
         return this.props.user.tags.find(tag => tag.name == this.state.activeTag)
            .notes
            .filter(note => (         
               note.title.toLowerCase().includes(this.state.notesSearch) || note.content.includes(this.state.notesSearch)
            ))
      } else {
         return this.props.user.notes.filter(note => (         
            note.title.toLowerCase().includes(this.state.notesSearch) || note.content.includes(this.state.notesSearch)
         ))
      }
      // this.props.user.notes.filter(note => (         
      //    note.title.toLowerCase().includes(this.state.notesSearch) || note.content.includes(this.state.notesSearch)
      // ))
   }

   onNotesSearchChange = (e, data) => {
      this.setState({notesSearch: data.value})
   }

   render() {
      return (
         <Grid columns={3}>
            
            {/* column 1: side menu */}
            <Grid.Column width={1}>
               <SideMenu 
                  user={this.props.user} 
                  fetchUser={this.props.fetchUser} 
                  setActiveNote={this.setActiveNote} 
                  handleTagClick={this.setActiveTag}
                  setActiveTag={this.setActiveTag}
               />
            </Grid.Column>
            
            {/* column 2: search and notes container */}
            <Grid.Column width={3}>
               <NotesSearch 
                  onNotesSearchChange={this.onNotesSearchChange} 
                  notesSearch={this.state.notesSearch} 
                  searchEmpty={this.state.notesSearchEmpty} 
                  activeTag={this.state.activeTag}
               />
               <NotesContainer notes={this.notesContainerFilter()} setActiveNote={this.setActiveNote}/>
            </Grid.Column>
            
            {/* column 3: editor and tags */}
            <Grid.Column width={12}>
               {this.state.activeNote ? (
                  <Fragment key={this.state.activeNote}>
                     <Editor 
                        // eslint-disable-next-line
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        userId={this.props.user.id}
                        fetchUser={this.props.fetchUser}
                        saveNote={this.saveNote}
                        />
                        <TagSelector 
                           user={this.props.user}
                           // eslint-disable-next-line
                           note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                           allTags={this.provideAllTags()}
                           assignedTags={this.provideAssignedTags()}
                           setCurrentValues={this.setCurrentValues}
                           fetchUser={this.props.fetchUser}
                           addToCreatedTags={this.addToCreatedTags}
                        />
                  </Fragment>
               ) : (
                  <Header as='h1' textAlign='center'>Select a note, or create a new one!</Header>
               )}
            </Grid.Column>
         </Grid>
      )
   }
}

export default withRouter(MainInterface)
