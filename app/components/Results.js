import React from 'react'
import PropTypes from 'prop-types'

export default class Results extends React.Component {
  render() {
    return (
      <div>
        RESULTS
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}