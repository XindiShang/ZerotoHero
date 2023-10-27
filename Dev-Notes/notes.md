# Notes

## `Workflow and Git Related`

### 1. [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

- ##### An enterprise-level repo model usually contains 2 main branches: `master` and `develop`, and 2 sub-branches: `feature` and `hotfix`, and other branches like `release` and `support`, which are helpful for managing releases and bug fixes.
  - `master` branch is the main branch, and it is used to store the latest stable version of the code.
  - `develop` branch is the main development branch, and it is used to store the latest version of the code.
  - `feature` branch is used to develop new features, and it is branched from `develop` branch, and merged back to `develop` branch.
  - `hotfix` branch is used to fix bugs, and it is branched from `master` branch, and merged back to both `master` and `develop` branches.
  - `release` branch is used to prepare for a new release, and it is branched from `develop` branch, and merged back to both `master` and `develop` branches.
  - `support` branch is used to support older versions of the code, and it is branched from `master` branch, and merged back to `master` branch.
- ##### Commands:
  ``` bash
  <!--initialize git flow -->
  git-flow init -d 

  <!-- opening & closing a branch -->
  git flow feature start <feature-name>
  git flow feature finish <feature-name>
  ```

### 2. Commitlint and Husky

- ##### [Commitlint](https://commitlint.js.org/#/) is a tool to check if your commit messages meet the conventional commit format.
- ##### [Husky](https://typicode.github.io/husky/#/) is a tool to run scripts before git commit. It can work seamlessly with any repository that has a `package.json` file. It can help improve code quality by ensuring unit tests, linting and other checks to run automatically before every commit. 


## `Linux, Shell and WM Related`

### 1. [Linux Commands](https://www.tutorialspoint.com/unix/unix-commands.htm)
 
- ##### Commands:
  ``` shell
  <!-- cat (concatenate) command displays the contents of a file -->
  cat <filename>

  <!-- create new file -->
  cat ><filename> 
  touch <filename>

  <!-- copy files and directories -->
  cp <source_file> <target_file>

  <!-- chmod (change mode) changes file/dir permissions -->
  chmod <permission> <file_or_directory>
  
  <!-- wget (WWW get) downloads files from the internet -->
  wget <URL>

  <!-- echo prints arguments to the terminal -->
  echo <argument>
  e.g. echo "chore: initial commit" | npx commitlint

  ```

## `VSCode ...again`

### 1. reset VSCode side panel
- open the commands textbox with `CTRL+p` and then enter the command `> Reset View Locations`.

## `Mobile HTML5 Related`

- H5 dev is an endless wormhole, especially when you need to support crappy browsers and make it work on different devices and OSs.
### 1. button area
- make sure the button area is large enough by wrapping the icon svg with a container, and set the container's `height` to `100%`, and add `padding` to the container. There could be other ways, the takeaway is to make sure the button area is large enough.

### 2. dialog
- certain mobile browsers don't support `dialog` element, at least the `Dialog` of `Vant UI`, I didn't bother to find the polyfill, since I only need to create user agreement and privacy policy dialogs, I just created individual pages for them.

### 3. button click delay
- certain mobile browsers have a 200-300ms delay after a button is clicked, the solution is to use `fastclick` library.
```js
// main.ts
// 引入fastclick 解决移动端300ms延迟
import FastClick from 'fastclick';

if ('addEventListener' in document) {
	document.addEventListener('load', function() {
		FastClick.attach(document.body);
	}, false);
}
```

### 4. events
- certain mobile browsers don't support `click` event, the solution is to use `touchstart` event instead.
- make sure to manually handle `lose focus` event for input elements.

## `Npm Related`

### 1. dependency versioning
- `~version` **“Approximately equivalent to version”**, will update you to all future patch versions, without incrementing the minor version.`~1.2.3` will use releases from 1.2.3 to <1.3.0.

- `^version` **“Compatible with version”**, will update you to all future minor/patch versions, without incrementing the major version. `^1.2.3` will use releases from 1.2.3 to <2.0.0.

### 2. `devDependencies` vs `dependencies`
- `devDependencies` are modules which are only required during development, such as unit tests, bundlers, etc. `npm install -D` or `npm install --save-dev` will install the module and add it to `devDependencies` in `package.json`.

### 3. package-lock.json
- `package-lock.json` stores an exact, versioned dependency tree rather than using starred versioning like package.json itself (e.g. 1.0.*). This means you can guarantee the dependencies for other developers or prod releases, etc. It also has a mechanism to lock the tree but generally will regenerate if package.json changes.
- if you use a different package manager, such as `yarn`, you can delete `package-lock.json` and `yarn.lock` will be generated. The same goes for `pnpm`.

### 4. npx
- `npx` means executing.

