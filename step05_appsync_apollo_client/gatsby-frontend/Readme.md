# Gatsby FrontEnd

## Steps to code

1. Create a new directory by using `mkdir gatsby-frontend`
2. Naviagte to the newly created directory using `cd gatsby-frontend`
3. use `yarn init` to initilize an yarn project in the directory which creates a package.json file with the following content
   ```
   {
   "name": "gatsby-frontend",
   "version": "1.0.0",
   "main": "index.js",
   "license": "MIT"
   }
   ```
4. Install gatsby, react and react dom using `yarn add gatsby react react-dom`. This will update packge.json and create node_modules.json along with yarn.lock
5. update package.json to add scripts

   ```
   "scripts": {
      "develop": "gatsby develop",
      "build": "gatsby build",
      "clean": "gatsby clean"
   }
   ```

6. create gatsby-config.js

   ```
   module.exports = {
   plugins: [],
   };
   ```

7. create "src/pages/index.js"

   ```
   import React from "react";
   export default function Home() {
      return <div>Home Page</div>;
   }
   ```

8. create "src/pages/404.js"

   ```
   import React from "react";
   export default function Error() {
      return <div>Error Page</div>;
   }
   ```

9. create "static/favicon.ico"
10. create ".gitignore"

    ```
    node_modules/
    .cache
    public/
    ```

11. To run the site use `gatsby develop`
12. Install apollo-client in the app using `yarn add @apollo/client` as we are going to use graphql api in the app
13. Create "src/apollo/client.js" to define a client whiich access the graphql api

    ```
    import fetch from "cross-fetch";
    import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

    export const client = new ApolloClient({
      link: new HttpLink({
         uri: "https://ygevmqqogzc4djtcyf7lgjeh7m.appsync-api.us-east-2.amazonaws.com/graphql",
         fetch,
         headers: {
             "x-api-key": "da2-cuwkmsp36bgjnp4e6wwbvwhqsu",
         },
      }),
      cache: new InMemoryCache(),
    });

    ```

14. Create "src/wrap-root-element.js"

    ```
    import React from "react";
    import { ApolloProvider } from "@apollo/client";
    import { client } from "./apollo/client";

    export default ({ element }) => (
      <ApolloProvider client={client}>{element}</ApolloProvider>
    );

    ```

15. Create "gatsby-browser.js" and "gatsby-ssr.js"

    ```
    export { default as wrapRootElement } from "./src/wrap-root-element";

    ```

16. Install shorid using `yarn add shortid`

17. update "src/pages/index.js" to define landing page of the app to access todos and add new todos in the database

    ```
    import React, { useEffect, useState } from "react";
    import { useQuery, gql, useMutation } from "@apollo/client";
    import shortid from "shortid";
    const GET_TODOS = gql`
      query {
         getTodos {
            id
            title
            done
         }
      }
    `;
    const CREATE_TODO = gql`
      mutation createTodo($todo: TodoInput!) {
         addTodo(todo: $todo) {
            id
            title
            done
         }
      }
    `;
    const Index = () => {
      const [title, setTitle] = useState("");
      const { data, loading } = useQuery(GET_TODOS);
      const [createTodos] = useMutation(CREATE_TODO);
      const handleSubmit = async () => {
         const todo = {
            id: shortid.generate(),
            title,
            done: false,
         };
         console.log("Creating Todo:", todo);
         setTitle("");
         await createTodos({
            variables: {
               todo,
            },
         });
      };
      return (
         <div>
            {loading && <h1>Loading ...</h1>}
            <label>
               Todo:
               <input
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
               />
            </label>
            <button onClick={() => handleSubmit()}>Create Todo</button>
            {!loading &&
               data &&
               data.getTodos.map((item) => (
                  <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
                     {item.title} {item.done ? "DONE" : "NOT COMPLETED"}
                  </div>
            ))}
         </div>
      );
    };
    export default Index;
    ```
