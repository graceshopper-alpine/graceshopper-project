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
  const cartId = useSelector(state => state.main.cartId)


  useEffect(() => {
    // when the user logs in, set isAdmin to true in redux if needed.
    if (userId) {
      const getUserSetAdmin = async () => {
        const {data} = await axios.get(`/api/users/${userId}`)
          dispatch({
            type: 'main/setAdmin',
            payload: data.isAdmin
          })
      }
      getUserSetAdmin()
    }
  }, [userId])


  useEffect(() => {
    //when the user logs out, reset the cart & cart ID in redux
    if (!userId) {
        dispatch({
          type: 'main/setCart',
          payload: []
        })

        dispatch({
          type: 'main/setCartId',
          payload: ''
        })
    }
  }, [userId])

  useEffect(() => {
    // if there is no session id in local storage, create one and save ID to redux store. 
    // if there is a session id in local storage, update it so it points to the current user.
    // then, check if there is a cart for the current session and save the cart id and cart contents to redux store
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
        const res = await axios.put ('/api/sessions/update', {
          'id': sessionId,
          'userId': userId
        })

        if(res.data.id){
            dispatch({
            type: 'main/setSessionId',
            payload: res.data.id
          })
        }
      }    

      const getCartFromSession = async () => {
        //this backend route should also check if there is a cart for any other sessions for the user.
        const res = await axios.get (`api/sessions/${sessionId}/cart`)
        
        if (res.data.id) {
          dispatch({
            type: 'main/setCartId',
            payload: res.data.id
          })

          dispatch({
            type: 'main/setCart',
            payload: res.data.order_items
          })

        }
      }

      updateSession().then(getCartFromSession)

  }

  }, [dispatch, userId, cartId])


  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
