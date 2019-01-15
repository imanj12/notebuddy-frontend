import React, {Component} from 'react'
import {Segment, Dropdown} from 'semantic-ui-react'

class TagSelector extends Component {
   constructor(props) {
      super(props)
      this.state = { 
         options: props.allTags,
         currentValues: props.assignedTags
      }
   }
   
   handleAddition = (e, { value }) => {
      this.setState({
         options: [{ text: value, value }, ...this.state.options],
      })
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
