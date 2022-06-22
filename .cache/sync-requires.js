
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": preferDefault(require("C:\\Users\\patri\\Documents\\webpage\\blog\\src\\pages\\404.js")),
  "component---src-pages-index-js": preferDefault(require("C:\\Users\\patri\\Documents\\webpage\\blog\\src\\pages\\index.js")),
  "component---src-pages-using-typescript-tsx": preferDefault(require("C:\\Users\\patri\\Documents\\webpage\\blog\\src\\pages\\using-typescript.tsx")),
  "component---src-templates-blog-post-js": preferDefault(require("C:\\Users\\patri\\Documents\\webpage\\blog\\src\\templates\\blog-post.js"))
}

