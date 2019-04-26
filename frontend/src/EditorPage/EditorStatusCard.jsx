import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast, ToastHeader, Spinner } from 'reactstrap';
import {
  isGraphSavingInBackground,
  getEditorErrorMessage,
  getLastSavedTimestamp
} from '../reducers';

EditorStatusCard.propTypes = {
  isSaving: PropTypes.bool,
  errorMessage: PropTypes.string,
  lastSavedTimestamp: PropTypes.string
};

EditorStatusCard.defaultProps = {
  isSaving: false,
  errorMessage: null,
  lastSavedTimestamp: null
};

function EditorStatusCard({ lastSavedTimestamp, errorMessage, isSaving }) {
  const { icon, header } = getCardContent();

  return (
    <Toast className="mb-2 mr-2 editor-notification">
      <ToastHeader icon={icon}>{header}</ToastHeader>
    </Toast>
  );

  function getCardContent() {
    if (isSaving) {
      return {
        icon: <Spinner size="sm" />,
        header: 'Saving...'
      };
    }
    if (errorMessage) {
      return {
        icon: 'danger',
        header: 'Error'
      };
    }

    return {
      icon: 'success',
      header: `Last saved on ${lastSavedTimestamp}`
    };
  }
}

function mapStateToProps(state) {
  return {
    lastSavedTimestamp: getLastSavedTimestamp(state),
    isSaving: isGraphSavingInBackground(state),
    errorMessage: getEditorErrorMessage(state)
  };
}

export default connect(mapStateToProps)(EditorStatusCard);
