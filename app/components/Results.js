import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function ProfileList ({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239,115,115)' size={22}/>
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144,116,255)' size={22}/>
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22}/>
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129,195,245)' size={22}/>
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64,183,95)' size={22}/>
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
  state = {
    winner: null,
    looser: null,
    error: null,
    loading: true
  }
  componentDidMount () {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search)

    battle([ playerOne, playerTwo ])
      .then((players) => {
        this.setState({
          winner: players[0],
          looser: players[1],
          error: null,
          loading: false
        })
      }).catch(({ message }) => {
        this.state = {
          error: message,
          loading: false
        }
      })
  }
  render() {
    const { winner, looser, error, loading } = this.state

    if (loading === true) {
      return <Loading text='Battling'/>
    }

    if (error) {
      return (
        <p className='center-text error'>
          {error}
        </p>
      )
    }

    return (
      <React.Fragment>
        <div className='grid space-around container-sm'>
          <Card 
            header={winner.score === looser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile}/>
          </Card>
          
          <Card 
            header={winner.score === looser.score ? 'Tie' : 'Looser'}
            subheader={`Score: ${looser.score.toLocaleString()}`}
            avatar={looser.profile.avatar_url}
            href={looser.profile.html_url}
            name={looser.profile.login}
          >
            <ProfileList profile={looser.profile}/>
          </Card>
        </div>
        <Link
          to='/battle'
          className='btn btn-dark btn-space'
        >
          Reset
        </Link>
      </React.Fragment>
    )
  }
}