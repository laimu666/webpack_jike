import React from 'react'
import ReactDOM from 'react-dom'
import bgc from './icon.png'
import './search.less'

class Search extends React.Component {
  render () {
    return <div className="search_text">search text
      <img src={bgc} alt="" />
      </div>
  }
}

ReactDOM.render(<Search />, document.getElementById('root'))