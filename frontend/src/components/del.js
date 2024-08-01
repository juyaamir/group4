/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

[data-theme='dark'] {
  --background-color: #000000;
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}

.Sofia {
  font-family: 'Sofia';
}

.list-width {
  width: 100%;
  height: auto;
}

.height {
  height: 512px;
  overflow: auto;
}

.height2 {
  height: 512px;
}

.width {
  width: 30%;
}

.fGap {
  gap: 5%;
}

.background {
  background-image: url('./assets/bgf.png');
  background-size: cover;
  background-position: center;
}