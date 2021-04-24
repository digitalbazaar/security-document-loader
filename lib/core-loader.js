/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */

import * as didKey from '@digitalbazaar/did-method-key';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';
import x25519 from 'x25519-key-agreement-2020-context';
import cred from 'credentials-context';

const {contexts: credentialsContext, constants: {CREDENTIALS_CONTEXT_V1_URL}} =
  cred;
const didKeyDriver = didKey.driver();

import {JsonLdDocumentLoader} from 'jsonld-document-loader';

export const coreLoader = new JsonLdDocumentLoader();

coreLoader.addStatic(ed25519.constants.CONTEXT_URL,
  ed25519.contexts.get(ed25519.constants.CONTEXT_URL));

coreLoader.addStatic(x25519.constants.CONTEXT_URL,
  x25519.contexts.get(x25519.constants.CONTEXT_URL));

coreLoader.addStatic(didContext.constants.DID_CONTEXT_URL,
  didContext.contexts.get(didContext.constants.DID_CONTEXT_URL));

coreLoader.addStatic(CREDENTIALS_CONTEXT_V1_URL,
  credentialsContext.get(CREDENTIALS_CONTEXT_V1_URL));

coreLoader.addResolver(didKeyDriver);

