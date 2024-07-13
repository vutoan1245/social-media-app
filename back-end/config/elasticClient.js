// import { Client } from "@elastic/elasticsearch";
// import dotenv from "dotenv";

// // Load environment variables from .env file
// dotenv.config();

// console.log(process.env.ELASTICSEARCH_NODE);

// const client = new Client({
//   node: process.env.ELASTICSEARCH_NODE,
//   auth: {
//     username: process.env.ELASTICSEARCH_USERNAME,
//     password: process.env.ELASTICSEARCH_PASSWORD,
//     apiKey: process.env.ELASTICSEARCH_API_KEY,
//   },
//   ssl: {
//     rejectUnauthorized: false, // This will disable SSL verification if it tries to use SSL
//   },
// });

// async function checkConnection() {
//   try {
//     const health = await client.cluster.health({});
//     console.log("Elasticsearch cluster health:", health);
//   } catch (err) {
//     console.error("Elasticsearch connection error:", err);
//   }
// }

// checkConnection();

// export async function createIndex() {
//   await client.indices.create(
//     {
//       index: "posts",
//       body: {
//         mappings: {
//           properties: {
//             userId: { type: "keyword" },
//             content: { type: "text" },
//             images: { type: "keyword" },
//             createdAt: { type: "date" },
//           },
//         },
//       },
//     },
//     { ignore: [400] }
//   );

//   await client.indices.create(
//     {
//       index: "users",
//       body: {
//         mappings: {
//           properties: {
//             firstName: { type: "text" },
//             lastName: { type: "text" },
//             bio: { type: "text" },
//             picturePath: { type: "keyword" },
//           },
//         },
//       },
//     },
//     { ignore: [400] }
//   );

//   console.log("Indices created");
// }

// export async function indexPost(post) {
//   await client.index({
//     index: "posts",
//     body: {
//       userId: post.userId,
//       content: post.content,
//       images: post.images,
//       createdAt: post.createdAt,
//     },
//   });
// }

// export async function indexUser(user) {
//   await client.index({
//     index: "users",
//     body: {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       bio: user.bio,
//       picturePath: user.picturePath,
//     },
//   });
// }

// export async function searchQuery(query) {
//   try {
//     const postsResult = await client.search({
//       index: "posts",
//       body: {
//         query: {
//           multi_match: {
//             query,
//             fields: ["content", "images"],
//           },
//         },
//       },
//     });

//     const usersResult = await client.search({
//       index: "users",
//       body: {
//         query: {
//           multi_match: {
//             query,
//             fields: ["firstName", "lastName", "bio"],
//           },
//         },
//       },
//     });

//     const res = await searchUsersByName(query);
//     console.log("Search results:", res);

//     const posts = postsResult.body?.hits?.hits ?? [];
//     const users = usersResult.body?.hits?.hits ?? [];

//     return { posts, users };
//   } catch (error) {
//     console.error("Error searching:", error);
//     throw error;
//   }
// }

// export async function searchUsersByName(fullName) {
//   const names = fullName.split(" ");
//   const query = {
//     bool: {
//       should: [
//         { match: { firstName: names[0] } },
//         { match: { lastName: names.length > 1 ? names[1] : names[0] } },
//       ],
//     },
//   };

//   try {
//     const result = await client.search({
//       index: "users",
//       body: {
//         query: query,
//       },
//     });

//     const users = result.body?.hits?.hits ?? [];
//     return users;
//   } catch (error) {
//     console.error("Error searching users by name:", error);
//     throw error;
//   }
// }
