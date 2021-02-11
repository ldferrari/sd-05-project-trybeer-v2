import React, { useState, useEffect } from 'react';
import { makeStyles, Box, Grid } from '@material-ui/core';
import propTypes from 'prop-types';
import AdminSideBar from '../../components/adminSidebarUI';
import { getSales } from '../../services/requestAPI';
import CardOrder from '../../components/CardOrders';

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
  const [allOrders, setAllOrders] = useState([]);
  const token = localStorage.getItem('token');
  const { history } = props;

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
    async function fetchProducts() {
      try {
        const { data } = await getSales(token);
        setAllOrders(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      return 'true';
    }
    fetchProducts();
  }, [token, history]);

  console.log("admin hoooome=========>", allOrders);
  return (
    <div className={ classes.root }>
      <Box display="flex">
        <AdminSideBar title="Ordens Pendentes" icon="inbox" />
        <Box p={ 4 } mt={ 14 }>
          <Grid container spacing={ 4 }>
            {allOrders.length && allOrders.map((item, index) => (
              <CardOrder key={ item.id } order={ item } index={ index } />
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;

Home.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};
