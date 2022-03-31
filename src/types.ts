

interface ResolverArgs {
  match: string
  context: any
}

interface Resolver {
  regex: RegExp,
  resolver: (args: ResolverArgs) => (string | Promise<string>)
}