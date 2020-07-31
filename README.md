# Open 2020

My project for the open hackathon of infoeducatie 2020

Check out [the api](https://github.com/BlueGhostGH/open20api)

Project built with:

-   [typescript](https://www.typescriptlang.org/)
-   [nextJs](https://nextjs.org/)
-   [preact](https://preactjs.com/)
-   [zustand](https://github.com/react-spring/zustand)
-   [jsxstyle](https://github.com/jsxstyle/jsxstyle)
-   [react-dropzone](https://react-dropzone.js.org/)
-   [react-icons](https://react-icons.github.io/react-icons/)
-   [react-use-clipboard](https://github.com/danoc/react-use-clipboard)
-   [react-number-format](https://www.npmjs.com/package/react-number-format)
-   [react-select](https://www.npmjs.com/package/react-switch)
-   [blocks.css](https://thesephist.github.io/blocks.css/)

## Developing

-   Clone the repo
-   Install dependencies with:
    ```sh
    yarn
    ```
-   Start the development server with:
    ```sh
    yarn dev
    ```

## Building for production

To build for production use:

```sh
yarn build
```

To run the production build use:

```sh
yarn start
```

## The ci / cd pipeline

On every push the project is checked to build successfully. Pushes to master create and deploy a new release (the heroku).
