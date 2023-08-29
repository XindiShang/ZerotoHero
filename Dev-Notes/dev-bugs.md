# Bugs and Fixes while Developing

## `npm`

### 1. node-sass (gyp) error/not working on OSX (M1 chip) machine

fix: 1. downgrade node to 14.15.0 (or a similar old version), check node-sass npm website for reference; 2. if node-sass is not found, or the terminal shows `python PATH err`, run `npm install node-sass -g`, use `npm` instead of the package manager of the current project. Then, re-run the project.

## `primeVue`

### 1. primeVue is not installed!

fix: This problem is usually caused by not having primeVue installed in the machine. So in a new or newly cloned primeVue project, before running `pnpm install`, run the following 2 commands first:`npm install primevue@^3 --save` and `npm install primeicons --save` , to make sure primeVue is installed locally.

## `CSS`

### 1. flex column parent, grid child height overflows

fix: set grid child's min-height: 0, because if the grid item is not given a fixed height, its min height is set to auto, and it will expand unexpectedly.

### 2. spacing does not work properly when migrating from Windi CSS to Tailwind CSS

fix: In Windi css, when using specific unit (e.g. 24px) for spacing, the css class can be written as `p-24px`, but in Tailwind CSS, the class will not work. There are 3 ways to fix this:

- 1. use `p-6` instead of `p-24px`
- 2. use `p-[24px]`(TW) instead of `p-24px`(Windi)
- 3. add `p-24px: 24px` to the `theme` section in `tailwind.config.js`

note: TW's spacing rule:

- 1. px / 4 = unit
- 2. rem \* 4 = unit

### 3. New line based on the number of words

fix: `max-width: 20ch` does not achieve the effect. The unit `ch` means the width of the character `0` in the current font. So if the font is not monospaced, the width of the character `0` will be different from the width of other characters. So the `max-width: 20ch` will not work properly. The solution is to use `max-width: 20em` instead. And after setting the max-width, make sure to also set `word-wrap: break-word` to make sure the word will be broken into multiple lines if it's too long.

### 4. flex group 3 items, 1st item auto width, 2nd item max-width, 3rd item auto width

Problem: the 2nd item should be flexible, it will shrink and truncate automatically if the window is too small. Meanwhile, if the window is large enough, the 2nd item will take up the max width of 16 characters, but no more than that. During this whole time, the 3rd item won't be affected, it will always take up the remaining space.

```html
<div class="flex-group">
  <span class="child-1 text-truncate">auto</span>
  <span class="child-2 text-truncate">max width of 16 characters</span>
  <span class="child-3 text-truncate">auto</span>
</div>
```

Fix: css *flex* property means `flex-grow flex-shrink flex-basis`, `0` means no shrink or grow, `1` means the opposite. 
```
flex-grow : 1;    ➜ The div will grow in same proportion as the window-size       
flex-shrink : 1;  ➜ The div will shrink in same proportion as the window-size 
flex-basis : 0;   ➜ The div does not have a starting value as such and will 
                     take up screen as per the screen size available for
                     e.g:- if 3 divs are in the wrapper then each div will take 33%.
```

