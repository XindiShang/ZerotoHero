import React from 'react'
import { connect } from "react-redux";

class UserHeader extends React.Component {
  renderUser = () => {
    const { user } = this.props
    if (!user) {
      return null
    }
    return (
      <div className='header'>{user.name}</div>
    )
  }

  render() {
    return (
      <>
        {this.renderUser()}
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(user => user.id === ownProps.id)
  }
}

export default connect(mapStateToProps)(UserHeader);
