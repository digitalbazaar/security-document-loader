# security-document-loader Changelog

## 3.2.0 - 2026-mm-dd

### Added
- Use `@digitalbazaar/did-io@2.1` in order to allow passing in a particular
  LRU cache instance when creating a security document loader instance. Each
  security loader instance will use its own `CachedResolver` to resolve
  DIDs. The new `cache` parameter is optional, and if used, must specify
  an `LruCache` instance from `@digitalbazaar/lru-memoize@4` or an instance
  that includes, minimally, a compatible `memoize()` function.

## 3.1.0 - 2025-09-21

### Changed
- Update dependencies:
  - `@digitalbazaar/did-method-key@5`.

## 3.0.1 - 2025-03-07

### Changed
- Update dependencies.
  - `@digitalbazaar/credentials-context@3.2.0`.

## 3.0.0 - 2024-08-05

### Changed
- **BREAKING**: Require Node.js >=18.
- Update dependencies.
  - Switch from `credentials-context` to `@digitalbazaar/credentials-context`
    for VC 2.0 support.
  - `jsonld-document-loader@2.2.0`.
  - Update minor, test, and dev dependencies.
- Use newer testing style to ensure all context packages are checked.
- Use `addDocuments` to simplify context loading.

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
