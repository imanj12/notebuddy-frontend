import React from 'react'
import SideMenuTag from '../components/SideMenuTag'

const SideMenuTagsContainer = (props) => {

   return (
      props.tags.map(tag => <SideMenuTag key={tag.id} tag={tag} handleTagClick={props.handleTagClick}/>)
   )
}

export default SideMenuTagsContainer
