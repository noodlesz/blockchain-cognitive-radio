import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Accordion,
  Icon,
  Image,
  Item,
  Menu
} from 'semantic-ui-react'

import AccordionMenuItem from './accordion-menu-item'

import routes from '../../../routes'


class AccordionMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: -1
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event, { index }) {
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
    const { handleSidebarHide, currentUser } = this.props

    return (
      <Accordion as={Menu} inverted vertical
        className="accordion-menu no-border-radius">
        <Menu.Item
          as={Link}
          to='/'>
          {/* <Image size='small' centered src={srcLogoCyberes} /> */}
        </Menu.Item>
        {_.map(routes, (route, index) => {
          if (!route.menu) return <span key={index}></span>
          if (route.submenu)
            return (
              <AccordionMenuItem
                activeIndex={activeIndex}
                handleClick={this.handleClick}
                handleSidebarHide={handleSidebarHide}
                icon={route.icon}
                index={index}
                key={index}
                name={route.name}
                routes={route.routes} />
            )
          return (
            <Menu.Item
              as={Link}
              key={index}
              onClick={handleSidebarHide}
              to={route.path}>
              <Item.Content>
                <Item.Header>
                  <Icon name={route.icon} />
                  {route.name}
                </Item.Header>
              </Item.Content>
            </Menu.Item>
          )
        })}
      </Accordion>
    )
  }
}

export default AccordionMenu