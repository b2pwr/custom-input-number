import { useState } from 'react';
import CustomInputNumber from "../CustomInputNumber";
import styles from './RoomAllocation.module.scss';

const RoomAllocation = (props) => {
  const {
    guest: guestFromProp,
    room = 1,
    onChange,
  } = props;
  const guest = Math.max(room, Math.min(room * 4, guestFromProp));
  const [data, setData] = useState(() => {
    return [...Array(room).keys()].map(r => ({ adult: 1, child: 0 }));
  })
  const notAssignNumber = guest - data.reduce((accu, curr) => (accu + curr.adult + curr.child), 0);

  const patchData = (index, isAdult, number) => {
    let newArr = [...data]
    newArr[index] = { ...newArr[index], [isAdult ? 'adult': 'child']: number };
    setData(newArr);
    onChange(newArr);
  }

  return (
    <div className={styles.root}>
      <div style={{ fontWeight: 'bold' }}>
        住客人數：{guest} 人／{room} 房
      </div>
      <div className={styles.notAssignHint}>
        尚未分配人數：{notAssignNumber} 人
      </div>
      {data.map((d, index) => (
        <div key={index} className={styles.roomInfo}>
          <div className={styles.roomTotal}>房間：{d.adult + d.child} 人</div>
          <div className={styles.roomRow}>
            <div>
              <div>大人</div>
              <div style={{ color: '#acacac' }}>年齡 20+</div>
            </div>
            <div>
              <CustomInputNumber
                min={1}
                max={notAssignNumber > 0 ? 4 : d.adult}
                name={`room-${index + 1}-adult`}
                value={d.adult}
                disabled={room === guest}
                onChange={e => {
                  patchData(index, true, Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className={styles.roomRow}>
            <div>小孩</div>
            <div>
              <CustomInputNumber
                min={0}
                max={notAssignNumber > 0 ? 3 : d.child}
                name={`room-${index + 1}-child`}
                value={d.child}
                disabled={room === guest}
                onChange={e => {
                  patchData(index, false, Number(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomAllocation;