### 5. browserslist
- `browserslist` is a config file for specifying the supported browsers for your project. It is used by many tools, including `babel`, `autoprefixer`, `postcss`, `eslint`, `stylelint`, etc. It can be configured in `package.json`, `.browserslistrc`, `.browserslistrc` or `browserslist` file. Check [here](https://browserslist.dev/?q=bGFzdCAyIHZlcnNpb25z) for more info.

### 6. npm scripts shortcuts
- `npm start` is a shortcut for `npm run start`, and `npm test` is a shortcut for `npm run test`. No other scripts can be called this way.

## `Config-Driven UI`
- Config Driven UI refers to a design pattern where the UI's presentation and behavior are determined based on a configuration file or object, instead of being hardcoded in the code. This allows for modifications to the UI by merely changing the configuration, without touching the core application code.
- For example, if you want to design a form, you can create a config file like this:
```js
const formConfig = {
  title: 'User Profile',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: false,
    },
  ],
  submitButtonText: 'Submit',
  cancelButtonText: 'Cancel',
};
```
- Then you can create a form component that renders the form based on the config file:
```js
const Form = ({ config }) => {
  const { title, fields, submitButtonText, cancelButtonText } = config;
  return (
    <form>
      <h1>{title}</h1>
      {fields.map((field) => (
        <div>
          <label>{field.label}</label>
          <input type={field.type} required={field.required} />
        </div>
      ))}
      <button type="submit">{submitButtonText}</button>
      <button type="button">{cancelButtonText}</button>
    </form>
  );
};
```
- Applications:
  - Dynamic Content & Layouts
  - Multi-Tenant Apps like SaaS
  - Experiments & A/B Testing
  - Remote UI Updates
  - Component Libraries & Design Systems

## `React Related`

### 1. Reconciliation Algorithm (React Fiber)
- React applies the reconciliation algorithm to identify differences in the virtual DOM and update the real DOM accordingly.
- The virtual DOM is a lightweight, JavaScript-based representation of the real DOM, facilitating faster and easier manipulation. Functions like `React.createElement()` create virtual DOM elements, and `ReactDOM.render()` maps them to the real DOM.
- Reconciliation is a recursive process, comparing two virtual DOM trees to detect changes. Starting at the tree's root, it examines each element. If different, the real DOM is updated; if the same, it continues to the next element. The process stops when no more elements are left.
- Check [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture).

### 2. React Hooks
- Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don't work inside classes — they let you use React without classes.

## `CSS: Grid`

### 1. Grid Auto Flow
- The `grid-auto-flow` property determines automatic placement of items in a grid when positions aren't explicitly set.
- Values:
  - `row (default)`: Items are primarily placed in rows. If an item doesn't fit in a row, a new row is created.
  - `column`: Items are primarily placed in columns. If an item doesn't fit in a column, a new column is created.
  - `dense`: Items fill in gaps left in the grid, not strictly adhering to their source order. Can be combined with `row` or `column` like `grid-auto-flow: row dense;`.
- Example:
  - For a movie poster gallery, use grid-auto-flow: dense; to let smaller posters fill gaps left by larger featured ones, achieving a tight layout.

### 2. Grid Template Stuff
- When designing a layout, we can use `grid-template-columns` and `grid-template-rows` to define the number and size of columns and rows. We can also use `grid-template-areas` to define the layout by naming grid areas and then assigning grid items to those areas.
- The recommended way is to
  - 1. Define the height of each row with `grid-template-rows`.
  - 2. Analyze the row that needs columns, and define the width of each column with `grid-template-columns`.
  - 3. Assign grid items to the grid area with `grid-template-areas`. We can also name each grid item with `grid-area`. For those grid items that don't need to be assigned, we can use `.` to represent an empty grid area.
- `fr`: A fractional unit that represents the remaining space in the grid container. It is calculated by dividing the available space by the number of fractions. For example, if a grid container is 300px wide and has two columns, each column will be 150px (1fr). Note that `fr` is not a precise value, if the grid container keeps shrinking, and one grid item is set to `1fr`, it will eventually shrink to 0px. In that case, the grid item will disappear.
- `minmax()`: A function that defines the size of a grid track. The first parameter is the minimum size, and the second parameter is the maximum size. Note that the min and max values need to be separated by a comma, and the min value can't be `fr`.
- Use Line Names
  - `grid-column` and `grid-row` accepts line names (or line numbers) as values. BTW, they are shorthand for `grid-column-start`, `grid-column-end`, `grid-row-start` and `grid-row-end`.
  - Example:
    ```css
    body {
      display: grid;
      grid-template-columns: [page-start] 1fr [content-start] 80vw [content-end] 1fr [page-end];
      grid-template-rows: [hero-start] 60vh [info-start] 5em [hero-end] 5em [info-end] auto [bottom];
    }
    .section-one {    
      grid-column: page-start / page-end;
      grid-row: hero-start / hero-end;
    }

    .section-two {  
      grid-column: content-start / content-end;
      grid-row: info-start / info-end;
      z-index: 10;
    }

    .section-three {   
      grid-column: page-start / page-end;
      grid-row: hero-end / bottom;
    }
    ```
- Child container can also inherit parent container's grid layout, and we can use `grid-template-columns: inherit;` and `grid-template-rows: inherit;` to achieve that.

### 3. CSS Align
- **Differences**:

- `align-self`: Applies to individual flex items.
Overrides align-items value for specific items.
- `align-items`: Sets the default alignment for all items in the flex container.
- `align-content`: Takes effect only when there are multiple lines in the flex container. Controls alignment and spacing between the lines.

- **Real-life Example**:
Imagine a bookshelf layout in an online bookstore. Each row displays book covers. Using align-items: baseline; ensures all book bases align to the shelf. To highlight a specific book, set its cover with align-self: flex-start;. For more space between rows of books, use align-content: space-between;.