/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import {documentLoader} from '../lib/main.js';

describe('documentLoader', () => {
  it('should exist', async () => {
    expect(documentLoader).to.exist;
  });

  it('should fetch contexts', async () => {
    const url = 'https://www.w3.org/ns/did/v1';
    const {document: contextDoc} = await documentLoader(url);

    expect(contextDoc['@context'].id).to.equal('@id');
  });
});

