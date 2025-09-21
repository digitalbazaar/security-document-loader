/*!
 * Copyright (c) 2021-2025 Digital Bazaar, Inc. All rights reserved.
 */
import {CachedResolver} from '@digitalbazaar/did-io';
import {driver} from '@digitalbazaar/did-method-key';
import {Ed25519VerificationKey2020} from
  '@digitalbazaar/ed25519-verification-key-2020';

import {contexts as didContexts} from 'did-context';
import {contexts as ed25519Contexts} from 'ed25519-signature-2020-context';
import {contexts as v1Contexts} from 'veres-one-context';
import {contexts as vcContexts} from '@digitalbazaar/credentials-context';
import {contexts as x25519Contexts} from 'x25519-key-agreement-2020-context';

const didKeyDriver = driver();
didKeyDriver.use({
  multibaseMultikeyHeader: 'z6Mk',
  fromMultibase: Ed25519VerificationKey2020.from
});
const resolver = new CachedResolver();
resolver.use(didKeyDriver);

import {JsonLdDocumentLoader} from 'jsonld-document-loader';

export function securityLoader() {
  const loader = new JsonLdDocumentLoader();

  loader.addDocuments({documents: [
    ...didContexts,
    ...ed25519Contexts,
    ...v1Contexts,
    ...vcContexts,
    ...x25519Contexts
  ]});

  loader.setDidResolver(resolver);

  return loader;
}
