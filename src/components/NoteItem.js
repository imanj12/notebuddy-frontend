import React from 'react'
import { Menu } from 'semantic-ui-react'
const moment = require('moment')

const NoteItem = (props) => {
   
   const convertTime = (datetime) => {
      return moment(datetime).format("M/D/YY - h:mma")
   }

   return (
      <Menu.Item 
         name={props.note.id.toString()}
         active={props.activeItem === props.note.id.toString()} 
         onClick={props.handleItemClick}
      >
         <Menu.Header>
            {props.note.title}
         </Menu.Header>   
         <Menu.Menu>
            <Menu.Item>
            {convertTime(props.note.updated_at)}
            </Menu.Item>
         </Menu.Menu>         
      </Menu.Item>
   )
}

export default NoteItem
