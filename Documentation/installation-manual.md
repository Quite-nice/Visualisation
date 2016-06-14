# Installation manual

1. Install meteor: https://www.meteor.com/install
2. Create a new project: `meteor create myProject && cd myProject`
3. Remove all the client and server files: `rm -r ./*`
4. Add the visualization framework: `meteor add visualisation:core`
5. Run the app: `meteor run`

## Mediators

There are currently two mediators.

- `visualisation:websocket-mediator` This is a meteor package that can be added directly into your project
- [ZyreMediator](../Zyre mediator): A python script you can run alongside your meteor app, that will log Zyre shout messages into the mongo database that the meteor app uses.