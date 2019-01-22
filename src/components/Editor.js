import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Segment, Button, Icon, Input, Loader} from 'semantic-ui-react'

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
