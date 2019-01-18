import React, {Component} from 'react'
import {Input, Segment} from 'semantic-ui-react'

class NotesSearch extends Component {

   render() {
      return (
         <Input
            fluid
            error={false} // make this dynamic
            placeholder="Search notes..."
            onChange={this.props.onNotesSearchChange}
            value={this.props.notesSearch}
         >
            <input style={{borderRadius: '25px'}}/>
         </Input>
      )
   }
}

export default NotesSearch
