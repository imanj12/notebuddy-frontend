import React, {Component} from 'react'
import ReactQuill from 'react-quill'

class Editor extends Component {
   constructor(props) {
      super(props)
      this.state = { text: '' } // can also pass a Quill Delta here
   }

   handleChange = (value) => {
      this.setState({ text: value })
   }

   render() {
      return (
         <ReactQuill value={this.state.text}
                     onChange={this.handleChange} />
      )
   }
}

export default Editor
