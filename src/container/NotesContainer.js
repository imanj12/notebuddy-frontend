import React, {Component, Fragment} from 'react'
import { Menu} from 'semantic-ui-react'
import NoteItem from '../components/NoteItem'

class NotesContainer extends Component {
   state = { activeItem: '' }

   // sets activeItem property of note when clicked (i.e. gets highlighted and points right)
   // and provides name of active note to state.activeNote in MainInterface.js
   handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
      this.props.setActiveNote(name)
   }

   render() {
      return (
         <Fragment>
            <Menu id='notes-list' vertical fluid pointing borderless size='massive'>
               {this.props.notes.map(note => (
                  <NoteItem 
                     key={note.id} 
                     note={note} 
                     activeItem={this.state.activeItem} 
                     handleItemClick={this.handleItemClick}
                  >                    
                  </NoteItem>
                  )).reverse()
               }
            </Menu>

         </Fragment>
      )
   }
}

export default NotesContainer
