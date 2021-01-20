import React from 'react'
import PropTypes from 'prop-types'
import { battle } from '../utils/api'

export default class Results extends React.Component {
  componentDidMount () {
    const { playerOne, playerTwo } = this.props

    battle([ playerOne, playerTwo ])
      .then((players) => {
        console.log('Data:', players)
      })
  }
  render() {
    return (
      <div>
        RESULTS
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}