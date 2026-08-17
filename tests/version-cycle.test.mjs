import test from 'node:test'
import assert from 'node:assert/strict'
import { nextVersion } from '../scripts/version-cycle.mjs'

test('avanza las tres entregas y abre una nueva iteración', () => {
  assert.equal(nextVersion('0.1.1'), '0.1.2')
  assert.equal(nextVersion('0.1.2'), '0.1.3')
  assert.equal(nextVersion('0.1.3'), '0.2.1')
  assert.equal(nextVersion('2.9.3'), '2.10.1')
})

test('rechaza entregas fuera del ciclo', () => {
  assert.throws(() => nextVersion('0.1.4'), /Versión inválida/)
  assert.throws(() => nextVersion('v0.1.1'), /Versión inválida/)
})
