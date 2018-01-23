const types = {}

const GQLTypes = name => {
  if (!types[name]) {
    throw new Error(
      `[GQLType()] Type with name '${name}' does not exist. If the name is correct you may have mispelled the name in DefineType or have forgotten to run the definition file by ensuring you import it into a file that will be executed at runtime.`
    )
  }

  return types[name]
}

GQLTypes.DefineType = (name, type) => {
  if (types[name]) {
    throw new Error(`[GQL.DefineType()] Type '${name}' is already defined`)
  }

  types[name] = type
}

module.exports = GQLTypes
