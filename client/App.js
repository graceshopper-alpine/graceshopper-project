import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const App = () => {

  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.id)

  useEffect(() => {

    // if there is no session id in local storage, create one and save ID to redux store. 
    // if there is a session id in local storage, update it so it points to the current user.
    // run this function on page load and when the userId changes (when user logs in)
    const sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      const createSession = async () => {
        const res = await axios.post('/api/sessions/create', {
          'userId': userId
        });
        localStorage.setItem('session_id', res.data.id)
        dispatch({
          type: 'main/setSessionId',
          payload: res.data.id
        })
      }
      createSession();
    }
    
    else if (sessionId) {
      const updateSession = async () => {
        console.log('updating session')
        const res = await axios.put ('/api/sessions/update', {
          'id': sessionId,
          'userId': userId
        })
      }
      updateSession();
    }

  }, [dispatch, userId])


  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
