import createApolloClient from "@/config/apollo-client";
import { gql } from "@apollo/client";

export default async function Home() {
  const client = createApolloClient();
  const { data, error } = await client.query({
    query: gql`
      query getStudents {
        students {
          name
          address
        }
      }
    `,
  });

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  } else {
    return <div>{JSON.stringify(data)}</div>;
  }
}
