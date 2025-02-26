---
date: 2025-02-24
tags:
  - git
  - blog
aliases: 
subs: 
status:
  - in progress
title: blogdevelopment log
lastmod: 2025-02-25T08:37:39.504Z
---
> \[!Caution]+ Briefly summarize the main idea or purpose of the note. Use this space to write a concise overview (1-2 sentences).

> \[!Abstract]- Connections
>
> > \[!tldr]+ 🗺️
> >
> > ```dataview
> > ```
>
> list\
> from ""\
> where any(contains(file.tags, this.file.tags))\
> and contains(file.tags, "#MoC")\
> and file.name != this.file.name\
> sort file.mtime desc\
> limit 5
>
> > \[!example]+  📚 References & Resources
> >
> > * **Source 1:**  [PDF](PDF)
> > * **Source 2:** [URL](URL)
>
> <!-- Add sources or references related to the note -->
>
> > \[!quote]-  ➖ Related Topics
> >
> > ```dataview
> > ```
>
> list from ""\
> where file.name != Files and contains(file.outlinks, this.file.link)\
> sort file.name asc

> \[!info] 🛠️ `=this.file.mday`  🗒️  ***`=this.file.name`***

## Blog system logic

1. Netlify deploy website from Github repositories.
2. When there's change on Github repositories, Netlify notices the last commit log and rebuild( update the site's content) again.
3. To make change to Github repo, we have to push the commitment.

```
git add . `list changes`
git commit -m 'change description' `confirm changes`
git push origin main `push changes to the *main* branch`
```

## Git management

> \[!info]+

1. Themes as gitmodules need to be pushed to their remote repo
2. When modifying the main

# Planner

**Post-Deployment To-Do List**\
✅ **Backup & Version Control**

* Confirm website content + theme submodule are backed up (e.g., GitHub).

✅ **Post-Update Testing**

* Run Lighthouse (performance, SEO, accessibility).

* Test cross-browser + mobile responsiveness.

* Check for broken links (e.g., `htmltest`).

🔒 **Security**

* Audit dependencies (Hugo modules, npm).

* Ensure HTTPS/SSL is enforced (Netlify settings).

🚀 **Performance**

* Optimize images (auto-compress via Netlify plugin).

* Preload critical assets (fonts, CSS).

📈 **Monitoring**

* Set up Netlify Analytics or Google Search Console.

* Enable uptime monitoring (e.g., UptimeRobot).

🔄 **CI/CD Automation**

* Add build hooks for auto-deploy on theme/submodule updates.

* Configure branch deploys (preview PRs in staging).

📑 **Documentation**

* Update `CHANGELOG.md` with theme version + customizations.

* Note any theme overrides (to avoid conflicts in future updates).

⏮️ **Rollback Plan**

* Tag stable commits in your repo.

* Test Netlify’s “Rollback Deploy” feature.

**Time Investment**: ~2-3 hours for initial setup; 30 mins/month for maintenance.

### Shortcodes

## Issues

* \[ ] tag-filter not working properly, expect pagination problem
* \[ ] home-categories card not working properly in vietnamese, sidebar is ok. Also problem with aliases
* \[ ] /vi no banner
* \[ ] algolia search in vi
