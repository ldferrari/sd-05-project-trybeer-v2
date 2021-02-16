import React from 'react'; // { useState, useEffect }
import { makeStyles, Box, Grid } from '@material-ui/core';
import propTypes from 'prop-types';
import AdminSideBar from '../../components/adminSidebarUI';
// import { getAllMessages } from '../../services/requestAPI';
import AdminChatConversation from '../../components/AdminChatConversation';

const two = 2;
const useStyles = makeStyles((theme) => ({
  root: {
    background: '#f3f6cf',
    height: '100vh',
    padding: theme.spacing(two),
    backgroundColor: theme.palette.background.dark,
  },
  listItemText: {
    fontSize: 14,
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  subheader: {
    textTransform: 'uppercase',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  // const [allMessages, setAllMessages] = useState([]);
  // const token = localStorage.getItem('token');
  // const { history } = props;
  const { email } = props;

  return (
    <div className={ classes.root }>
      <Box display="flex">
        <AdminSideBar title="Conversas" icon="inbox" />
        <Box p={ 4 } mt={ 14 }>
          <Grid container spacing={ 4 }>
            <AdminChatConversation email={ email } />
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;

Home.propTypes = {
  email: propTypes.string.isRequired,
};
