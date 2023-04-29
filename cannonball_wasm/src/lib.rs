use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[wasm_bindgen]
struct Ball {
    pos: (f32, f32),
    vel: (f32, f32)
}

#[wasm_bindgen]
impl Ball {
    fn update(&mut self, vel: (f32, f32)) {
        self.pos.0 += vel.0;
        self.pos.1 += vel.1;
    }
}
