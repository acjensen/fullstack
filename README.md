### Development

#### Requirements

- NPM
- NodeJS
- Docker

#### Targets

- `npm run dev` local dev server with hot reload
- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

### Ideas

One big table which is really an adjacency list with reverse index like opensearch, / gsi
Each node (record?) is like a bazel target and can have depenencies
Each node can be ran as a lambda or be event-based from it's dependencies like excel
Each node has it's own programming language inside but each language is limited (no waiting, for example)
Each node has a hot-reloaded server
Each node has an owner, contact info, etc
It's kind of like typescript / react components / excel, but everything is put together by name, not by code order
Nodes are kind of like the new "file" except they can be readable, executable, running or not, processes, etc
nodes can't "inherit" properties -- the only way two nodes can be considered the same is if they have the same tags/components (attributes, aka structural subtyping)
the compile step is constantly running, checking names
you can instantly see how a tweak in a small node can affect a bigger node (like emissions readings)
nodes can be pass/fail, fail means the compiler broke OR the test failed
Note: these concepts map well to dynamodb, opensearch, programming in general
