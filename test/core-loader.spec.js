/*!
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import secCtx from '@digitalbazaar/security-context';
import {securityLoader} from '../lib/main.js';
import veresOneCtx from 'veres-one-context';
import didContext from 'did-context';
import ed25519 from 'ed25519-signature-2020-context';
import x25519 from 'x25519-key-agreement-2020-context';
import cred from 'credentials-context';

describe('documentLoader', () => {
  it('should exist', async () => {
    expect(securityLoader).to.exist;
  });

  it('sets up contexts properly', async () => {
    const testContexts = [
      veresOneCtx,
      didContext,
      ed25519,
      x25519,
      cred
    ];
    for(const testContext of testContexts) {
      const {contexts, constants: contextConstants} = testContext;
      for(const c in contextConstants) {
        if(!c.includes('URL')) {
          continue;
        }
        const documentLoader = securityLoader().build();
        const contextUrl = contextConstants[c];

        const result = await documentLoader(contextUrl);

        expect(result).to.exist;
        expect(result.document).to.exist;
        result.document.should.be.an('object');
        result.document.should.eql(contexts.get(contextUrl));
      }
    }
  });

  it('should fetch contexts', async () => {
    const url = 'https://www.w3.org/ns/did/v1';
    const documentLoader = securityLoader().build();
    const {document: contextDoc} = await documentLoader(url);

    expect(contextDoc['@context'].id).to.equal('@id');
  });

  it('should resolve did:key key objects', async () => {
    const keyId = 'did:key:z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv#' +
      'z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv';

    const documentLoader = securityLoader().build();
    const {document} = await documentLoader(keyId);
    expect(document).to.eql(
      {
        '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
        id: 'did:key:z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv#' +
          'z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv',
        type: 'Ed25519VerificationKey2020',
        controller: 'did:key:z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv',
        publicKeyMultibase: 'z6MkuBLrjSGt1PPADAvuv6rmvj4FfSAfffJotC6K8ZEorYmv'
      }
    );
  });

  it('should be extensible', async () => {
    let error;
    let document;
    let result;
    const loader = securityLoader();
    try {
      // Attempt to fetch the security/v2 context
      result = await loader.documentLoader(
        secCtx.SECURITY_CONTEXT_V2_URL
      );
    } catch(e) {
      error = e;
    }

    expect(error).to.exist;
    expect(result).to.not.exist;

    loader.addStatic(
      secCtx.SECURITY_CONTEXT_V2_URL,
      secCtx.contexts.get(secCtx.SECURITY_CONTEXT_V2_URL)
    );

    error = null;
    try {
      // Attempt to fetch again, after installing support
      ({document} = await loader.documentLoader(
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
