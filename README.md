# Core JSON-LD coreLoader _(@digitalbazaar/core-document-loader)_

[![Build status](https://img.shields.io/github/workflow/status/digitalbazaar/core-document-loader/Node.js%20CI)](https://github.com/digitalbazaar/core-document-loader/actions?query=workflow%3A%22Node.js+CI%22)
[![Coverage status](https://img.shields.io/codecov/c/github/digitalbazaar/core-document-loader)](https://codecov.io/gh/digitalbazaar/core-document-loader)
[![NPM Version](https://img.shields.io/npm/v/@digitalbazaar/core-document-loader.svg)](https://npm.im/@digitalbazaar/core-document-loader)

> A JSON-LD coreLoader library pre-loaded with core commonly used contexts (suites, VC, DIDs).

## Table of Contents

- [Background](#background)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Background

This is useful for unit tests, in Node.js and the browser.
It includes several core contexts and DID resolvers that you might want when 
testing applications involving Verifiable Credentials, `did:key` or Veres One
DIDs, as well as Ed25519 signing and verifying.

Included contexts:

* `https://www.w3.org/ns/did/v1` DID Core Context v1
* `https://w3id.org/veres-one/v1` Veres One DID Method Context v1
* `https://www.w3.org/2018/credentials/v1` Verifiable Credentials v1
* `https://w3id.org/security/suites/ed25519-2020/v1` Ed25519Signature2020 Crypto Suite
* `https://w3id.org/security/suites/x25519-2020/v1` X25519VerificationKey2020 Crypto Suite

Other required contexts and did drivers can easily be added (see Usage section
below).

## Security

TBD

## Install

- Node.js 12+ is required.

### NPM

To install via NPM:

```
npm install --save @digitalbazaar/core-document-loader
```

### Development

To install locally (for development):

```
git clone https://github.com/digitalbazaar/core-document-loader.git
cd core-document-loader
npm install
```

## Usage

The core document loader is easily extensible. For example, to add more contexts:

```js
import {coreLoader} from '@digitalbazaar/core-document-loader';

import secCtx from '@digitalbazaar/security-context';
import webkmsCtx from 'webkms-context';
import zcapCtx from 'zcap-context';

coreLoader.addStatic(
  secCtx.SECURITY_CONTEXT_V2_URL,
  secCtx.contexts.get(secCtx.SECURITY_CONTEXT_V2_URL)
);
coreLoader.addStatic(webkmsCtx.CONTEXT_URL, webkmsCtx.CONTEXT);
coreLoader.addStatic(zcapCtx.CONTEXT_URL, zcapCtx.CONTEXT);

const documentLoader = coreLoader.build();
```

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[New BSD License (3-clause)](LICENSE) © Digital Bazaar
