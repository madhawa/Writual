import React, { useEffect, useState, useContext } from 'react'
import { Layout, Avatar, Menu } from 'antd'
import Axios from 'axios'

import { MyContext } from '../../context'
import ProfilePost from './ProfilePost';
import EditProfileForm from './EditProfileForm';

const { Content, Sider } = Layout

export default function ProfileContainer(props) {
  const { match } = props
  const context = useContext(MyContext)
  const [posts, setposts] = useState([])
  const [user, setUser] = useState({})
  const [bookmarked, setbookmarked] = useState([])
  const [postsOrBookmarked, setpostsOrBookmarked] = useState(true)
  const [current, setcurrent] = useState('all')
  const [mine, setmine] = useState(false)

  useEffect(() => {


    Axios.get(`https://writualapp.herokuapp.com/profile/${match.params.id}`)
      .then(({ data }) => {


        setUser(data.user)
        setposts(data.user.posts)
        setbookmarked(data.user.bookmarked)
      })
      .catch(err => console.log(err))

    // eslint-disable-next-line
  }, [])



  const handleClick = e => {
    console.log('click ', e);
    setcurrent(e.key)
    setpostsOrBookmarked(prevState => !prevState)

  };
  return (

    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          backgroundColor: '#d1582b',
          color: '#D4dfc2',
          padding: '15px',
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar size={80} src={user.profilePic} />
        <h2>{user.username}</h2>
        <div><p>{user.bio}</p></div>
        {context.state.user._id === user._id && !mine ? setmine(true) : ''}
        {mine ? <EditProfileForm user={user} setUser={setUser} /> : ''}

      </Sider>
      <Layout style={{ marginLeft: 200 }}>

        <Content style={{ height: '90vh', margin: '10vh 16px 0', overflow: 'initial' }}>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="all">
              My Posts
        </Menu.Item>
            <Menu.Item key="bookmarked">
              Bookmarked
        </Menu.Item>
          </Menu>
          {postsOrBookmarked ? posts.map(post => (<ProfilePost post={post} user={user} mine={mine} />)) : bookmarked.map(post => (<ProfilePost post={post} user={user} mine={false} />))}
        </Content>
      </Layout>
    </Layout>
  )
}
