import _ from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import {
    Accordion,
    Icon,
    Item,
    Menu
} from 'semantic-ui-react'


const AccordionMenuItem = (props) => {
  const { activeIndex, icon, index, name, routes } = props

  return (
    <Menu.Item>
      <Accordion.Title
        active={activeIndex === index}
        index={index}
        onClick={props.handleClick}>
        <Icon name='dropdown' />
        <Item.Header>
          <Icon name={icon} />
          {name}
        </Item.Header>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === index}>
        {_.map(routes, (route, i) => {
          if (route.name)
            return (
              <Menu.Item
                as={Link}
                key={i}
                onClick={props.handleSidebarHide}
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
      </Accordion.Content>
    </Menu.Item>
  )
}

export default AccordionMenuItem