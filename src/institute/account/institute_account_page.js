import React, { Component } from 'react';

type Props = {
  account: Account
};

/**
 * Responsável por renderizar a página de edição de conta do instituto
 */
class InstituteAccountPage extends Component<Props> {
  render() {
    return (
      <div>Conta do instituto {this.props.account.name}</div>
    );
  }
}

export default InstituteAccountPage;
