# 동적 Page Path 구성과 Layout 적용하기
```
# folder structure
src/
  ├── features/
  │  └── dashboard/
  │     ├── code/
  │     ├── components/
  │     └── pages/
  ├── admin/
  │   ├── code/
  │   ├── components/
  │   └── pages/
  └── pages/
```
```js
// vite.config.js
export default {
  plugins: [
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'src/features/**/pages', baseRoute: 'features' },
        { dir: 'src/admin/pages', baseRoute: 'admin' },
      ],
    }),
  ],
}
```
## Links
- https://github.com/hannoeru/vite-plugin-pages