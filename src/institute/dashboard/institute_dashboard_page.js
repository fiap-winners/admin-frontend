// @flow
import React, { Component } from 'react';

type Props = {
  account: Account
};

/**
 * Responsável por renderizar a dashboard do instituto
 */
class InstituteDashboardPage extends Component<Props> {
  render() {
    return (
      <div>Olá {this.props.account.name}, seja bem vinda ao seu dashboard.</div>
    );
  }
}

export default InstituteDashboardPage;
