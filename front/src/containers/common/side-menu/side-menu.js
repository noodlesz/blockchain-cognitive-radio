import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Image, Popup } from 'semantic-ui-react'

import logo from '../../../static/images/no-image.png';

import routes from '../../../routes'

class SideMenu extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Menu vertical className={ `side-menu` }>
        <Link to='/'><Image className='sidemenu-logo' src={ logo }/></Link>

        {_.map(routes, (route, index) => {

          if (!route.menu) return ""
          if (route.submenu)
            return (
              <Menu.Item
                name='Teste'
                onClick={this.handleItemClick}
                key={index}
              />
            )
          return (
            <Menu.Item
              onClick={this.handleItemClick}
              as={Link}
              key={index}
              to={route.path}
              className='sidemenu-item'>
              <Icon name={route.icon} className='sidemenu-icon'/>
              {route.name}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
}

export default SideMenu