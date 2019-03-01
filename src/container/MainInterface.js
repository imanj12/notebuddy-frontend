import React, {Component, Fragment} from 'react'
import {Grid, Container} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import NotesContainer from './NotesContainer'
import Editor from '../components/Editor'
import TagSelector from '../components/TagSelector'
import NotesSearch from '../components/NotesSearch'
import { URL } from '../constants/constants'
const Cookies = require('cookies-js')

class MainInterface extends Component {
   constructor(props) {
      super(props)
      this.state = {
         activeNote: null,
         currentValues: [],
         notesSearch: '',
         activeTag: null,
         createdTags: [],
         saving: false,
         currentLocation: '',
         saved: true
      }
      this.geoIpLookup()
   }

   addToCreatedTags = (tagObj) => {
      this.setState({
         createdTags: [...this.state.createdTags, {id: tagObj.tag_id, name: tagObj.tag_name}]
      })
   }

   // determine which note the  UI editor is displaying (props for Editor)
   // if null, UI editor window will be blank
   setActiveNote = (noteId) => {
      this.setState({activeNote: noteId})
   }

   // provide users' tags to select from, for input box in TagSelector
   provideAllTags = () => {
      let options = []
      this.props.user.tags.forEach(tag => options.push({ key: `${tag.id}`, text: `${tag.name}`, value: `${tag.name}` }))
      return options
   }

   // provide current tags of note in state.activeNote to TagSelector
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

   // save note, provided to Editor
   saveNote = (title, content) => {
      // loader showing note is saving
      this.setState({saving: true})
      
      const url = URL + `/notes/${this.state.activeNote}`
      const token = Cookies.get('token')
      
      // create note_tags_attributes for rails db to associate selected tags with note
      // created from both existing tags and new created tags
      const note_tags_attributes = []
      this.state.currentValues.forEach(tagName => {
         let existingTag = this.props.user.tags.find(tag => tag.name === tagName)
         let createdTag = this.state.createdTags.find(tag => tag.name === tagName)
         if (!!existingTag) {
            note_tags_attributes.push({tag_id: existingTag.id})
         } else if (!!createdTag) {
            note_tags_attributes.push({tag_id: createdTag.id})
         }
      })
      
      // fetch payload 
      const data = {note: {
         title: title.trim(),
         user_id: this.props.user.id,
         content: content,
         location: this.state.currentLocation,
         note_tags_attributes: note_tags_attributes
      }}
      
      // fetch parameters
      const fetchParams = {
         method: 'PUT',
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            this.props.fetchUser()
            setInterval(() => {
               // clear loading indicator
               this.setState({saving: false})
               this.setSaved(true)
            }, 1500)
         })
   }

   // delete note in backend, then reset UI editor window so blank
   deleteNote = () => {
      const url = URL + `/notes/${this.state.activeNote}`
      const token = Cookies.get('token')
      const fetchParams = {
         method: 'DELETE',
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         }
      }
      fetch(url, fetchParams)
         .then(() => this.props.fetchUser())
         .then(() => this.setState({activeNote: null}))   
   }

   // display whether note is saved or unsaved (i.e. have any changes been made since last successful save fetch)
   setSaved = (boolean) => {
      this.setState({saved: boolean})
   }

   // reverse lookup of user's IP to show where they were when they last saved the note
   // this is very fuzzy, and relies on given IP being geo-accurate...looking at you T-Mobile
   geoIpLookup = () => {
      fetch('https://geoip-db.com/json/')
         .then(r => r.json())
         .then(data => {
            this.setState({currentLocation: `${data.city}, ${data.state}, ${data.country_code}`}) 
         })
   }

   // sets the chosen tag from left navbar so that the notes container/list of notes is updated to show only notes from this tag
   setActiveTag = (tagName) => {
      this.setState({activeTag: tagName})
   }

   // filters the NotesContainer to only show notes either of the selected tag (this.state.activeTag), or from input in NotesSearch
   notesContainerFilter = () => {
      if (this.state.activeTag) {
         // eslint-disable-next-line
         return this.props.user.tags.find(tag => tag.name == this.state.activeTag)
            .notes
            .filter(note => (         
               note.title.toLowerCase().includes(this.state.notesSearch) || note.content.includes(this.state.notesSearch)
            ))
            .sort(function (a,b) {
               return new Date(a.updated_at) - new Date(b.updated_at)
            })
      } else {
         return this.props.user.notes.filter(note => (         
            note.title.toLowerCase().includes(this.state.notesSearch) || note.content.includes(this.state.notesSearch)
         ))
            .sort(function (a,b) {
               return new Date(a.updated_at) - new Date(b.updated_at)
            })
      }
   }

   // handle notes search input change
   onNotesSearchChange = (e, data) => {
      this.setState({notesSearch: data.value})
   }

   // clear notes search input
   clearNotesSearch = () => {
      this.setState({notesSearch: ''})
   }

   render() {
      return (
         <Grid columns={3} className='height-94'>
            
            {/* column 1: left side navigation bar/menu */}
            <Grid.Column width={1} id='side-menu-column'>
               <SideMenu 
                  user={this.props.user} 
                  fetchUser={this.props.fetchUser} 
                  setActiveNote={this.setActiveNote} 
                  handleTagClick={this.setActiveTag}
                  setActiveTag={this.setActiveTag}
                  clearNotesSearch={this.clearNotesSearch}
               />
            </Grid.Column>
            
            {/* column 2: search and notes container */}
            <Grid.Column width={3}>
               <NotesSearch 
                  onNotesSearchChange={this.onNotesSearchChange} 
                  notesSearch={this.state.notesSearch}
                  activeTag={this.state.activeTag}
               />
               <NotesContainer notes={this.notesContainerFilter()} setActiveNote={this.setActiveNote}/>
            </Grid.Column>
            
            {/* column 3: editor and tags */}
            {/* to-do: good use case for Redux */}
            <Grid.Column width={12} verticalAlign={this.state.activeNote ? 'top' : 'middle'}>
               
               {/* render note/editor UI for state.activeNote, or show placeholder graphic asking user to select or create a note if no state.activeNote */}
               {this.state.activeNote ? (
                  <Fragment key={this.state.activeNote}>
                     
                     {/* rich text editor and UI for currently active note */}
                     <Editor 
                        // eslint-disable-next-line
                        note={this.props.user.notes.find(note => note.id == this.state.activeNote)}
                        userId={this.props.user.id}
                        fetchUser={this.props.fetchUser}
                        saveNote={this.saveNote}
                        deleteNote={this.deleteNote}
                        saving={this.state.saving}
                        saved={this.state.saved}
                        setSaved={this.setSaved}
                        />
                     
                     {/* Tag creation and selection interface for currently active note */}
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
                  // placeholder images when editor UI is not visible
                  <Container id='editor-placeholder' textAlign='center'>
                     <img className='editor-placeholder-pic' src={require('../imgs/to-do.png')} alt='to-do'></img>
                     <img className='editor-placeholder-pic' src={require('../imgs/note.png')} alt='note'></img>
                     <img className='editor-placeholder-pic' src={require('../imgs/notebook.png')} alt='notebook'></img>
                     <h1>Select or create a note to the left</h1>
                  </Container>
               )}
            </Grid.Column>
         </Grid>
      )
   }
}

export default withRouter(MainInterface)
