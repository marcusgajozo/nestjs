# Commit Style Guide

## Overview

This document outlines the guidelines for committing changes to our project. By adhering to these rules, we ensure that our commit history is clear, understandable, and consistent.

## Commit Message Conventions

Commit messages should follow the conventional commit message format to improve the readability of the changelog. Commits should be descriptive and concise. Here’s an example:

```
feat(user-auth): add login functionality
```

### Types of Commits

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Formatting or cosmetic changes
- **refactor**: Code refactoring without changing the public API
- **test**: Adding missing tests
- **chore**: Build process, library version updates, etc.

### Commit Message Structure

A commit message should consist of a subject line and an optional body. The subject line should be no longer than 50 characters and follow the format:

```
<type>(<scope>): <subject>
```

The body can provide additional details and is formatted using markdown.

## Examples

- **feat(user-auth): add login functionality**
- **fix(data-fetcher): handle edge case for large datasets**
- **docs(api-docs): update documentation for new endpoint**

## Additional Guidelines

- Use imperative mood in commit messages.
- Keep the subject line concise and focused on the change being made.
- The body should provide enough context to understand the change without referring back to the code.
- Avoid merge commits and squash all changes into a single commit when possible.

By following these guidelines, we can maintain a clean and informative commit history that reflects the true nature of each change in our project.
