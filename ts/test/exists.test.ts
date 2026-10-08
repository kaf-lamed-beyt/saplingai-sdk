
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SaplingSdkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SaplingSdkSDK.test()
    equal(testsdk instanceof SaplingSdkSDK, true,
      'SaplingSdkSDK.test() must return a client synchronously')
  })

})
