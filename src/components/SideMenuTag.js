import React from 'react'
import {Label} from 'semantic-ui-react'

const SideMenuTag = (props) => {
   const divStyle = {
      float: 'left',
      padding: '5px 5px 5px 5px'
   }

   return (
      <div style={divStyle}>
         <Label as='a' tag
            name={props.tag.name}
            content={props.tag.name}
            onClick={props.handleTagClick}
         />
      </div>  
   )
}

export default SideMenuTag
