/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    enabled: true,
    // Must cover ./sanity — the default glob is ./src/**/* only, which would
    // find zero queries here and silently emit a types file with no query
    // results in it.
    path: './{src,sanity}/**/*.{ts,tsx}',
    generates: './sanity.types.ts',
    // Makes client.fetch(SOME_QUERY) return the generated result type without
    // any manual type annotation.
    overloadClientMethods: true,
  },
})
