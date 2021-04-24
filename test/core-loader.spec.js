/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import secCtx from '@digitalbazaar/security-context';
import {coreLoader} from '../lib/main.js';

describe('documentLoader', () => {
  it('should exist', async () => {
    expect(coreLoader).to.exist;
  });

  it('should fetch contexts', async () => {
    const url = 'https://www.w3.org/ns/did/v1';
    const documentLoader = coreLoader.build();
    const {document: contextDoc} = await documentLoader(url);

    expect(contextDoc['@context'].id).to.equal('@id');
  });

  it('should resolve did:key key objects', async () => {
    const keyId = 'did:key:z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv#' +
      'z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv';

    const documentLoader = coreLoader.build();
    const {document} = await documentLoader(keyId);
    expect(document).to.eql(
      {
        '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
        id: 'did:key:z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv#' +
          'z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv',
        type: 'Ed25519VerificationKey2020',
        controller: 'did:key:z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv',
        publicKeyMultibase: 'zFj5p9C2Sfqth6g6DEXtw5dWFqrtpFn4TCBBPJHGnwKzY'
      }
    );
  });

  it('should be extensible', async () => {
    let error;
    let document;
    try {
      // Attempt to fetch the security/v2 context
      ({document} = await coreLoader.documentLoader(
        secCtx.SECURITY_CONTEXT_V2_URL
      ));
    } catch(e) {
      error = e;
    }

    expect(error).to.exist;
    expect(document).to.not.exist;

    coreLoader.addStatic(
      secCtx.SECURITY_CONTEXT_V2_URL,
      secCtx.contexts.get(secCtx.SECURITY_CONTEXT_V2_URL)
    );

    error = null;
    try {
      // Attempt to fetch again, after installing support
      ({document} = await coreLoader.documentLoader(
        secCtx.SECURITY_CONTEXT_V2_URL
      ));
    } catch(e) {
      error = e;
    }
    expect(error).to.not.exist;
    expect(document).to.exist;
    expect(document['@context'][2].AesKeyWrappingKey2019)
      .to.equal('sec:AesKeyWrappingKey2019');
  });
});

