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
   }

   modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
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
            <div id='editor-header'>
               <Input size='huge' value={this.state.title} onChange={this.handleTitleChange}></Input>
               <Button circular icon color='teal' onClick={this.handleNoteSubmit}><Icon name='save'/></Button>
               <Button circular icon color='red' onClick={this.handleNoteDelete}><Icon name='delete'/></Button>
               {this.props.saving ? <Loader inline active/> : null}
               <Container fluid>
                  <br/>
                  <p className='greyed-text'>
                     <strong>Created:</strong> {this.convertTime(this.props.note.created_at)}
                     <br/>
                     <strong>Last updated:</strong> {this.convertTime(this.props.note.updated_at)} <strong>near</strong> {this.props.note.location}
                  </p>
               </Container>
            </div>
            <Segment basic>
               <ReactQuill 
                  value={this.state.content}
                  onChange={this.handleQuillChange}
                  modules={this.modules}
                  formats={this.formats}
               >
               </ReactQuill>
            </Segment>
         </Fragment>
      )
   }
}

export default Editor
