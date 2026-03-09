import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'a9qy1267',
    dataset: 'production'
  },
  // type gen required for visual previews
  typegen: {
    path: "./src/**/*.{ts,tsx,js,jsx}", // glob pattern to your typescript files. Can also be an array of paths
    schema: "schema.json", // path to your schema file, generated with 'sanity schema extract' command
    generates: "./sanity.types.ts", // path to the output file for generated type definitions
    overloadClientMethods: false, // set to false to disable automatic overloading the sanity client
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
