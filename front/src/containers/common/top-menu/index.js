import React, { Component } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { Menu, Dropdown, Header, Icon } from "semantic-ui-react"
import { logout } from "../../../store/authentication/action"

class Index extends Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    this.props.logout().then(() => location.reload(true))
  }

  render() {
    const { currentUser } = this.props

    return (
      <>
        <Menu
          className={`main-menu primary-bg no-border no-margin`}
          borderless={true}
          inverted >
          <Menu.Menu position="right">
            <Dropdown
              direction="left"
              simple
              item
              trigger={<Icon name="user outline" />}
            >
              <Dropdown.Menu>
                <Dropdown.Header>
                  <Header>
                    <Icon name="user outline" />
                    <Header.Content>
                      {currentUser.first_name && currentUser.last_name
                        ? `${currentUser.first_name} ${currentUser.last_name}`
                        : currentUser.username }
                    </Header.Content>
                  </Header>
                </Dropdown.Header>

                <Dropdown.Divider />

                <Dropdown.Item
                  icon="sign-out"
                  text={gettext("Sair")}
                  onClick={() => {
                    this.logout()
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </>
    )
  }
}

const mapStateToProps = currentUser => {
  return { currentUser }
}

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(Index)
)
