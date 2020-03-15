const user_default = window.currentUser || {}

export default (user = user_default, action) => {
  switch (action.type) {
    default:
      return user
  }
}