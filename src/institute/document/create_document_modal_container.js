import * as R from 'ramda';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import CreateDocumentModal from './create_document_modal';

function mapStateToProps(state) {
  console.log(state);
  const { students, departments, documentTypes } = R.pathOr({}, ['institute', 'data', '_embedded'], state);
  return { students, departments, documentTypes };
}

export default connect(mapStateToProps)(CreateDocumentModal); 