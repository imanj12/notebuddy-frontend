import React, {Component} from 'react'
import {Segment, Dropdown} from 'semantic-ui-react'
const Cookies = require('cookies-js')

class TagSelector extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         options: props.allTags,
         currentValues: props.assignedTags,
         createdTagIds: []
      }
   }
   
   handleAddition = (e, { value }) => {
      this.setState({
         options: [{ text: value, value }, ...this.state.options],
      })
      this.createTagFetch(value)
   }

   createTagFetch = (tagName) => {
      const url = 'http://localhost:3000/api/v1/tags'
      const data = {tag: {name: tagName, user_id: this.props.user.id}}
      console.log(data)
      const token = Cookies.get('token')
      const fetchParams = {
         method: "POST",
         headers: {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(data)
      }
      fetch(url, fetchParams)
         .then(r => r.json())
         .then(data => this.state.createdTagIds.push(data.id))
   }

   handleChange = (e, { value }) => this.setState({ currentValues: value })

   render() {

      return (
         <Segment basic>
            <Dropdown 
               options={this.state.options}
               placeholder='Choose Tags'
               search
               selection
               fluid
               multiple
               allowAdditions
               value={this.state.currentValues}
               onAddItem={this.handleAddition}
               onChange={this.handleChange}
            >
            </Dropdown>
         </Segment>
      )
   }
}

export default TagSelector
