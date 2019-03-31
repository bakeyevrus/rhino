import { editorService } from '../services';
import { editorActionTypes } from '../const';
import { isProjectLoading } from '../reducers';

const { FETCH_EDITOR_STATE } = editorActionTypes;

const editorActions = {
  fetchEditorState
};

function fetchEditorState() {
  return (dispatch, getState) => {
    const state = getState();
    if (isProjectLoading(state)) {
      return Promise.resolve();
    }

    dispatch({
      type: `${FETCH_EDITOR_STATE}_REQUEST`
    });
    return editorService.fetchEditorState().then(
      response => dispatch({
        type: FETCH_EDITOR_STATE,
        response
      }),
      errMessage => dispatch({
        type: `${FETCH_EDITOR_STATE}_ERROR`,
        errMessage
      })
    );
  };
}

export default editorActions;
