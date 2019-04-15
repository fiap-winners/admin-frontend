// @flow
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DocumentListContainer from '../document/document_list_container';
import { fetchInstitute } from '../data/institute_actions';

type Props = {
  account: Account,
  fetchInstitute: (instituteId: number) => void
};

/**
 * Responsável por renderizar a dashboard do instituto
 */
class InstituteDashboardPage extends Component<Props> {
  componentDidMount() {
    this.props.fetchInstitute(this.props.account.id);
  }
  render() {
    return (<DocumentListContainer account={this.props.account} />);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchInstitute }, dispatch);
}

export default connect(undefined, mapDispatchToProps)(InstituteDashboardPage);
