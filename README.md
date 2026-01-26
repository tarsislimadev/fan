# Fan

A 3D fan visualization built with Three.js, featuring real-time animation and interactive controls.

## Overview

This project creates a 3D fan visualization using WebGL and Three.js. It renders a stylized fan with rotating blades and provides interactive controls for customization.

## Features

- 3D fan visualization with rotating blades
- Responsive design that adapts to window size
- Real-time animation using Three.js WebGL renderer
- Color customization options
- Interactive camera controls
- Clean, minimalist design

## Project Structure

```
├── index.html     # Main HTML file with Three.js imports
├── main.js        # Core Three.js scene and animation logic
├── colors.js      # Color palette definitions
├── package.json   # Project dependencies
└── README.md      # This documentation file
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fan
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal) to see the fan animation.

### Controls

- The fan blades rotate automatically
- Press any key to log camera position to console (for debugging)
- Resize the browser window to see responsive behavior

## Technical Details

### Dependencies

- **Three.js** (v0.182.0): 3D graphics library
- **dat.gui** (v0.7.9): GUI controls library (imported but not yet implemented)
- **Vite** (v7.2.7): Development server and build tool

### Key Components

1. **Scene Setup** (`main.js:6-20`):
   - Creates PerspectiveCamera with 70° field of view
   - Sets up WebGLRenderer with antialiasing
   - Configures animation loop for real-time rendering

2. **Fan Geometry** (`main.js:24-53`):
   - Creates central cylinder as fan hub
   - Generates 5 blade cylinders at 72° intervals (Math.PI * 0.2)
   - Implements continuous rotation with `setInterval`

3. **Color System** (`colors.js`):
   - Provides color constants in hexadecimal format
   - Includes white, gray, black, and yellow palettes

## Development

### Running the Project

Start the development server:
```bash
npm run dev
```

The project uses Vite for hot module replacement and fast development builds.

### Extending the Project

To add new features:

1. **Add GUI Controls**: The project imports dat.gui but doesn't implement it yet. Add controls to modify fan speed, colors, or blade count.
2. **Customize Colors**: Modify `colors.js` to add new color schemes.
3. **Add Interactions**: Extend the keyup event handler in `main.js:55-57` to add more interactive controls.

## Browser Compatibility

The project uses modern JavaScript features and WebGL. It works best in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available for personal and educational use.