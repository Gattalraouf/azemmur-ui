# Contributing to Azemmur

Thank you for your interest in contributing to **Azemmur**!  
Azemmur is an open-source collection of React components built to be **accessible, animated, and performant**.
It thrives thanks to contributions from developers like you. Dive in, explore the code, and help us make things faster, smarter, and more versatile. This guide shows you how.

## Table of Contents

1. [Introduction](#introduction)
2. [Repository Structure](#repository-structure)
3. [Getting Started](#getting-started)
4. [Contribution Types](#contribution-types)
   - [Bug Reports](#bug-reports)
   - [Feature Requests](#feature-requests)
   - [Documentation](#documentation)
5. [Branching & Git Workflow](#branching--git-workflow)
6. [Commit Conventions](#commit-conventions)
7. [Pull Request Guidelines](#pull-request-guidelines)
8. [Components & Demos](#components--demos)
9. [Documentation](#documentation-1)
10. [Templates](#templates)
11. [Ask for Help](#ask-for-help)

---

## Introduction

We use a **monorepo** setup with **pnpm workspaces** and **Turborepo**.

- **Dependencies:** [pnpm](https://pnpm.io/)
- **Build system:** [Turborepo](https://turbo.build/repo)

> Tip: Read this guide fully before opening PRs or issues.

## Repository Structure

```

apps
└── www
├── app
├── components
├── content              # MDX documentation (source of truth)
├── hooks
├── lib
├── public
└── registry
├── components
│   ├── azemmur
│   ├── community
│   └── primitives
├── demo
│   ├── azemmur
│   └── community
├── hooks
└── lib

packages
├── eslint-config
├── typescript-config
└── ui (internal shared UI)

```

---

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork:**

```bash
git clone https://github.com/<YOUR_USERNAME>/azemmur.git
cd azemmur
```

3. **Create a new branch**:

```bash
git checkout -b feat/my-feature-short-description
```

4. **Install dependencies**:

```bash
pnpm install
```

5. **Run development server**:

```bash
pnpm run dev
```

> ⚠️ Always branch from `development`, never from `main`.

## Contribution Types

### Bug Reports

Use for broken functionality or UI issues.

- Include **steps to reproduce**, **expected vs actual behavior**, **screenshots**, **environment info**.
- Label as `bug`.

**Example:**

- Component: `Button`
- Issue: Hover animation breaks on Safari
- Steps to reproduce: ...
- Expected behavior: Smooth hover animation
- Actual behavior: Flickers

### Feature Requests

Use for new components, enhancements, or props.

- Include **description**, **motivation**, optionally **mockups or references**.
- Label as `enhancement`.

**Example:**

- Component: `Modal`
- Feature: Add closing animation
- Motivation: Smooth UX for users

### Documentation

Use to improve guides, examples, MDX docs.

- Include **changed file(s)**, **MDX snippets**, **demo updates**.
- Label as `docs`.

## Branching & Git Workflow

- Branch from `development` only.
- Branch naming convention:

```
<type>/<scope>-<short-description>
```

**Types:**

- `feat` — new feature or component
- `fix` — bug fix
- `docs` — documentation changes
- `style` — formatting, linting, or non-functional changes
- `refactor` — refactoring code without adding features or fixing bugs
- `perf` — performance improvements
- `test` — adding or updating tests
- `ci` — changes to CI/CD or workflow configuration
- `chore` — maintenance tasks, tooling updates, or dependencies

**Example branch names:**

```
feat/button-ripple-effect
fix/modal-close-on-safari
docs/button-usage-example
refactor/card-layout
perf/tooltip-render
ci/workflow-update
chore/dependencies
```

> ⚠️ Always sync with `development` before creating a PR to avoid conflicts.

## Commit Conventions

**Format:**

```
<type>/<scope>: <subject>
```

- **type:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `chore`
- **scope:** component or area (e.g., `button`)
- **subject:** short, lowercase, max 72 chars

**Examples:**

```
feat/button: add ripple animation
fix/modal: close button not responsive on Safari
docs/button: update usage example
```

> Enforced by **commitlint**
> _Scope must be kebab-case, header max 100 chars, subject max 72 chars, subject required_

## Pull Request Guidelines

1. PR title follows **same commit convention**.
2. PR description includes:

- Summary of changes
- Related issue/feature request
- Screenshots/GIFs for UI changes

3. Assign reviewers & labels (`bug`, `enhancement`, `docs`)
4. Run **tests & lint**
5. Rebase on `development` if needed

---

## Components & Demos

### Adding/Modifying a Component

1. Code goes under `apps/www/registry/components/community/<component-name>`
2. Each component requires:

- `index.tsx` — component code
- `registry-item.json` — shadcn registry metadata

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "My Component Description",
  "files": [
    {
      "path": "registry/components/community/my-component/index.tsx",
      "type": "registry:ui",
      "target": "components/community/my-component.tsx"
    }
  ]
}
```

3. Run registry build:

```bash
pnpm registry:build
```

### Demo & Tweakpane

- Demos live in `apps/www/registry/demo/community/<component-name>`.
- Use **Tweakpane** for interactive props:

```tsx
<Tweakpane
  initialBinds={{
    size: { value: 100, min: 0, max: 500, step: 10 },
    color: { value: 'red', options: { Red: 'red', Blue: 'blue' } },
    visible: { value: true },
  }}
  onBindsChange={(binds) => console.log(binds)}
/>
```

> Supports **number, string, boolean**, and **nested groups**.

## Documentation

- MDX files live in `apps/www/content`.
- Each component MDX should include:
  - `<ComponentPreview />` pointing to the demo
  - Installation instructions
  - Usage examples
  - API Reference (use TypeTable for props)
  - Credits section

**Example MDX structure for a component:**

````mdx
---
title: Button
description: Interactive button component
author:
  name: Your Name
  url: https://link-to-profile.com
releaseDate: 2025-12-28
---

<ComponentPreview name="demo-button" />

## Installation

<ComponentInstallation name="button" />

## Usage

```tsx
import { Button } from '@/registry/components/azemmur/button';

<Button size="medium" disabled={false}>
  Click me
</Button>;
```

## API Reference

<TypeTable
  type={{
    size: {
      type: 'string',
      description: 'Button size',
      required: true,
      default: 'medium',
    },
    disabled: {
      type: 'boolean',
      description: 'Disable the button',
      required: false,
      default: false,
    },
    onClick: {
      type: '(event: MouseEvent) => void',
      description: 'Click handler function',
      required: false,
    },
  }}
/>

## Credits

- Created by [Your Name](https://link-to-profile.com)
````

---

## Templates

### Issue Templates

- Bug Report: `.github/ISSUE_TEMPLATE/1.bug_report.yml`
- Feature Request: `.github/ISSUE_TEMPLATE/2.feature_request.yml`
- Documentation Contribution: `.github/ISSUE_TEMPLATE/3.documentation_contribution.yml`

### Pull Request Template

- Follow **Conventional Commits** for title
- Include description, screenshots, linked issues, testing instructions

---

## Ask for Help

If you have questions or need guidance, open a [GitHub issue](https://github.com/your-org/azemmur/issues/new).

> Tip: Check existing issues and PRs before creating a new one to avoid duplicates.