```css
.flex-group {
  display: flex;
  width: 30%;
  border: 1px solid black;
}

.child-1 {
  background-color: red;
  flex: 0 0 auto;
}

.child-2 {
  background-color: green;
  max-width: 16em;
  flex: 0 1 auto;
}

.child-3 {
  background-color: blue;
  flex: 1;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 5. how to give a span a width of 100% of its parent

fix: use `display: block` or `display: inline-block` to make the span a block element, then use `width: 100%` to give it a width of 100% of its parent.

### 6. Tailwind CSS class precedence
problem: Tailwind sets the precedence by the order in which it adds classes to the CSS that's generated after scanning for utility-classes in your code. The order of the items in the `class` string will not make a difference.

fix: add a bang to the front of the class name to give it a higher precedence, e.g. `!text-red-500`


## `T3`

### 1. After installed, Echarts-gl library still not working and failed to compile

fix: First, in the chart component, make sure the import order is correct, put `import 'echarts-gl'` before `import * as echarts from 'echarts'`. Second, in the parent component file, use Next's dynamic import to import the chart component, write `const Chart = dynamic(() => import('./Chart'), { ssr: false })`, and then use `<Chart />` in the parent component.

### 2. Create-T3-Turbo App: Error: Pnpm lockfile is broken, a full installation will be performed

- ![alt](./images/pnpm-t3.png)
  fix: delete the .pnpm-store folder (usually located in D drive), and then run `pnpm install` again.

### 3. Eslint error: do not use @ts-ignore

fix: add `// eslint-disable-next-line @typescript-eslint/ban-ts-comment` before the line of code that uses `@ts-ignore`. This is because `@ts-ignore` is a bad practice, and it is recommended to use `@ts-expect-error` instead. However, in some cases, `@ts-ignore` is necessary, so we need to disable the eslint rule for this line of code, while still keeping the eslint rule for other lines of code.

note: the same fix can be applied to other eslint rules that are not necessary for some lines of code, like `no-this-alias ` etc.

### 4. 3-rd party library not working (cannot read property of null, reading useRef/useState ...)

fix: It's probably because the library's import order is wrong. Specify the package name and version (latest) in the current app's `package.json` file, then run `pnpm i` in root folder, and run `format` to make sure the import order is correct.

note: Since T3 Turbo is a mono-repo, don't run `pnpm i` in the app's folder, instead, run `pnpm i` in the root folder.

### 5. Husky pre-commit hook permission denied while running `pnpm i`

- ![alt](./images/husky-permission-denied.png)
  fix: "Permission denied" means that your script file does not have the "execute" permission set. Run `chmod +x ./node_modules/husky/lib/bin.js` in the root folder. NOTE: `chmod` is a command that changes the permissions of a file or directory. The `+x` option means to add the "execute" permission to the file. And `sudo` won't work here.

## Next.js/React

### 1. Rendered fewer/more hooks than during the previous render

code:

```jsx
// - /pages/monitor.tsx
const Home: React.FC(props) = () {
  // ...hooks here
  return (
    <div>
      // ...jsx here
    </div>
  )
}

export default Home
```

fix: This is because in Next.js, each file in pages folder must be a default export, and it should follow the pattern below, otherwise Next.js wouldn't treat it as a React component, instead, `Home` would be treated as a regular JavaScript function. One important rule of hooks is that hooks should be called from React function components. So the code above should be changed to:

```jsx
// - /pages/monitor.tsx
const Home = () => {
  // ...hooks here
  return <div>// ...jsx here</div>;
};

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
```

### 2. client-side environment variable not found

fix: In Next.js, all client-side envs should be prefixed with `NEXT_PUBLIC_`, e.g. `NEXT_PUBLIC_API_URL`

### 3. React hooks rule takeaway
can't use hook inside another hook, e.g. react query's useQuery hook inside a useEffect hook, or useQuery inside useQuery, etc. React will throw an error saying "Rendered fewer/more hooks than during the previous render".

## Git

### 1. .gitignore not working

fix: Since the node_modules directory is already tracked as part of the repository, the .gitignore rule will not apply to it.

You need to untrack the directory from git using

```
git rm -r --cached node_modules
git commit -m "removing node_modules"
```

After this, the .gitignore rule will ignore the directory away.


## `HTTP Request`

### 1. URL Encoding in HTTP GET Requests
- Certain characters like +, , and # have specific meanings in URLs. For example, in URL encoding, + represents a space, and # signifies a fragment identifier. If these characters need to be included in the URL's query parameters, they must be encoded; otherwise, their original values might be lost.
- Fix: use `encodeURIComponent()` to encode the query parameters.