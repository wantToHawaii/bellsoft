# BellSoft

## Development

Install dependencies:
`npm i`

Run local server:
`npm start`

Build:
`npm run build`

## Mobile first CSS

Follow mobile-first approach for building responsive web pages.
Use `@include media('phone', 'tablet', 'sm-desktop', 'desktop')` mixin for consistent media queries.

## Helpers

Use `spacing(1, 2, 3, ...)` function for margins, paddings or borders.
1 size = 8px (like in material UI)

`_common.scss` contains all global variables, each file contain it's own variables

## Components

All components like buttons, form controls, grid have it's own file and have to be added in `/components.html`.
