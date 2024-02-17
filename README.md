# ThreeJs journey

# What is webGL:

- Javascript api
- Render trienagles at remarcable speeds
- result can be drawn in a `<canvas>`
- compatible most bodern borwsers
- uses the GPU

## We need 4 elements for the basic scene

- start from importing Three js

```js
import * as THREE from 'three';
```

- Scene
  ```js
  const scene = new THREE.Scene();
  ```
- Object

  - Objects can be many things. You can have primitive geometries, imported models, particles, lights, and so on.
  - There are many geometries and many materials, but we will keep things simple for now and create a BoxGeometry and a MeshBasicMaterial.

- Camera
- Renderer
