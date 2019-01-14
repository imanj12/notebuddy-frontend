import React, {Component, Fragment} from 'react'
import {Segment} from 'semantic-ui-react'

class NotesContainer extends Component {
   

   render() {
      return (
         <Fragment>
            <Segment.Group>
               {this.props.user.notes.map((note, i) => <Segment key={i} note={note}>{note.title}</Segment>)}
            </Segment.Group>
         </Fragment>
      )
   }
}

export default NotesContainer
