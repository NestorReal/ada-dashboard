/* eslint-disable prettier/prettier */
/**
 *
 * FormCsv
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'components/Loader';
import Table from 'components/Table';
// import Link from '@material-ui/core/Link';
import Notifications from 'containers/Notifications';
import GridMaterial from '@material-ui/core/Grid';

import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getCsv, getAnalytics, saveNumber, check } from './actions';
import makeSelectFormCsv from './selectors';
import reducer from './reducer';
import saga from './saga';
// const logo = require('images/logo-negro.svg');
export function FormCsv(props) {
  useInjectReducer({ key: 'formCsv', reducer });
  useInjectSaga({ key: 'formCsv', saga });
  
  useEffect(() => {
    props.dispatch(getAnalytics());
    props.dispatch(getCsv());
  }, []);

  let table  = null;
  if(Object.keys(props.formCsv.events).length !== 0){
    const dataComplete = props.formCsv.events.data.map(dataInfo => Object.assign(dataInfo.data, {idUser: dataInfo.id})).filter(data => moment(data.created_at).diff(moment('2021-09-28')) >= 1  );
    const dataAnalytics = props.formCsv.analytics.data.map(analyticsInfo => analyticsInfo.data);
    table = 
      <Table 
        data={dataComplete} 
        checkValue={(value, user) => props.dispatch(check(value, user))} 
        dataAnalytics = {dataAnalytics}  
        saveNumber={(number, user) => props.dispatch(saveNumber(number, user))}
      />
  }
  
  const loader = props.formCsv.isLoading ? (
    <Loader message="Procesando datos" />
  ) : null;

  return (
    <GridMaterial>
      <Notifications />
      {loader}
      {table}
    </GridMaterial>
  );
}

FormCsv.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formCsv: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  formCsv: makeSelectFormCsv(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FormCsv);
