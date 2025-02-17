
import Controls from './Controls';
import ThreeCanvas from './ThreeCanvas';
import './App.css'

function App() {
  return (
    <>
      <div style={{ padding: '20px' }}>
      <h1>React Three.js WASM App</h1>
      <Controls />
        <div style={{ width: '800px', height: '600px', border: '1px solid #000' }}>
          <ThreeCanvas />
        </div>
      </div>
    </>
  )
}

export default App
