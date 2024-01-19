import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { PostAddModel, UserModel } from '../types';


export async function fetchPosts(user_id: number) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      const data = await sql`SELECT * FROM posts WHERE user_id = ${user_id}`;
  
      console.log('fetch all posts: Data fetch completed after 3 seconds.');
      //console.log(data)
  
      return data.rows;

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch all post data.');
    }
  }



export async function fetchPost(id: string) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      const data = await sql`SELECT * FROM posts WHERE ID = ${id}`;
  
      console.log('Fetch single post: Data fetch completed after 3 seconds.');
      //console.log(data)
  
      return data.rows[0];

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  }

export async function insertPost(post: PostAddModel) {
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)
    
        const data = await sql`INSERT INTO posts(title, content,medium, rating, user_id, status) values(${post.title},${post.content},${post.medium},${post.rating}, ${post.user_id}, ${post.status})`;
    
        console.log('Data fetch completed after 3 seconds.');
        //console.log(data)
    
        return post;
  
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch post data.');
    }
    
    
}

export async function editPost(id:string, body:any) {
    console.log("edited a post")
    console.log(body)
    try {
        // Artificially delay a response for demo purposes.
        // Don't do this in production :)
    
        const data = await sql`UPDATE posts
                               SET content = ${body.content}, title= ${body.title}, status= ${body.status}, rating= ${body.rating}, medium= ${body.medium}
                               WHERE ID = ${id};`;
    
        console.log('Edit post of Data fetch completed after 3 seconds.');
        console.log(data)
    
        return data;
  
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch post data.');
    }
    
    
}

export async function deletePost(id: string) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      const data = await sql`DELETE FROM posts WHERE ID = ${id}`;
      

  
      console.log('Deleted single post: Data fetch completed after 3 seconds.');
      console.log(data)
  
      return data.rows;

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to delete data.');
    
    
    }
}

export async function insertUser(user: any) {
  try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
      const existingUser= await sql `SELECT * FROM users WHERE email = ${user.email}`
      if(existingUser.rows.length == 0){
        const data = await sql`INSERT INTO users(name, username,password,  email, bio , picture) values(${user.name},${user.email},'', ${user.email}, '', ${user.image})`;
        return data
      }

      console.log('Inserted users');
      //console.log(data)
  
      return existingUser;

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch post data.');
  }
  
  
}
export async function fetchFollowingPosts(userId: number) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql`SELECT * FROM posts WHERE user_id in 
    (SELECT Followed_user_id FROM follows WHERE Following_user_id = ${userId})`;


    console.log('fetch all posts: Data fetch completed after 3 seconds.');
    //console.log(data)

    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function searchUsers(searchQuery:string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)
    const searchQuery1 = '%'+ searchQuery.toUpperCase()+'%'
    const data = await sql`SELECT * FROM users WHERE UPPER(name) like ${searchQuery1}`;


    console.log('fetch all posts: Data fetch completed after 3 seconds.');
    console.log(data)
    
    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search for users.');
  }
}

export async function fetchFollowers(userId: number) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql`SELECT * FROM follows WHERE Followed_user_id = ${userId};`


    //console.log('fetch all posts: Data fetch completed after 3 seconds.');
    //console.log(data)

    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchFollowed(userId: number) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql`SELECT * FROM follows WHERE Following_user_id = ${userId};`


    //console.log('fetch all posts: Data fetch completed after 3 seconds.');
    //console.log(data)

    return data.rows;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function searchUser(userId: number) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql`SELECT * FROM users WHERE id = ${userId};`


    //console.log('fetch all posts: Data fetch completed after 3 seconds.');
    //console.log(data)
    if(data.rows.length ==0){
      return {}
    }
    return data.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function getUserId(userEmail: string) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    const data = await sql`SELECT * FROM users WHERE email = ${userEmail};`


    //console.log('fetch all posts: Data fetch completed after 3 seconds.');
    //console.log(data)
    if(data.rows.length ==0){
      return {}
    }
    return data.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function setFollowing(follow:any) {
  try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      const data = await sql`INSERT INTO follows(Following_user_id, Followed_user_id) values(${follow. Following_user_id},${follow.Followed_user_id})`;
  
      console.log('Data fetch completed after 3 seconds.');
      //console.log(data)
  
      return data;

    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch post data.');
  }
  
  
}