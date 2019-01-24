import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Segment, Button, Icon, Input, Loader, Container, Modal, Header} from 'semantic-ui-react'
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
               <Button id='save-btn' circular icon onClick={this.handleNoteSubmit}><Icon name='save' inverted size='large'/></Button>
               <Modal 
                  basic 
                  size='small'
                  trigger={<Button id='delete-btn' circular icon color='red' onClick={this.handleNoteDelete}><Icon name='delete' color='red' size='large'/></Button>}>
                  <Header icon='archive' content='Archive Old Messages' />
                  <Modal.Content>
                     <p>
                     Your inbox is getting full, would you like us to enable automatic archiving of old messages?
                     </p>
                  </Modal.Content>
                  <Modal.Actions>
                     <Button basic color='red' inverted>
                     <Icon name='remove' /> No
                     </Button>
                     <Button color='green' inverted>
                     <Icon name='checkmark' /> Yes
                     </Button>
                  </Modal.Actions>
               </Modal>
               {this.props.saving ? <Loader id='loader' inline active inverted/> : null}
               <Container fluid>
                  <br/>
                  <p>
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
