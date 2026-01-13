# Source URLs for Part II Scripture

This document tracks the original source texts and backup URLs for each Part II section.

## Andrew Jackson Davis Works

### Primary Sources
| Work | Primary URL | Backup URL |
|------|-------------|------------|
| Principles of Nature (1847) | https://archive.org/details/principlesofnatu00davi | https://books.google.com/books?id=davis-principles |
| The Great Harmonia Vol 1-5 | https://archive.org/details/greatharmoniabe00davigoog | https://books.google.com/books?id=great-harmonia |
| Philosophy of Spiritual Intercourse | https://archive.org/details/philosophyofspi00davigoog | https://sacred-texts.com/nth/davi/ |
| The Magic Staff (Autobiography) | https://archive.org/details/magicstaffautob00davigoog | https://books.google.com/books?id=magic-staff |
| The Penetralia | https://archive.org/details/penetraliabeinga00daviiala | https://books.google.com/books?id=penetralia |
| The Present Age and Inner Life | https://archive.org/details/presentageinner00davigoog | - |
| Herald of Progress (newspaper) | https://archive.org/search.php?query=herald%20of%20progress%20davis | - |
| The Arabula | https://archive.org/details/arabula00davigoog | - |

### Wikipedia References
- https://en.wikipedia.org/wiki/Andrew_Jackson_Davis
- https://en.wikipedia.org/wiki/Spiritualism

## Théodore Jouffroy Works

### Primary Sources
| Work | Primary URL | Backup URL |
|------|-------------|------------|
| Mélanges philosophiques | https://archive.org/details/melangesphilosop00joufuoft | https://gallica.bnf.fr/jouffroy |
| Cours de droit naturel | https://archive.org/details/coursdedroitnatu00jouf | - |
| Nouveaux mélanges | https://books.google.com/books?id=nouveaux-melanges | - |

### Wikipedia References
- https://en.wikipedia.org/wiki/Th%C3%A9odore_Jouffroy

## Historical Martyrs Sources

### Jacopo Ruffini (1805-1833)
| Source | Primary URL | Backup URL |
|--------|-------------|------------|
| Wikipedia | https://en.wikipedia.org/wiki/Jacopo_Ruffini | - |
| Life of Mazzini (contains Ruffini) | https://archive.org/details/lifewritingsofjo00mazz | - |
| Young Italy history | https://en.wikipedia.org/wiki/Young_Italy_(historical) | - |

### Robert Blum (1807-1848)
| Source | Primary URL | Backup URL |
|--------|-------------|------------|
| Wikipedia | https://en.wikipedia.org/wiki/Robert_Blum | - |
| Revolutions of 1848 | https://en.wikipedia.org/wiki/Revolutions_of_1848 | - |
| Vienna October Uprising | https://en.wikipedia.org/wiki/Vienna_October_Uprising | - |

### Vilmos Lázár & The 13 Martyrs of Arad (1849)
| Source | Primary URL | Backup URL |
|--------|-------------|------------|
| 13 Martyrs of Arad | https://en.wikipedia.org/wiki/13_Martyrs_of_Arad | - |
| Hungarian Revolution 1848 | https://en.wikipedia.org/wiki/Hungarian_Revolution_of_1848 | - |
| Archive.org Revolution docs | https://archive.org/details/hungarianrevolution1848 | - |

### Lajos Batthyány (1807-1849)
| Source | Primary URL | Backup URL |
|--------|-------------|------------|
| Wikipedia | https://en.wikipedia.org/wiki/Lajos_Batthy%C3%A1ny | - |
| First Hungarian Ministry | https://en.wikipedia.org/wiki/Batthy%C3%A1ny_Government | - |

---

## Workflow Process

### Step 1: Create Feature Branches
Each section gets its own feature branch:
- `feature/davis-chapters` - Andrew Jackson Davis content
- `feature/jouffroy-chapters` - Théodore Jouffroy content
- `feature/martyrs-chapters` - Historical martyrs content

### Step 2: Git Worktrees
```bash
git worktree add ../bible-2-davis feature/davis-chapters
git worktree add ../bible-2-jouffroy feature/jouffroy-chapters
git worktree add ../bible-2-martyrs feature/martyrs-chapters
```

### Step 3: Background Agents
Each agent:
1. Fetches source content from URLs
2. Verifies against scripture markdown
3. Updates HTML pages with complete text
4. Commits to feature branch
5. Creates PR for review

### Step 4: PR Review & Merge
- Review each PR for accuracy
- Verify source links work
- Merge to main
- Deploy
