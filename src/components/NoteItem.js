import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react';

class NoteItem extends Component {
   
   render() {
      return (
         <Menu.Item 
            name={this.props.note.id.toString()}
            active={this.props.activeItem === this.props.note.id.toString()} 
            onClick={this.props.handleItemClick}
         >
            {this.props.note.title}
         </Menu.Item>
      )
   }
}

export default NoteItem
