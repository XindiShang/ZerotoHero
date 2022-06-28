## Basics

### 1. Master vs Main

- `on branch Master`is the default setting. While on github, default is set to `main`

### 2. basic commands

```
初始化： git init
查看状态： git status
添加文件： git add <file>或git add file1 file2或git add .（全部添加）
commit： git commit -m "message"
增加并commit：git commit -a -m 'message' 全部添加
修改commit：git commit --amend
分支：branch
指针：HEAD，指向WIP(当前的working directory)
查看分支：git branch
创建分支：git branch <branch-name>
切换分支：git checkout switch <branch-name>或git checkout <branch-name>
创建+切换分支：git checkout -b <branch-name>或git switch -c <branch-name>
查看分支详细信息：git branch -v
unstaged changes：取决于命名是否冲突
删除分支：git branch -d <branch-name>或git branch -D <branch-name> (force delete)
*注意：不能在待删除的分支上删除该分支，切换到别的分支上才可以删
重命名分支：git branch -m  <new-branch-name>
refs/heads/Master
HEAD=>branch=>commit
```

### 3. merge

```
规则：1. we merge branches, not commits
     2. we always merge to the current HEAD branch
方法：1. git switch <the receiving branch>
     2. git merge <new-change>
以上的情况属于fast-forward，但是有以下2种意外：
场景一：主分支上有了新commit，git会在主分支上创建一个新的commit，并且需要我们提供一条message
场景二：merge可能会出现冲突。比如同一个文件里同一行修改，需要我们手动修改
```

## Diff

### 1. git diff

- Without additional options,`git diff` lists all the changes in our working directory that are **NOT staged** for the next commit.

- `git diff --staged` and `git diff --cached` list the changes between the staging area and the last commit
  "Show me what will be included in my commit if I run `git commit` now"

- `git diff HEAD` lists the changes in the working tree since the last commit

### 2. compare specific files

```
git diff HEAD [filename]
git diff --staged [filename]
git diff BranchA BranchB [filename] // compare the same file on two branches
```

### 3. compare commits

```
git diff commit1..commit2
git diff commit1 commit2
git diff HEAD HEAD~1 // compare with the previous commit on HEAD
```

## Stashing

### 1. why git stash

Scenario 1: When we have changes in the current working directory that we don't want to commit, then we switch to another branch. In this case, git will forward the changes.
Scenario 2: When we have changes in the current working directory that we don't want to commit, and those changes have conflicts with the master branch. In this case, git won't let us switch.

Fix: We need to stash the uncommitted changes so that we can return to them later, without having to make unnecessary commits.

- 1.1. git stash
  including both staged and unstaged changes

```
git stash
git stash save
```

- 1.2 git stash pop
  remove the most recently stashed changes in your stash and re-apply them to the working directory

```
git stash pop
```

### 2. git stash apply

apply whatever is stashed away, _without removing it from the stash_. This can be used to apply stashed changes to multiple branches.

```
git stash apply
```

### 3. working with multiple stashes

- 3.1 viewing stashes

```
git stash list
```

- 3.2 applying specific stashes

```
git stash apply stash@{stash-id}
```

- 3.3 drop and clear stash

```
// drop a single stash
git stash drop stash@{stash-id}
// clear the stash list
git stash clear
```

## Undoing Changes & Time Traveling

### 1. git checkout

1.1 we can use git checkout to view a previous commit

```
git checkout d81975d5
```

1.2 Detached HEAD

- HEAD always points to branch, not commit. But when we use ```

git checkout commit```, HEAD points at that particular commit

1.3 Re-attach the HEAD
```
git switch -c new-branch
git checkout previously-working-branch
```

1.4 checkout odd syntax
HEAD~1 // checkout the previous commit before HEAD (parent)
HEAD~2 // checkout 2 commitS before HEAD (grandparent)
```
git checkout HEAD~1

```

1.5 git switch - 
use ```git switch -``` to switch to previous HEAD position

### 2. Discarding Changes
2.1 discard with git checkout
```
git checkout HEAD <file> // discard changes in <file>
git checkout -- <file> // same as above
```

2.2  un-modifying with git restore
```
git restore <file> // restore the file to its original state, same as git checkout HEAD <file>

```
git restore uses HEAD as the default source, but when can change that with the --source option.
```
git restore --source HEAD~1 index.html // restore the contents of index.html to its original state from the commit prior to HEAD
```

2.3 un-staging with git restore
```
git restore --staged <file>
```

2.4 undoing commits with git reset 
- git reset only removes the commits from the repo, but the commits stay in the working directory, if we switch to a new branch, we can add and commit those discarded changes.
- This is useful when we accidentally make commits on a wrong branch.
```
git reset <commit-hash>
```

- git reset --hard 
```
git reset --hard <commit-hash> // remove the commit from the repo and the working directory
```

2.5 reverting commits with git revert
- git revert is similar to git reset in that they both "undo" changes, but they accomplish it in different ways.
- git reset actually moves the branch pointer backwards, eliminating commits.
- git revert instead creates a brand new commit which reverts the changes from a commit. Because it results in a new commit, you will be prompted to enter a commit message.
- git revert preserves the "bad history" and fast-forwards the branch pointer to a new "clean" commit. This is helpful during team collaboration.


## github

### 1 git clone

```
git clone <url>
```

### 2. git remote
```
git remote 
git remote -v // v means verbose
git remote add <remote-name> <remote-url>
git remote rename <old><new>
git remote remove <name>
```

### 3. git push
```
git push <remote> <branch> 
git push -u <remote-name> <branch> // -u means upstream, after setting -u, we can use git push, without declaring the remote name and the branch name
```

