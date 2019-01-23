import React from 'react'
import {Input} from 'semantic-ui-react'

const NotesSearch = (props) => {
      return (
         <Input
            fluid
            error={false} // make this dynamic when no notes found in search
            placeholder={props.activeTag ? `Search ${props.activeTag}...` : "Search notes..."}
            onChange={props.onNotesSearchChange}
            value={props.notesSearch}
         >
            <input id='notes-search' style={{borderRadius: '25px'}}/>
         </Input>
      )
}

export default NotesSearch
