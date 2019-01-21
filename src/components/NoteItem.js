import React, {Component} from 'react'
import { Menu, Label } from 'semantic-ui-react'
const moment = require('moment')

const NoteItem = (props) => {
   
   const convertTime = (datetime) => {
      let m = moment(datetime)
      return m.format("M/D/YY - h:mm a")
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
