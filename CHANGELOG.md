# security-document-loader Changelog

## 2.1.0 - 2024-07-11

### Changed
- Update module import style.
  - Addresses issue with modern webpack production mode and destructuring.
  - `import * as x from 'x-context` will be more future proof as context
    packages are updated to full modules without default exports.
  - Updated style also causes webpack to load packages as an ES module rather
    than a non-module.
  - Issue this addresses was only with how `credentials-context` was
    destructred. That code was also removed in favor of a common style to
    handle all context packages.

## 2.0.0 - 2022-06-02

### Changed
- **BREAKING**: Convert to module (ESM).
- **BREAKING**: Require Node.js >=14.
- Update dependencies.
- Lint module.

## 1.1.1 - 2021-08-19

### Fixed
- Use fixed did-method-key driver.

## 1.1.0 - 2021-05-26

### Added
- Security loader now loads `veres-one-context`.

## 1.0.0 - 2021-04-28

### Added
- Initial commit.
