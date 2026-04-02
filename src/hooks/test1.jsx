import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function CrudWithAxios() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // READ - GET all posts
    const getPosts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(API_URL);
            setPosts(data.slice(0, 5));
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    //CREATE - POST new post
    const createPost = async () => {
        try {
            const { data } = await axios.post(API_URL, {
                title: "New Post",
                body: "This is a new post",
                userId: 1,
            });
            alert(`Created post with ID: ${data.id}`);
        } catch (error) {
            alert(error.message);
        }
    };

    // UPDATE - PUT
    const updatePost = async (id) => {
        try {
            const { data } = await axios.put(`${API_URL}/${id}`, {
                title: "Updated Post",
                body: "This post has been updated",
                userId: 1,
            });
            alert(`Updated post: ${data.title}`);
        } catch (error) {
            alert(error.message);
        }
    };

    // DELETE
    const deletePost = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            alert(`Deleted post ${id}`);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>CRUD with Axios</h2>
            <button onClick={createPost}>Create New Post</button>
            {posts.map((post) => (
                <div key={post.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button onClick={() => updatePost(post.id)}>Update</button>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default CrudWithAxios;