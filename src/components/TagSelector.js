import React, {Component} from 'react'
import {Segment, Dropdown} from 'semantic-ui-react'
import { URL } from '../constants/constants'
const Cookies = require('cookies-js')

class TagSelector extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         options: props.allTags,
         currentValues: props.assignedTags      
      }
      props.setCurrentValues(this.state.currentValues)
   }
   
   handleAddition = (e, { value }) => {
      console.log('handle addition value:')
      value = value.trim()
      // this.props.setSaved(false)
      console.log(value)
      if (!this.state.options.find(option => option.value === value)) {
         this.setState({
            options: [...this.state.options, { text: value, value }],
         })
         this.createTagFetch(value)
      }
   }

   createTagFetch = (tagName) => {
      // const url = 'http://localhost:3000/api/v1/tags'
      const url = URL + '/tags'
      const data = {tag: {name: tagName, user_id: this.props.user.id}}
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
         .then(data => {
            console.log('new tag:')
            console.log(data)
            // this.props.fetchUser()
            this.props.addToCreatedTags({tag_id: data.id, tag_name: data.name})
         })
   }

   handleChange = (e, { value }) => {
      if (value.length > 0) {
         value[value.length - 1] = value[value.length - 1].trim()
      } 
      console.log('handle change value:')
      console.log(value)
      // this.props.setSaved(false)
      this.setState({ 
         currentValues: value
      }, () => {
         this.props.setCurrentValues(this.state.currentValues)
      })
   }

   render() {
      return (
         <Segment basic>
            <h2 className='editor-metadata'>Tags</h2>
            <Dropdown 
               options={this.state.options}
               placeholder='Start typing...'
               fluid
               search
               selection
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
