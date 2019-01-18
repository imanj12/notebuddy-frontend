import React, {Component, Fragment} from 'react'
import { Menu} from 'semantic-ui-react'
import NoteItem from '../components/NoteItem'

class NotesContainer extends Component {
   state = { activeItem: '' }

   handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name })
      this.props.setActiveNote(name)
   }

   render() {
      return (
         <Fragment>
            <Menu vertical fluid pointing borderless size='massive'>
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
