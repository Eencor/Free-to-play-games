import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import Layout from "antd/es/layout/layout"
import { Header} from "antd/es/layout/layout"
import { Link, Outlet } from "react-router-dom";


import {fetchAllGames} from './store/slice/gamesSlice'
import './styles/App.css'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllGames())  
  },[dispatch])

  return (  
    <div className="App">
      <Layout style={{height: 'max(100%, 100vh)'}}>
        <Header className="header">
          <Link to={'/'}>
            <span className="header-span">Free to play games</span>
          </Link>
        </Header>
        <Outlet/>
      </Layout>
    </div>
  );
}

export default App;
