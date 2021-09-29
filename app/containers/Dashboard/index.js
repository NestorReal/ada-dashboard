/**
 *
 * Dashboard
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import Notifications from 'containers/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LineStyle from '@material-ui/icons/LineStyle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import NavBar from 'components/NavBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import FormCsv from 'containers/FormCsv';

import makeSelectFormCsv from 'containers/FormCsv/selectors';

import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';

import {} from './actions';

const drawerWidth = 250;

const styles = theme => ({
  content: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: theme.palette.primary.contrastText,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  drawerPaper: {
    height: '100vh',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  list: {
    marginTop: theme.spacing.unit * 8,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  nestedColor: {
    backgroundColor: 'rgba(63, 190, 186, 1)',
    paddingLeft: theme.spacing.unit * 4,
  },
  textWhite: {
    background: 'white',
  },
});
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
    openedSections: [],
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  toggleSection = section => {
    const { openedSections } = this.state;
    let newOpenedSections = openedSections.slice();
    if (!openedSections.includes(section)) {
      newOpenedSections.push(section);
    } else {
      newOpenedSections = newOpenedSections.filter(el => section !== el);
    }
    this.setState({ openedSections: newOpenedSections });
  };

  componentDidUpdate = prevProps => {
    const { section, subsection } = this.props.match.params;
    if (
      section !== prevProps.match.params.section ||
      subsection !== prevProps.match.params.subsection
    ) {
      this.setState({ mobileOpen: false });
    }
  };

  render() {
    const { classes, theme, match } = this.props;
    const navbar = (
      <NavBar elements={[]} onMenuClick={this.handleDrawerToggle} logoLink />
    );
    let menuConfiguration = [];
    menuConfiguration = [
      {
        key: 'overview',
        title: 'Dashboard',
        icon: <LineStyle />,
        subsections: [
          {
            key: 'employees',
            title: 'Tabla de usuarios',
            component: () => <FormCsv history={this.props.history} />,
          },
        ],
      },
    ];

    let main = menuConfiguration[0].subsections[0].component();

    if (match.params.section) {
      const mainSection = menuConfiguration.find(
        section => section.key === match.params.section,
      );
      if (mainSection) {
        if (match.params.subsection) {
          const mainFunction = mainSection.subsections.find(
            functionality => functionality.key === match.params.subsection,
          );
          if (mainFunction) {
            main = mainFunction.component();
          } else {
            return <NotFoundPage />;
          }
        } else {
          main = mainSection.subsections[1].component();
        }
      } else {
        return <NotFoundPage />;
      }
    }
    const list = menuConfiguration.map(section => (
      <div key={section.key}>
        <ListItem button onClick={() => this.toggleSection(section.key)}>
          <ListItemIcon>{section.icon}</ListItemIcon>
          <ListItemText primary={section.title} />
          {this.state.openedSections.includes(section.key) ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )}
        </ListItem>
        <Collapse
          in={this.state.openedSections.includes(section.key)}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {section.subsections.map(functionality => (
              <ListItem
                key={functionality.key}
                button
                className={classes.nested}
                component={props => (
                  <Link
                    to={`/${section.key}/${functionality.key}`}
                    {...props}
                  />
                )}
              >
                <ListItemText primary={functionality.title} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>
    ));

    const drawer = (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.list}>{list}</div>;
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            elevation={16}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.list}>{list}</div>
          </Drawer>
        </Hidden>
      </div>
    );

    return (
      <div>
        {navbar}
        {drawer}
        <main className={classes.content}>
          {main}
          <Notifications />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  calculateClv: PropTypes.func.isRequired,
  recalculateClv: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object,
  formcsv: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  formcsv: makeSelectFormCsv(),
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

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles, { withTheme: true }),
)(Dashboard);
