import React from 'react'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from 'react-icons/fa'
import Card from './Card'

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      looser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount () {
    const { playerOne, playerTwo } = this.props

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
      return <p>LOADING</p>
    }

    if (error) {
      return (
        <p className='center-text error'>
          {error}
        </p>
      )
    }

    return (
      <div className='grid space-around container-sm'>
        <Card 
          header={winner.score === looser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239,115,115)' size={22}/>
              {winner.profile.name}
            </li>
            {winner.profile.location && (
              <li>
                <FaCompass color='rgb(144,116,255)' size={22}/>
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22}/>
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129,195,245)' size={22}/>
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64,183,95)' size={22}/>
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
        
        <Card 
          header={winner.score === looser.score ? 'Tie' : 'Looser'}
          subheader={`Score: ${looser.score.toLocaleString()}`}
          avatar={looser.profile.avatar_url}
          href={looser.profile.html_url}
          name={looser.profile.login}
        >
          <ul className='card-list'>
            <li>
              <FaUser color='rgb(239,115,115)' size={22}/>
              {looser.profile.name}
            </li>
            {looser.profile.location && (
              <li>
                <FaCompass color='rgb(144,116,255)' size={22}/>
                {looser.profile.location}
              </li>
            )}
            {looser.profile.company && (
              <li>
                <FaBriefcase color='#795548' size={22}/>
                {looser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color='rgb(129,195,245)' size={22}/>
              {looser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color='rgb(64,183,95)' size={22}/>
              {looser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </Card>
      </div>
    )
  }
}