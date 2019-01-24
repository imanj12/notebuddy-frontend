import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Segment, Button, Icon, Input, Loader, Container, Modal, Header} from 'semantic-ui-react'
const Moment = require('moment')

class Editor extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         content: props.note.content, 
         title: props.note.title,
         deleteModalOpen: false,
      }
      console.log('constructed')
   }

   componentDidUpdate = () => {
      if (this.props.saved === true && ( (this.props.note.content !== this.state.content) || (this.props.note.title !== this.state.title) )) {
         this.props.setSaved(false)
      }

      // if (this.props.saved === true && prevProps.saved !== true) {
      //    this.setState({saved: true})
      // }
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
         ['clean'],
      ],
      clipboard: {
         matchVisual: false,
      }
   }

   formats = [
      'font',
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
      'script',
      'color', 'background',
      'align',
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
      this.handleModalClose()
      this.props.deleteNote()
   }

   convertTime = (datetime) => {
      return Moment(datetime).format("M/D/YY - h:mma")
   }

   handleModalClose = () => {
      this.setState({deleteModalOpen: false})
   }

   handleModalOpen = () => {
      this.setState({deleteModalOpen: true})
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
                  trigger={<Button id='delete-btn' circular icon color='red' onClick={this.handleModalOpen}><Icon name='delete' color='red' size='large'/></Button>}
                  open={this.state.deleteModalOpen}
                  onClose={this.handleModalClose}
                  >
                  <Header as='h1' icon='trash alternate' content='Delete?' />
                  <Modal.Content>
                     <h3>Are you sure you want to delete this note?</h3>
                  </Modal.Content>
                  <Modal.Actions>
                     <Button basic color='green' inverted onClick={this.handleModalClose}>
                        <Icon name='remove' /> No
                     </Button>
                     <Button color='red' inverted onClick={this.handleNoteDelete}>
                        <Icon name='checkmark' /> Yes
                     </Button>
                  </Modal.Actions>
               </Modal>
               {this.props.saving ? <Loader id='loader' inline active inverted/> : null}
               {this.props.saved ? <strong className='save-text'>saved</strong> : <strong className='save-text'>unsaved</strong>}
               <Container fluid className='editor-metadata'>
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
