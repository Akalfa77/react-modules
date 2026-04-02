import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function DemoApp8Axios() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editStatus, setEditStatus] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const totalPages = Math.ceil(posts.length / itemsPerPage);

    const startEditing = (post) => {
        setEditStatus(post);
        setTitle(post.title);
        setBody(post.body);
    };

    const cancelEditing = () => {
        setEditStatus(null);
        setTitle("");
        setBody("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) {
            alert("Please fill title and body both");
            return;
        }
        if (editStatus) {
            updatePost(editStatus.id);
        } else {
            createPost();
        }
    };


    const getPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(API_URL);
            setPosts(data);
        } catch (error) {

            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const createPost = async () => {
        try {
            const { data } = await axios.post(API_URL, {
                title: title,
                body: body,
                userId: 1,
            });

            setPosts((prevPosts) => [data, ...prevPosts]);
            setTitle("");
            setBody("");
            setCurrentPage(1);
        } catch (error) {
            setError(error.message);
            alert(error.message);
        }
    };



    const updatePost = async (id) => {
        try {
            const { data } = await axios.put(`${API_URL}/${id}`, {
                title: title,
                body: body,
                userId: 1,
            });

            setPosts((prevPosts) =>
                prevPosts.map((post) => (post.id === id ? data : post))
            );
            setTitle("");
            setBody("");
            setEditStatus(null);
        } catch (error) {
            setError(error.message);
            alert(error.message);
        }
    };



    const deletePost = async (id) => {
        if (!window.confirm(`Delete post ${id}?`)) return;

        try {
            // AXIOS: One line delete!
            await axios.delete(`${API_URL}/${id}`);

            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

            if (editStatus?.id === id) {
                cancelEditing();
            }

            const remainingPosts = posts.length - 1;
            const newTotalPages = Math.ceil(remainingPosts / itemsPerPage);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }

            alert(`Deleted Post: ${id}`);
        } catch (error) {
            if (error.response) {
                alert(`Server Error: ${error.response.status}`);
            } else if (error.request) {
                alert("Network Error: No response from server");
            } else {
                alert(error.message);
            }
            setError(error.message);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };


    function renderData() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = posts.slice(startIndex, endIndex);

        if (currentItems.length === 0) return <h3>There are no posts</h3>;

        return currentItems.map((post) => (
            <div
                key={post.id}
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    margin: '10px 0',
                    borderRadius: '5px',
                    backgroundColor: editStatus?.id === post.id ? '#d4edda' : '#fff',
                }}
            >
                <h3>{post.id}. {post.title}</h3>
                <p>{post.body}</p>
                <button onClick={() => startEditing(post)}> Edit</button>{" "}
                <button onClick={() => deletePost(post.id)}> Delete</button>
            </div>
        ));
    }

    function renderPagination() {
        if (posts.length === 0) return null;

        return (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
                <button onClick={goToPrevPage} disabled={currentPage === 1}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{
                            margin: '0 2px',
                            padding: '5px 10px',
                            fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                            backgroundColor: currentPage === i + 1 ? '#2196F3' : '#e0e0e0',
                            color: currentPage === i + 1 ? '#fff' : '#333',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        {i + 1}
                    </button>
                ))}

                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>

                <p>Page {currentPage} of {totalPages} | Total: {posts.length}</p>
            </div>
        );
    }


    if (loading) return <h2> Fetching the data...</h2>;
    if (error) return <h2> Error: {error}</h2>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1> Posts - Axios Version ({posts.length})</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: editStatus ? '#e3f2fd' : '#f5f5f5',
                    padding: '20px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    border: editStatus ? '2px solid #2196F3' : '2px solid #ddd',
                }}
            >
                <h3>
                    {editStatus
                        ? ` Editing Post #${editStatus.id}`
                        : ' Create New Post'
                    }
                </h3>

                <div style={{ marginBottom: '10px' }}>
                    <label><strong>Title: </strong></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label><strong>Body: </strong></label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Enter post body..."
                        rows={3}
                        style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                    />
                </div>

                <button type="submit" style={{ padding: '8px 20px', marginRight: '10px' }}>
                    {editStatus ? ' Update Post' : ' Create Post'}
                </button>

                {editStatus && (
                    <button type="button" onClick={cancelEditing} style={{ padding: '8px 20px' }}>
                        Cancel
                    </button>
                )}
            </form>

            {renderPagination()}
            {renderData()}
            {renderPagination()}
        </div>
    );
}