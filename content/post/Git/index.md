---
title: "Git"
date: 2025-02-23
categories:
    - Creator's Stack
tags:
    - Git   
    - System Design
---

## Git

> [!info] test
> what should i do with this?

I'll explain Git workflow in simple terms, like you're five! 🌟

### 1. Your Local Repository (Like Your Toy Box) 📦
Think of your local repository (C:\Users\nneko\muondingu) as your toy box. It has three main areas:
- **Working Directory**: Where you play with your toys (make changes to files)
- **Staging Area**: Where you put toys you want to keep (staged changes)
- **Local Repository**: Your toy box where you store toys properly (committed changes)

### 2. Remote Repository (Like a Shared Toy Box at School) 🏫
- GitHub is like a shared toy box at school
- You can put your toys there (push)
- Get new toys from there (pull)
- Share toys with friends (collaborate)

### Basic Workflow Commands 🎮

1. **Check what toys are out (changed files)**:
```bash
git status
```

2. **Put toys in the staging area (stage changes)**:
```bash
git add filename    # Stage specific file
git add .          # Stage all changes
```

3. **Store toys in your toy box (commit)**:
```bash
git commit -m "I added new toys"
```

4. **Share toys with school (push to GitHub)**:
```bash
git push origin master
```

5. **Get new toys from school (pull from GitHub)**:
```bash
git pull origin master
```

Let's practice this workflow with your repository:

```bash
git status
```


Let's check what's in your themes folder since we saw changes there earlier:

```bash
ls themes
```




Now, let me explain how to manage your repository step by step:

### Daily Workflow 📅

1. **Before Starting Work**
```bash
git pull origin master   # Get latest changes from GitHub
```

2. **While Working**
```bash
git status              # Check what you changed
git add .               # Stage your changes
git commit -m "Message" # Save your changes with a note
```

3. **When Finished**
```bash
git push origin master  # Share your changes on GitHub
```

### Special Cases 🎯

1. **If you want to undo changes before staging**:
```bash
git restore filename    # Undo changes in a file
```

2. **If you want to undo staged changes**:
```bash
git restore --staged filename  # Unstage changes
```

3. **If you want to see your change history**:
```bash
git log                 # See all your saves (commits)
```

### For Your Current Situation 🎯

You have theme folders that have been modified. You have two options:

1. **Track theme changes directly**:
```bash
git add themes/
git commit -m "Update theme customizations"
git push origin master
```

2. **Use themes as submodules** (more advanced):
This is like having a toy box inside your main toy box. It's more complex but better for theme management.

Which approach would you prefer? The simple direct tracking or the more advanced submodule approach? I can guide you through either one! 😊


> [!warning] branches

Ah, perfect! Let me explain Git branches using the game save analogy! 🎮

### Branches = Game Save Files! 🎮

Think of Git like your favorite video game with multiple save slots:
- **main/master**: Your main story save file
- **feature branches**: Alternate save files where you try different quests
- **stash**: Quick save before trying something risky

### Basic Save Commands 🎮

1. **Check Your Save Files**
```bash
git branch        # Shows all your local save files
git branch -a     # Shows ALL save files (including online backups)
```

2. **Create New Save File**
```bash
git checkout -b new-quest    # Like choosing an empty save slot
```

3. **Switch Between Saves**
```bash
git checkout quest-name      # Like loading a different save file
```

### Save File Management 🎯

1. **Making a New Save** (Creating a branch)
```bash
git checkout -b side-quest-1    # "New Game+" from your main save
```

2. **Saving Your Progress** (Committing)
```bash
git add .                       # Mark what to save
git commit -m "Beat the boss!"  # Save with a note
```

3. **Uploading Save Files** (Pushing)
```bash
git push origin side-quest-1    # Upload your save to the cloud
```

### Common Save Scenarios 🌟

1. **Starting a New Quest**
```bash
git checkout main              # Load main save
git checkout -b new-feature    # Create new save slot
# Try new stuff without fear!
```

2. **Merging Quest Rewards** (Merging branches)
```bash
git checkout main             # Go back to main save
git merge new-feature        # Add cool stuff from side quest
```

3. **Emergency Save** (Stashing)
```bash
git stash                    # Quick save current progress
git stash pop               # Load quick save
```

### Save File Types 📁

1. **Main Story Save** (main/master)
- Your stable, working game
- Where everything is tested and works
- The save file you'd show your friends

2. **Side Quest Saves** (feature branches)
- Try new weapons/skills
- Test different strategies
- If they work, add them to main save

3. **Quick Fix Saves** (hotfix branches)
- When something breaks in main save
- Quick repairs without starting over
- Merge back to main immediately

### Pro Gamer Tips 🏆

1. **Always Save Before Big Fights**
```bash
git checkout -b risky-feature   # New save before trying something crazy
```

2. **Keep Save Files Organized**
```bash
feature/new-weapon      # New weapon testing
bugfix/broken-shield   # Fixing broken equipment
test/boss-strategy    # Trying new boss strategies
```

3. **Cloud Saves** (Remote repositories)
```bash
git push origin your-save    # Upload to cloud
git pull origin your-save    # Download from cloud
```

### Save File Safety 🛡️

1. **Protect Your Main Save**
- Never experiment directly on main
- Always make a new save file for tests
- Review changes before merging

2. **Regular Backups**
```bash
git checkout your-save
git pull origin main     # Update with latest main save
```

3. **Clean Up Old Saves**
```bash
git branch -d old-save   # Delete completed quest saves
```

Remember: Branches are like free save slots in your favorite game! They let you:
- Try crazy strategies
- Test new features
- Keep your main save safe
- Team up with other players

Want to learn more about any of these game save techniques? 🎮

