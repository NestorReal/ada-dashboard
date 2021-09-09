import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>idUsuario</TableCell>
            <TableCell align="right">plazos</TableCell>
            <TableCell align="right">pagoState</TableCell>
            <TableCell align="right">pagoPaid</TableCell>
            <TableCell align="right">pagoDeadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={row.idUsuario}>
              <TableCell component="th" scope="row">
                {row.idUsuario}
              </TableCell>
              <TableCell align="right">{row.plazos}</TableCell>
              <TableCell align="right">{row.pagoState}</TableCell>
              <TableCell align="right">{row.pagoPaid}</TableCell>
              <TableCell align="right">{row.pagoDeadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DenseTable.propTypes = {
  data: PropTypes.object,
};
