import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  fetchPeople,
  addPeople,
  deletePeople,
  createGroup,
  getPeople,
  getGroup
} from './modules/lunch'

import './App.css'

const mapDispatchToProps = {
  fetchPeople,
  deletePeople,
  createGroup,
  addPeople
}

const mapStateToProps = state => ({
  people: getPeople(state),
  group: getGroup(state)
})

class App extends React.Component {
  static propTypes = {
    people: PropTypes.array.isRequired,
  }

  state = {
    newName: '',
    count: 1,
    min: 1
  }

  onChange = (e) => {
    this.setState({ newName: e.target.value })
  }

  onCountChange = (e) => {
    var count = parseInt(e.target.value)
    if(typeof count === 'number'){
      if(count % 1 === 0){
        if (count === 0) this.setState({ count: 1 })
        else this.setState({ count: count })
      }
    }    
  }

  onMinChange = (e) => {
    var min = parseInt(e.target.value)
    if(typeof min === 'number'){
      if(min % 1 === 0){
        if (min === 0) this.setState({ min: 1 })
        else this.setState({ min: min })
      }
    }
  }

  componentDidMount() {
    this.props.fetchPeople()
  }

  deletePerson = (e) => {
    this.props.deletePeople(e.target.value)
  }

  addPerson = (e) => {
    if (this.state.newName !== '') {
      this.props.addPeople(this.state.newName)
      this.setState({ newName: '' })
    } else {
      alert('이름을 입력하세요.')
    }
  }

  createGroup = (e) => {
    this.props.createGroup(this.state.count, this.state.min)
  }

  render () {
    const {
      people,
      group
    } = this.props
    return (
      <div className='container'>
        <h1>Lunch</h1>
        <h3>People list</h3>
        {people.map(person => <div key={person.name}>{person.name}
        <button onClick={this.deletePerson} value={person.name}>Delete</button>
        </div>)}
        <hr />
        <h3>Add person</h3>
        <input value={this.state.newName} onChange={this.onChange} /><button onClick={this.addPerson}>Add</button>
        <hr />
        <h3>Create lunch group</h3>
        <input value={this.state.count} onChange={this.onCountChange} />
        <input value={this.state.min} onChange={this.onMinChange} />
        <button onClick={this.createGroup}>Create</button>
        {group.map((sub_group,index) => sub_group.map(person => 
          <div key={person}>{index}:{person}</div>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
