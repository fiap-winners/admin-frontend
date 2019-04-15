// @flow
import React, { Component } from 'react';

import DocumentListContainer from '../document/document_list_container';

type Props = {
  account: Account
};

/**
 * Responsável por renderizar a dashboard do instituto
 */
class InstituteDashboardPage extends Component<Props> {
  render() {
    return (<DocumentListContainer account={this.props.account} />);
  }
}

export default InstituteDashboardPage;
