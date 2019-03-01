import React from 'react'
import { Menu } from 'semantic-ui-react'
const Moment = require('moment')

const NoteItem = (props) => {
   
   const convertTime = (datetime) => {
      return Moment(datetime).format("M/D/YY - h:mma")
   }

   // show note title and time last updated
   return (
      <div className='note-item'>
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
      </div>
   )
}

export default NoteItem
