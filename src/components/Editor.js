import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Header, Segment, Button, Icon, Input} from 'semantic-ui-react'
const Cookies = require('cookies-js')

class Editor extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         text: props.note.content, 
         title: props.note.title 
      }
   }

   handleQuillChange = (value) => {
      this.setState({...this.state, text: value })
   }

   handleTitleChange = (e) => {
      this.setState({...this.state, title: e.target.value})
   }

   saveNote = () => {
      const url = `http://localhost:3000/api/v1/notes/${this.props.note.id}`
      const token = Cookies.get('token')
      const data = {note: {
         title: this.state.title,
         user_id: this.props.userId,
         content: this.state.text
      }}
      const fetchParams = {
         method: 'PATCH',
         headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => {
            console.log(data)
            this.props.fetchUser()
         })
   }

   render() {
      return ( 
         <Fragment>
            <Segment basic>
               <Input value={this.state.title} onChange={this.handleTitleChange}></Input>
               <Button circular icon color='teal' onClick={this.saveNote}><Icon name='save'/></Button>
               {/* <Button circular icon color='red'><Icon name='delete'/></Button> */}
            </Segment>
            <Segment basic>
               <ReactQuill 
                  value={this.state.text}
                  onChange={this.handleQuillChange}
               />
            </Segment>
         </Fragment>
      )
   }
}

export default Editor
