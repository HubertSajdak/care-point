import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  font-family:  sans-serif;
}
body {
  background-color: #fafafa;
}
/* img, picture, video, canvas, svg { */
img, picture, video, canvas {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

ol, ul {
	list-style: none;
}
a {
  text-decoration: none;
}
`
