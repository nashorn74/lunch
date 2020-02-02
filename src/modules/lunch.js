import { combineReducers } from 'redux'
import * as api from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_PEOPLE = 'FETCH_PEOPLE'
export const DELETE_PEOPLE = 'DELETE_PEOPLE'
export const ADD_PEOPLE = 'ADD_PEOPLE'
export const FETCH_GROUP = 'FETCH_GROUP'

// ------------------------------------
// Actions
// ------------------------------------

function setPeopleData (data) {
  return {
    type: FETCH_PEOPLE,
    payload: data
  };
}

function deletePeopleData (data) {
  return {
    type: DELETE_PEOPLE,
    payload: data
  };
}

function addPeopleData (data) {
  return {
    type: ADD_PEOPLE,
    payload: data
  };
}

function createGroupData (data) {
  return {
    type: FETCH_GROUP,
    payload: data
  };
}

export const fetchPeople = () => {
  return (dispatch, getState) => {
    api.fetchPeople(dispatch, setPeopleData)
  }
}

export const deletePeople = (name) => {
  return (dispatch) => {
    api.deletePeople(name, dispatch, deletePeopleData)
  }
}

export const addPeople = (name) => {
  return (dispatch) => {
    api.addPeople(name, dispatch, addPeopleData)
  }
}

export const createGroup = (count, min) => {
  return (dispatch) => {
    api.createGroup(count, min, dispatch, createGroupData)
  }  
}

export const actions = {

}

// ------------------------------------
// Reducer
// ------------------------------------

function people (state = [], action) {
  switch (action.type) {
    case FETCH_PEOPLE:
    	return action.payload
    case DELETE_PEOPLE:
      if (action.payload.success) {
        return action.payload.results
      } else {
        return state
      }    
    case ADD_PEOPLE:
      if (action.payload.success) {
        return action.payload.results
      } else {
        return state
      }      
    default:
      return state
  }
}

function group (state = [], action) {
  switch (action.type) {
    case FETCH_GROUP:
      if (action.payload.success) {
        return action.payload.result
      } else {
        return []
      }      
    default:
      return state
  }
}

const lunchReducer = combineReducers({
  people,
  group
})

export const getPeople = state => state.lunch.people
export const getGroup = state => state.lunch.group

export default lunchReducer
