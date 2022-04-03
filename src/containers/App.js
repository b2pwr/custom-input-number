import React from 'react';
import RoomAllocation from '../components/RoomAllocation';

function App() {
  return (
    <div>
      <RoomAllocation
        guest={10}
        room={3}
        onChange={res => { console.log(res); }}
      />
    </div>
  )
}
export default App;