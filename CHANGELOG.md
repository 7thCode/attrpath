# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.6.0] - 2025-09-20

### Enhanced
- **Testing**: Improved test coverage to 99.75% statement coverage and 98.5% branch coverage
- **Documentation**: Added comprehensive development guide to README.md
- **Testing**: Added edge cases for parser error handling and formula parsing
- **Code Quality**: Enhanced test suite with 12 additional test cases for better reliability

### Added
- **Development**: New test cases for `TermParser` and `ExprParser` covering edge cases
- **Documentation**: Complete project architecture documentation in README.md
- **Testing**: Comprehensive coverage for multiplication and division operator edge cases

## [0.5.6] - 2023-XX-XX

### Added
- Core functionality for attribute path traversal
- Support for object property and array index access
- Formula parsing capabilities with mathematical expressions
- Unicode character support for international keys
- Dual module support (CommonJS and ESM)

### Features
- `traverse(target, path, default_value?)` - Safe object path navigation
- `update(target, path, value)` - Update values at specific paths
- `is_valid(path)` - Path syntax validation
- Support for complex path expressions: `.property`, `['property']`, `[index]`
- Mixed path support: `.children.john.hobby[1].name`
- Dot-containing keys: `['children.john']`

### Technical
- **Parser System**: Robust BNF grammar-based parsing
- **Handler Pattern**: Clean separation of parsing and value operations
- **Stream Processing**: Efficient character-by-character parsing
- **Type Safety**: Full TypeScript support with strict mode
- **Testing**: Jest-based test suite with high coverage

### Build System
- **CommonJS**: Built to `dist/` using `tsconfig.json`
- **ESM**: Built to `dist/esm/` using `tsconfig.esm.json`
- Both builds include TypeScript declarations and source maps
- TypeDoc documentation generation

## [0.5.5] - 2023-XX-XX

### Added
- `update` method implementation
- Enhanced path validation

### Fixed
- Fixed to work correctly when the key contains "."
- Improved handling of quoted property names

## [0.5.4] - 2023-XX-XX

### Added
- Initial stable release
- Basic path traversal functionality
- Support for nested objects and arrays

### Features
- Safe object traversal without throwing errors
- Support for both dot notation and bracket notation
- Default value handling

---

## Legend

- **Added**: New features
- **Enhanced**: Improvements to existing features  
- **Fixed**: Bug fixes
- **Technical**: Internal improvements
- **Documentation**: Documentation updates
- **Build System**: Build and deployment changes