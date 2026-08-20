import {type SchemaTypeDefinition} from 'sanity'

import {blockContentType} from './blockContentType'
import {caseContentType} from './caseContentType'
import {projectType} from './projectType'
import {studioType} from './studioType'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [projectType, studioType, blockContentType, caseContentType],
}
