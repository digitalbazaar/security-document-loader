/*!
 * Copyright (c) 2021-2024 Digital Bazaar, Inc. All rights reserved.
 */
import chai from 'chai';
chai.should();
const {expect} = chai;

import {contexts as didContexts} from 'did-context';
import {contexts as ed25519Contexts} from 'ed25519-signature-2020-context';
import {contexts as v1Contexts} from 'veres-one-context';
import {contexts as vcContexts} from '@digitalbazaar/credentials-context';
import {contexts as x25519Contexts} from 'x25519-key-agreement-2020-context';

import * as secCtx from '@digitalbazaar/security-context';
import {securityLoader} from '../lib/index.js';

describe('documentLoader', () => {
  it('should exist', async () => {
    expect(securityLoader).to.exist;
  });

  it('sets up contexts properly', async () => {
    const testContexts = [
      didContexts,
      ed25519Contexts,
      v1Contexts,
      vcContexts,
      x25519Contexts
    ];
    for(const contexts of testContexts) {
      for(const [contextUrl, context] of contexts) {
        //console.log('C1', c);
        const documentLoader = securityLoader().build();
        const result = await documentLoader(contextUrl);
        expect(result).to.exist;
        expect(result.document).to.exist;
        result.document.should.be.an('object');
        result.document.should.eql(context);
        expect(result.tag).to.exist;
        result.tag.should.eql('static');
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
