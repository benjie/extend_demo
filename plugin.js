const { makeExtendSchemaPlugin, gql } = require('graphile-utils');

module.exports = makeExtendSchemaPlugin(build => {
  const { pgSql: sql } = build;
  return {
    typeDefs: gql`
      type Foo {
        n: Int
        s: Something
      }
      extend type Query {
        foo: Foo
      }
    `,
    resolvers: {
      Query: {
        foo() {return {n:1, somethingId: 1};}
      },
      Foo: {
        async s(parent, args, context, info) {
          const [row] = await info.graphile.selectGraphQLResultFromTable(
            sql.fragment`app.somethings`,
            (tableAlias, queryBuilder) => {
              queryBuilder.where(sql.fragment`${tableAlias}.id = ${sql.value(parent.somethingId)}`)
            }
          );
          return row;
        }
      }
    }
  }
});
