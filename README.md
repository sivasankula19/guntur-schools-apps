# GunturSchools


# Mobile
install nx 

```npm i -g nx```

(if nx is not installed globally use npx instead nx in below commands)


Clone the project
``` 
git clone https://github.com/sivasankula19/guntur-schools-apps.git
```

move to directory

```
cd guntur-schools-apps

```

checkout to current development branch

```
git checkout develop
```
 do install node_modules
 ```
 npm install
 ```
To run the mobile app run this
```
cd mobile npm run dev
```
it will run on port number 4200 by befault , can be change via passing --port = number

To Run web app 

```
 npx nx serve guntur-schools
 ```

***

## Start the application

Run `npx nx serve guntur-schools` to start the development server. Happy coding!

## Build for production

Run `npx nx build guntur-schools` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```


******
## Mobile Build

``` 
npx nx build mobile
```

## Create Mobile android

```
 ionic cap add android
```

build the project if there any changes 
then copy the project

```
npx cap copy
```

open android studio run the app


