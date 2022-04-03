import { useState, useCallback, useRef, useEffect } from 'react';
import clsx from 'clsx';
import AddIcon from '../Icons/AddIcon';
import MinusIcon from '../Icons/MinusIcon';
import useLongPress from '../../utils/useLongPress';
import styles from './CustomInputNumber.module.scss';

const CustomInputNumber = (props) => {
  const {
    min = -Infinity,
    max = Infinity,
    step = 1,
    name = 'CustomInputNumber',
    value = 0,
    disabled,
    onChange = e => e,
    onBlur = e => e,
  } = props;

  const [number, setNumber] = useState(Math.max(min, Math.min(max, value)));
  const inputRef = useRef();

  const handleChange = useCallback(e => {
    const {
      target: {
        valueAsNumber,
      },
    } = e;
    if(valueAsNumber > max || valueAsNumber < min || disabled) return;
    setNumber(valueAsNumber || 0);
  }, [max, min, disabled]);

  const handleButtonClick = useCallback(number => {
    if(number > max || number < min || disabled) return;
    setNumber(number);
  }, [disabled, max, min]);

  const { onMouseDown: minus, onMouseUp: cancelMinus } = useLongPress(() => handleButtonClick(number - step));
  const { onMouseDown: plus, onMouseUp: cancelPlus } = useLongPress(() => handleButtonClick(number + step));

  useEffect(() => {
    const event = new Event('change', { bubbles: false, cancelable: true });
    inputRef.current.dispatchEvent(event);
  }, [number]);

  useEffect(() => {
    let selfRef;
    if(inputRef && inputRef.current) {
      selfRef = inputRef.current;
      selfRef.addEventListener('change', onChange);
    }
    return () => {
      selfRef.removeEventListener('change', onChange);
    };
  }, [onChange]);

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.block, {
          [styles.disabled]: number <= min || disabled,
        })}
        onClick={() => {
          handleButtonClick(number - step);
        }}
        onMouseDown={minus}
        onMouseUp={cancelMinus}
      >
        <MinusIcon />
      </div>
      <input
        ref={inputRef}
        type="number"
        name={name}
        value={number}
        step={step}
        disabled={disabled}
        onChange={e => {
          handleChange(e);
        }}
        onBlur={onBlur}
        className={styles.input}
      />
      <div
        className={clsx(styles.block, {
          [styles.disabled]: number >= max || disabled
        })}
        onClick={() => {
          handleButtonClick(number + step);
        }}
        onMouseDown={plus}
        onMouseUp={cancelPlus}
      >
        <AddIcon />
      </div>
    </div>
  );
}

export default CustomInputNumber;
