import React from 'react'
import { makeStyles } from '@material-ui/core';
import AdminSideBar from '../../components/adminSidebarUI';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#f3f6cf',
    padding: theme.spacing(2),
    height: '100vh',
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminSideBar title='Ordens Pendentes' icon='inbox'/>
    </div>
  )
}

export default Home
