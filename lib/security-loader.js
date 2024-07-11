/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */

import * as didKey from '@digitalbazaar/did-method-key';
import {CachedResolver} from '@digitalbazaar/did-io';
import * as didContext from 'did-context';
import * as ed25519 from 'ed25519-signature-2020-context';
import * as x25519 from 'x25519-key-agreement-2020-context';
import * as cred from 'credentials-context';
import * as veresOneCtx from 'veres-one-context';

const didKeyDriver = didKey.driver();
const resolver = new CachedResolver();
resolver.use(didKeyDriver);

import {JsonLdDocumentLoader} from 'jsonld-document-loader';

export function securityLoader() {
  const loader = new JsonLdDocumentLoader();

  loader.addStatic(ed25519.constants.CONTEXT_URL,
    ed25519.contexts.get(ed25519.constants.CONTEXT_URL));

  loader.addStatic(x25519.constants.CONTEXT_URL,
    x25519.contexts.get(x25519.constants.CONTEXT_URL));

  loader.addStatic(didContext.constants.DID_CONTEXT_URL,
    didContext.contexts.get(didContext.constants.DID_CONTEXT_URL));

  loader.addStatic(cred.constants.CREDENTIALS_CONTEXT_V1_URL,
    cred.contexts.get(cred.constants.CREDENTIALS_CONTEXT_V1_URL));

  loader.addStatic(veresOneCtx.constants.VERES_ONE_CONTEXT_V1_URL,
    veresOneCtx.contexts.get(veresOneCtx.constants.VERES_ONE_CONTEXT_V1_URL));

  loader.setDidResolver(resolver);

  return loader;
}
