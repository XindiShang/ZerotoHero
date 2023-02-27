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