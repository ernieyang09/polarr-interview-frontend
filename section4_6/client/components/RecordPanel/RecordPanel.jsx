import React, { useCallback, useState } from 'react';
import { useDispatch, useMappedState } from "redux-react-hook";

let arr = [];

const saveRecord = (arr) => {
  return fetch('/api/record', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(arr)
  })
}

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
              arr,
            });
            setWords("Start recording");
          }}
        />
        <input
          type="button"
          value="stop"
          disabled={mode =='view' || !isRecording}
          onClick={async ()=> {
            setWords("Saving...");
            arr[0][1] = {
              type: "SWITCH_RECORD",
              status: true,
            };
            const r = await saveRecord(arr);
            if (r.status !== 200) {
              setWords('error')
            } else {
              const id = await r.json()
              setWords(`save id: ${id}`);
            }
            dispatch({
              type: 'SWITCH_RECORD',
              status: false,
            });
            arr = [];
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
