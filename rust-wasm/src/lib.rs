use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Point {
    pub x: f32,
    pub y: f32,
    pub z: f32,
    pub color: String,
}

#[wasm_bindgen]
pub fn compute_coordinates(frame: u32) -> JsValue {
    // Generate 10 points in a circular pattern that rotates over time.
    let mut points = Vec::new();
    let num_points = 10;
    let angle_step = std::f32::consts::TAU / num_points as f32;
    
    // A simple color palette.
    let colors = [
        "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff",
        "#00ffff", "#ffffff", "#888888", "#ff8800", "#0088ff"
    ];
    
    for i in 0..num_points {
        let angle = i as f32 * angle_step + (frame as f32 * 0.1);
        let x = angle.cos();
        let y = angle.sin();
        let z = 0.5 * ((frame % 20) as f32) / 20.0;
        let color = colors[i as usize % colors.len()].to_string();
        points.push(Point { x, y, z, color });
    }
    
    serde_wasm_bindgen::to_value(&points).unwrap()
}
