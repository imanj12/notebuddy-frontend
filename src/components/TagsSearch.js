import React from 'react'
import {Input} from 'semantic-ui-react'

const TagsSearch = (props) => {

   return (
      <Input
         fluid
         error={false} // to-do: make this dynamic when no tags found in search
         placeholder="Search tags..."
         onChange={props.onTagSearchChange}
         value={props.tagSearchValue}
      >
         <input style={{borderRadius: '25px'}}/>
      </Input>
   )
}

export default TagsSearch
