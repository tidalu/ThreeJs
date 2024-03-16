# Camera

- camera is an abstract class
- you are not supposed to use directly

## Array Camera

- it renders the scene from multiple cameras on specific areas of the render

## Stereo camera

- StereoCamera render the scene through that mimic the eyes to create a parallax effect
- use with devices like CR headset , red and blue glasses or cardboards

## CubeCamera

- The CubeCamera is used to get a render facing each direction (forward, backward, leftward, rightward, upward, and downward) to create a render of the surrounding. You can use it to create an environment map for reflection or a shadow map. We'll talk about those later.

## OrthographicCamera

- The OrthographicCamera is used to create orthographic renders of your scene without perspective. It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.

## PerspectiveCamera

- The PerspectiveCamera is the one we already used and simulated a real-life camera with perspective.

- We are going to focus on the OrthographicCamera and the PerspectiveCamera.

## We have biltin controls,

### DeviceOrientationControls

- it is used with smartfons actually, like when we hold our phone we can move our smart phones to see around, this is really cool, but not ios stopped recently

### Fly Controls

### First Person Control

### Pointer lock controls,

- it is with mouse

### Orbuit controls

### Trackbal controls

### Transfiorm controls

### Drag controls
