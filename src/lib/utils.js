import get from 'lodash/get'
import { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { getDataset, getDataOrDefault } from './initFromDom'
import { schemaOrdered } from 'lib/collab/schema'

import manifest from '../../manifest.webapp'

export function getShortNameFromClient(client) {
  const url = new URL(client.getStackClient().uri)
  return url.hostname + Math.floor(Math.random() * 100)
}

const returnUrlKey = 'returnUrl'

export function getReturnUrl() {
  const searchParams = new URLSearchParams(window.location.search)
  for (const [key, value] of searchParams) {
    if (key === returnUrlKey) {
      return value
    }
  }
  return undefined
}

export const generateReturnUrlToNotesIndex = doc => {
  const url = new URL(window.location)
  url.searchParams.set(returnUrlKey, '#/')
  url.hash = `#/n/${doc.id}`
  return url
}
export async function getSharedDocument(client) {
  const { data: permissionsData } = await client
    .collection('io.cozy.permissions')
    .getOwnPermissions()

  const permissions = permissionsData.attributes.permissions
  // permissions contains several named keys, but the one to use depends on the situation. Using the first one is what we want in all known cases.
  const sharedDocumentId = get(Object.values(permissions), '0.values.0')

  return sharedDocumentId
}

export function getParentFolderId(file) {
  return file.relationships.parent.data.id
}

export function getFolderLink(id) {
  return `/folder/${id.replace(/-/g, '')}`
}

export function getDriveLink(client, id = null) {
  const cozyURL = new URL(client.getStackClient().uri)
  const { cozySubdomainType } = client.getInstanceOptions()
  const driveSlug = 'drive'
  const pathForDrive = id !== null ? getFolderLink(id) : ''

  const webUrl = generateWebLink({
    cozyUrl: cozyURL.origin,
    slug: driveSlug,
    subDomainType: cozySubdomainType,
    nativePath: pathForDrive
  })

  return webUrl
}

export function getParentFolderLink(client, file) {
  return getDriveLink(client, getParentFolderId(file))
}

export function getAppFullName() {
  const dataset = getDataset()
  const appNamePrefix = getDataOrDefault(
    dataset.cozyAppNamePrefix || manifest.name_prefix,
    ''
  )
  const appName = getDataOrDefault(dataset.cozyAppName, manifest.name)
  return appNamePrefix != '' ? `${appNamePrefix} ${appName}` : appName
}

export function createNoteDocument(client) {
  return client.getStackClient().fetchJSON('POST', '/notes', {
    data: {
      type: 'io.cozy.notes.documents',
      attributes: {
        title: '',
        schema: schemaOrdered
      }
    }
  })
}
