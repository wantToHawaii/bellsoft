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

## Webpack

To be able to split javascript/css files per pages put scripts/styles in `src/scripts` or `src/styles` directory and name it
according to template: `page-{page_name}.[ext]`. Webpack will take all scripts/styles with `page-` prefix
and use it as entrypoints (for example: `alpaca-linux: ['alpaca-linux.css', 'alpaca-linux.js']`),
after that HtmlWebpackPlugin injects scripts/styles to the html file with the same name.
