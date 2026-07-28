# inspire_6th

Repository for the inspire_6th workspace.

## Overview
- `backend/` : backend services
- `frontend/front/` : frontend app
- `msa/` : microservices
- `rds/` : database related

## Quick start
1. Initialize repo (already done locally):

```powershell
cd "c:\Users\user\Documents\LG_CNS\inspire_6th"
# git init
# git add .
# git commit -m "Initial commit"
```

2. To create a remote and push, run:

```powershell
# using GitHub CLI
gh repo create <owner/repo> --public --source=. --remote=origin --push

# or manually
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git push -u origin main
```


