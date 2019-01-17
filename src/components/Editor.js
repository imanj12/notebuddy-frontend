import React, {Component, Fragment} from 'react'
import ReactQuill from 'react-quill'
import {Segment, Button, Icon, Input} from 'semantic-ui-react'

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
