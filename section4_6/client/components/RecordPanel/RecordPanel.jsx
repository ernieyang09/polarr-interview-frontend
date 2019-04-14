import React, { useCallback, useState } from 'react';
import { useDispatch, useMappedState } from "redux-react-hook";


const RecordPanel = (props) => {
  const [words, setWords] = useState("");
  const dispatch = useDispatch();
  const matState = useCallback(state => state.root, []);
  const {isRecording, mode} = useMappedState(matState);
  
  return (
    <div>
      <div>
        <input
          type="button"
          value="record"
          disabled={mode =='view' || isRecording}
          onClick={()=> {
            dispatch({
              type: 'SWITCH_RECORD',
              status: true,
            });
            setWords("Start recording");
          }}
        />
        <input
          type="button"
          value="stop"
          disabled={mode =='view' || !isRecording}
          onClick={()=> {
            setWords("Saving...");
            dispatch({
              type: 'SWITCH_RECORD',
              status: false,
            });
            
          }}
        />
      </div>
      <div>
        {words}&nbsp;
      </div>
    </div>
  )
}

export default RecordPanel;