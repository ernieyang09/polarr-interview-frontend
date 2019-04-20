import shortid from 'shortid';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect',()=> {
  console.log(2)
  socket.emit('join_dashboard');
});

socket.on('disconnect', ()=> {
  socket.emit('leave_dashboard');
});

socket.on('get_result', (data)=> {
  const elem = document.createElement('div');
  elem.innerHTML = `${new Date(data[0]).toTimeString()} - id:${data[1]} - ${data[2] ? 'success': 'fail'}`
  document.body.appendChild(elem)
  if (!data[2]) {
    const failElement = document.createElement('div');
    const { record, action, expected, received } = data[3]
    failElement.innerHTML = `-- Error Message -- Record: ${record}, Action: ${action}, expected: ${JSON.stringify(expected)}, received:  ${JSON.stringify(received)}`
    document.body.appendChild(failElement)
  }
})

