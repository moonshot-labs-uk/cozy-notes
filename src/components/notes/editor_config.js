// if you change something here,
// you should update /lib/collab/schema.js
// otherwise the server part won't work
const editorConfig = {
  allowTables: true,
  allowRule: true,
  allowLists: true,
  allowTextColor: true,
  allowPanel: true,
  allowCodeBlocks: false,
  allowHelpDialog: false,
  allowBlockTypes: { exclude: ['codeBlocks'] }
}

export default editorConfig
