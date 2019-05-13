import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createDocument } from './data/document_actions';
import CreateDocumentModal from './create_document_modal';

function mapStateToProps(state) {
  const {
    id,
    students,
    departments,
    documentTypes
  } = R.pathOr({}, ['institute', 'data'], state);
  return { instituteId: id, students, departments, documentTypes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createDocument }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocumentModal); 