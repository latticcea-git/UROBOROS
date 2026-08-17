import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function nextVersion(version) {
  const match = /^(\d+)\.(\d+)\.([1-3])$/.exec(version.trim())

  if (!match) {
    throw new Error(`Versión inválida: ${version}. Usa MAYOR.ITERACION.ENTREGA, con ENTREGA entre 1 y 3.`)
  }

  const [, majorText, iterationText, deliveryText] = match
  const major = Number(majorText)
  const iteration = Number(iterationText)
  const delivery = Number(deliveryText)

  return delivery < 3
    ? `${major}.${iteration}.${delivery + 1}`
    : `${major}.${iteration + 1}.1`
}

async function bump() {
  const versionPath = path.join(root, 'VERSION')
  const packagePath = path.join(root, 'package.json')
  const current = (await readFile(versionPath, 'utf8')).trim()
  const next = nextVersion(current)
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'))

  packageJson.version = next

  await writeFile(versionPath, `${next}\n`)
  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`)
  process.stdout.write(next)
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv[2] === 'bump') {
  await bump()
}
