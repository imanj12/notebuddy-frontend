import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Header, Segment, Button, Icon, Input} from 'semantic-ui-react'
const Cookies = require('cookies-js')

class Editor extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         content: props.note.content, 
         title: props.note.title 
      }
   }

   handleQuillChange = (value) => {
      this.setState({...this.state, content: value })
   }

   handleTitleChange = (e) => {
      this.setState({...this.state, title: e.target.value})
   }

   handleNoteSubmit = () => {
      this.props.saveNote(this.state.title, this.state.content)
   }

   // saveNote = () => {
   //    const url = `http://localhost:3000/api/v1/notes/${this.props.note.id}`
   //    const token = Cookies.get('token')
   //    const data = {note: {
   //       title: this.state.title,
   //       user_id: this.props.userId,
   //       content: this.state.text
   //       //note_tags_attributes: [
   //          //{tag_id: }
   //       //]
   //    }}
   //    const fetchParams = {
   //       method: 'PUT',
   //       headers: {
   //          'Content-Type':'application/json',
   //          'Authorization':`Bearer ${token}`
   //       },
   //       body: JSON.stringify(data)
   //    }
   //    fetch(url, fetchParams)
   //       .then(r => r.json())
   //       .then(data => {
   //          this.props.fetchUser()
   //       })
   // }

   render() {
      return ( 
         <Fragment>
            <Segment basic>
               <Button circular icon color='teal' onClick={this.handleNoteSubmit}><Icon name='save'/></Button>
            </Segment>
            <Segment basic>
               <Input size='huge' value={this.state.title} onChange={this.handleTitleChange}></Input>
               {/* <Button circular icon color='red'><Icon name='delete'/></Button> */}
            </Segment>
            <Segment basic>
               <ReactQuill 
                  value={this.state.content}
                  onChange={this.handleQuillChange}
               />
            </Segment>
         </Fragment>
      )
   }
}

export default Editor
