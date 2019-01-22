import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Segment, Button, Icon, Input, Loader, Container} from 'semantic-ui-react'
const Moment = require('moment')

class Editor extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         content: props.note.content, 
         title: props.note.title
      }
      console.log(props.note)
   }

   modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
   }

   formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
   ]

   handleQuillChange = (value) => {
      this.setState({...this.state, content: value })
   }

   handleTitleChange = (e) => {
      this.setState({...this.state, title: e.target.value})
   }

   handleNoteSubmit = () => {
      this.props.saveNote(this.state.title, this.state.content)
   }

   handleNoteDelete = () => {
      this.props.deleteNote()
   }

   convertTime = (datetime) => {
      return Moment(datetime).format("M/D/YY - h:mma")
   }

   render() {
      return ( 
         <Fragment>
            <Segment basic>
               <Button circular icon color='teal' onClick={this.handleNoteSubmit}><Icon name='save'/></Button>
               <Button circular icon color='red' onClick={this.handleNoteDelete}><Icon name='delete'/></Button>
               {this.props.saving ? <Loader inline active/> : null}
            </Segment>
            <Segment basic>
               <Input size='huge' value={this.state.title} onChange={this.handleTitleChange}></Input>
               <Container fluid>
                  <p className='greyed-text'>Created on: {this.convertTime(this.props.note.created_at)}
                     <br/>
                     Last updated: {this.convertTime(this.props.note.updated_at)}
                     <br/>
                     at or around: {this.props.note.location}
                  </p>
               </Container>
            </Segment>
            <Segment basic>
               <div className='editor-container'>
               <ReactQuill 
                  value={this.state.content}
                  onChange={this.handleQuillChange}
                  modules={this.modules}
                  formats={this.formats}
               >
                  {/* <div className='editing-area'/> */}
               </ReactQuill>
               </div>
            </Segment>
         </Fragment>
      )
   }
}

export default Editor
