const pages = import.meta.glob("./pages/**/*.js")
const components = import.meta.glob("./components/**/*.js")

const allComponents = { ...pages, ...components }
for (const path in allComponents) {
	allComponents[path]()
}
