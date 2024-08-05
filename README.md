# Assessment Notes

This was an interesting and challenging assessment. Primarily because I decided to use Material UI, Zustand, Zod, React Hook Form, and React Query, none of which I had used before (except for a little bit of Zod).

I tried to set up a baseline app for the assessment itself and then added the FormSubmit via a separate branch now merged in. The pull requests are still around for evaluation reasons.

I first sketched it out in FigJam [here](https://www.figma.com/board/xGwRI58bxbyeQYPP6QK37G/Steam-Logisitics-Assessment?node-id=0-1&t=zZNkyOC1TDl1u0kO-0).
I think one thing I would have added was React Testing Library and have written the tests on the right of the FigJam before starting development, but I did not think I had time with this assessment having already taken on using 5 other unfamiliar libraries.



# Default Readme Content Below

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
