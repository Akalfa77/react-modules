import React, { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function DemoApp8() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editingPost, setEditingPost] = useState(null);


    const getPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error(`Failed to fetch. Status: ${res.status}`);
            const data = await res.json();
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


    // When user clicks  Edit on any post
    const startEditing = (post) => {
        setEditingPost(post);     // Remember which post we are editing
        setTitle(post.title);     // Fill title input with existing title
        setBody(post.body);       // Fill body input with existing body

    };

    // When user clicks "❌ Cancel"
    const cancelEditing = () => {
        setEditingPost(null);     // Exit edit mode
        setTitle('');             // Clear title input
        setBody('');              // Clear body input
    };

    // When form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();       // Prevent page refresh

        // Validation — don't allow empty fields
        if (!title.trim() || !body.trim()) {
            alert('Please fill in both Title and Body!');
            return;
        }

        // Decide: Create or Update?
        if (editingPost) {
            updatePost(editingPost.id);   // UPDATE mode
        } else {
            createPost();                  // CREATE mode
        }
    };

    const createPost = async () => {
        setActionLoading('creating');
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,     // ✅ From form input
                    body: body,       //  From form input
                    userId: 1,
                }),
            });

            if (!res.ok) throw new Error('Failed to create post');

            const newPost = await res.json();

            // ✅ Add new post to beginning of list
            setPosts((prevPosts) => [newPost, ...prevPosts]);

            // ✅ Clear form after success
            setTitle('');
            setBody('');

            alert(`Post created! ID: ${newPost.id}`);
        } catch (error) {
            alert(error.message);
        } finally {
            setActionLoading(null);
        }
    };


    const updatePost = async (id) => {
        setActionLoading(`updating-${id}`);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,     // From form input
                    body: body,       // From form input
                    userId: 1,
                }),
            });

            if (!res.ok) throw new Error('Failed to update post');

            const updatedPost = await res.json();

            // Replace old post with updated post in list
            setPosts((prevPosts) =>
                prevPosts.map((post) => (post.id === id ? updatedPost : post))
            );

            // Clear form and exit edit mode
            setTitle('');
            setBody('');
            setEditingPost(null);

            alert(`Post ${id} updated!`);
        } catch (error) {
            alert(error.message);
        } finally {
            setActionLoading(null);
        }
    };


    const deletePost = async (id) => {
        const confirmDelete = window.confirm(`Delete post ${id}?`);
        if (!confirmDelete) return;

        setActionLoading(`deleting-${id}`);
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete post');

            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

            // If we were editing this post, cancel the edit
            if (editingPost?.id === id) {
                cancelEditing();
            }

            alert(`Post ${id} deleted!`);
        } catch (error) {
            alert(error.message);
        } finally {
            setActionLoading(null);
        }
    };


    if (loading) return <h2> Fetching posts...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div style={styles.container}>
            <h1> Posts ({posts.length})</h1>


            <form onSubmit={handleSubmit} style={styles.form}>


                <h3>
                    {editingPost
                        ? ` Editing Post #${editingPost.id}`
                        : ' Create New Post'
                    }
                </h3>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        placeholder="Enter post title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Body Input */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Body:</label>
                    <textarea
                        placeholder="Enter post body..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={styles.textarea}
                        rows={4}
                    />
                </div>

                {/* Buttons */}
                <div style={styles.formButtons}>
                    {/* Create/Update Button */}
                    <button
                        type="submit"
                        disabled={actionLoading !== null}
                    >
                        {/* Button text changes based on mode and loading */}
                        {editingPost
                            ? actionLoading === `updating-${editingPost.id}`
                                ? ' Updating...'
                                : ' Update Post'
                            : actionLoading === 'creating'
                                ? 'Creating...'
                                : 'Create Post'
                        }
                    </button>

                    {/* Cancel Button — only shows in edit mode */}
                    {editingPost && (
                        <button
                            type="button"
                            onClick={cancelEditing}
                            style={{
                                ...styles.btn,
                                backgroundColor: '#757575',
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {posts.length === 0 && <h3>There are no posts</h3>}

            {posts.map((post) => (
                <div
                    key={post.id}
                    style={{
                        ...styles.postCard,
                        // Highlight effects
                        backgroundColor:
                            editingPost?.id === post.id
                                ? '#d4edda'     //Green — being edited
                                : actionLoading === `deleting-${post.id}`
                                    ? '#f8d7da' // Red — being deleted
                                    : '#ffffff',
                    }}
                >
                    <h3>{post.id}. {post.title}</h3>
                    <p>{post.body}</p>

                    <button
                        onClick={() => startEditing(post)}
                        disabled={actionLoading !== null}
                        style={{
                            ...styles.btn,
                            backgroundColor: '#2196F3',
                            marginRight: '10px',
                        }}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => deletePost(post.id)}
                        disabled={actionLoading !== null}
                        style={{
                            ...styles.btn,
                            backgroundColor: '#f44336',
                        }}
                    >
                        {actionLoading === `deleting-${post.id}`
                            ? '⏳ Deleting...'
                            : '🗑️ Delete'
                        }
                    </button>
                </div>
            ))}
        </div>
    );
}


const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
        border: '2px solid #ddd',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        resize: 'vertical',
    },
    formButtons: {
        display: 'flex',
        gap: '10px',
    },
    btn: {
        padding: '10px 20px',
        fontSize: '14px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    postCard: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        transition: 'background-color 0.3s ease',
    },
};