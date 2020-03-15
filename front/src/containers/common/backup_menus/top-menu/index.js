import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Menu, Image } from "semantic-ui-react";
import routes from '../../../routes'

import logo from '../../../../static/images/no-image.png';

class Index extends Component {
  render() {
    const pathname = this.props.history.location.pathname;
    const opacity = pathname == "/inicio" ? "opacity-menu" : "";

    return (
      <>
        <Menu
          className={`${opacity} main-menu primary-bg no-border no-margin`}
          borderless={true}
          inverted>
          <Menu.Menu position='left'>
            <Image
              src={logo}
              className='logo-menu'
              onClick={() => this.props.history.push(`/`)}/>
            {_.map(routes, (route, index) => {
              if (!route.menu) return <span key={index}></span>
              return (
                <Menu.Item className='menu-item' as={Link} to={route.path} key={index}><p>{route.name}</p></Menu.Item>
              )
            })}
          </Menu.Menu>
          <Menu.Menu position="right">

          </Menu.Menu>
        </Menu>
      </>
    );
  }
}

const mapStateToProps = currentUser => {
  return { currentUser };
};

export default withRouter(
  connect(
    mapStateToProps,
    {

    }
  )(Index)
);
