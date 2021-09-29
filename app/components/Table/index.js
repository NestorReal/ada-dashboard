/**
 *
 * Table
 *
 */

import React from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import SecondTable from 'components/SecondTable';
const tache = require('images/tache.png');
const check = require('images/check.jpg');

function Table(props) {
  return (
    <div>
      <MaterialTable
        title="Usuarios"
        columns={[
          { title: 'Id', field: 'idUser', editable: 'never' },
          { title: 'Nombre', field: 'firstName', editable: 'never' },
          { title: 'Apellidos', field: 'lastName', editable: 'never' },
          {
            title: 'Fecha de nacimiento',
            field: 'birthDay',
            editable: 'never',
          },
          { title: 'Grupo', field: 'GroupID', editable: 'never' },
          { title: 'Nombre grupo', field: 'GroupName', editable: 'never' },
          { title: 'Region', field: 'RegionID', editable: 'never' },
          { title: 'Número de telefono', field: 'phoneNumber' },
          { title: 'Usuario creado', field: 'created_at', editable: 'never' },
          {
            title: 'Ultima actualización',
            field: 'last_update',
            editable: 'never',
          },
          {
            field: 'url',
            title: 'Login',
            editable: 'never',
            render: rowData =>
              props.dataAnalytics
                .filter(data => data.user_id === rowData.idUser)
                .map(dataFilter => dataFilter.event)
                .includes('user_logged') ? (
                  <img alt="check" src={check} width="20px" />
              ) : (
                  <img alt="tache" src={tache} width="20px" />
                ),
          },
          {
            field: 'url',
            title: 'Check',
            editable: 'never',
            render: rowData =>
              rowData.reviewed ? (
                <img alt="check" src={check} width="20px" />
              ) : (
                <img alt="tache" src={tache} width="20px" />
              ),
          },
        ]}
        data={props.data}
        actions={[
          {
            icon: 'check_circle_outline',
            tooltip: 'Check',
            onClick: (event, rowData) =>
              props.checkValue(rowData.reviewed, rowData.idUser),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        // detailPanel={[
        //   {
        //     tooltip: 'Detalles Usuario',
        //     render: rowData => (
        //       <div
        //         style={{
        //           fontSize: 3,
        //           textAlign: 'center',
        //           color: 'white',
        //           backgroundColor: '#43A047',
        //         }}
        //       >
        //         <SecondTable
        //           data={props.dataAnalytics.filter(
        //             data => data.user_id === rowData.idUser,
        //           )}
        //         />
        //       </div>
        //     ),
        //   },
        // ]}
        detailPanel={[
          {
            tooltip: 'Detalles Usuario',
            render: rowData => (
              <div
                style={{
                  fontSize: 3,
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: '#43A047',
                }}
              >
                <SecondTable data={rowData.payments} />
              </div>
            ),
          },
        ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              });
            }).then(props.saveNumber(newData.phoneNumber, newData.idUser)),
        }}
      />
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.object,
  checkValue: PropTypes.func,
  saveNumber: PropTypes.func,
  dataAnalytics: PropTypes.object,
};

export default Table;
