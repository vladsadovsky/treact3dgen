# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# React Three.js WASM App

This is a simple web application built with React.js, Three.js for 3D rendering, and a Rust computation module compiled to WebAssembly. This version uses Vite as the build tool.

## Features
- **React.js** for the UI
- **Three.js** for real-time 3D painting
- **Rust & WebAssembly** for computation of frame data
- **Radix UI** for controls (slider, number input, and text input)

## Project Structure


## Getting Started

### Prerequisites
- [Node.js and npm](https://nodejs.org/)
- [Rust](https://www.rust-lang.org/) and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

### Build the WebAssembly Module
Navigate to the `rust-wasm` directory and run:
```bash
wasm-pack build --target web
