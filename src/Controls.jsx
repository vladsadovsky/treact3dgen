import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const Controls = () => {
  const [rangeValue, setRangeValue] = useState(50); // Range-bound integer
  const [floatValue, setFloatValue] = useState(0.5);  // Floating point value
  const [labelValue, setLabelValue] = useState("Demo Label"); // String label

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Integer Range Value:
        </label>
        <Slider.Root
          value={[rangeValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setRangeValue(value[0])}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: 200,
            height: 20,
            background: '#ddd',
            borderRadius: 10,
            marginTop: '5px'
          }}
        >
          <Slider.Track style={{ background: '#bbb', position: 'relative', flexGrow: 1, borderRadius: 'inherit', height: 4 }}>
            <Slider.Range style={{ position: 'absolute', background: '#555', borderRadius: 'inherit', height: '100%' }} />
          </Slider.Track>
          <Slider.Thumb style={{
            display: 'block',
            width: 20,
            height: 20,
            backgroundColor: '#fff',
            border: '2px solid #555',
            borderRadius: '50%'
          }} />
        </Slider.Root>
        <div style={{ marginTop: '5px' }}>Value: {rangeValue}</div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Floating Point Value:&nbsp;
          <input
            type="number"
            step="0.01"
            value={floatValue}
            onChange={(e) => setFloatValue(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Label Text:&nbsp;
          <input
            type="text"
            value={labelValue}
            onChange={(e) => setLabelValue(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default Controls;
