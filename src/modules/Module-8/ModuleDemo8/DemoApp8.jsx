import React, { useEffect, useState } from 'react'


export default function DemoApp8() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [editStatus, setEditStatus] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const startEditing = (post) => {
        setEditStatus(post)
        setTitle(post.title)
        setBody(post.body)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!title.trim() || !body.trim())) {
            alert("please fill title and body both")
            return
        }

        if (editStatus) {
            updatePost(editStatus.id)
        } else {
            createPost()
        }

    }
    // const getPosts = () => { 
    //     setLoading(true)
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(res => res.json())
    //         .then(data => {
    //             setPosts(data)
    //             setLoading(false)
    //         })
    //         .catch(error => {
    //             setError(error.message)
    //             alert(error.message)
    //             setLoading(false)
    //         })
    // }

    const getPosts = async () => {
        setLoading(true);
        try {

            const res = await fetch('https://jsonplaceholder.typicode.com/posts')

            if (!res.ok) {
                throw new Error("Not Able to fetch data");
            }
            const data = await res.json();
            setPosts(data)
        } catch (error) {
            setError(error.message)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getPosts()
    }, [])


    // const createPost = () => {
    //     const data = {
    //         title: 'New Post',
    //         body: 'this is new post',
    //         userId: 1,
    //     };
    //     fetch('https://jsonplaceholder.typicode.com/posts', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             alert(`new post created ${data.id}`)
    //         })
    //         .catch(error => {
    //             setError(error.message)
    //             alert(error.message)
    //         })
    // }

    const createPost = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: 1,
                })
            })
            if (!res.ok) {
                throw new Error("Not Able to create post");
            }
            const data = await res.json();
            setPosts((prevPost) => [...prevPost, data])
            // alert(`new post created ${data.id}`)
            setTitle("")
            setBody("")
        } catch (error) {
            setError(error.message)
            alert(error.message)
        }
    }


    // const updatePost = (id) => {
    //     const data = {
    //         title: 'updated post',
    //         body: 'this is updated post',
    //         userId: 1,
    //     };
    //     fetch(`${'https://jsonplaceholder.typicode.com/posts'}/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             alert(`post updated: ${data.title}`)
    //         })
    //         .catch(error => {
    //             setError(error.message)
    //             alert(error.message)
    //         })
    // }


    const updatePost = async (id) => {
        try {
            const res = await fetch(`${'https://jsonplaceholder.typicode.com/posts'}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: 1,
                })
            })
            if (!res.ok) {
                throw new Error("Not Able to update post");
            }
            const data = await res.json();
            setPosts((prevPost) => prevPost.map((post) => post.id === id ? data : post))
            // alert(`post updated: ${data.title}`)
            setTitle("")
            setBody("")
            setEditStatus(null)

        } catch (error) {
            setError(error.message)
            alert(error.message)
        }
    }

    const deletePost = async (id) => {
        try {
            const res = await fetch(`${'https://jsonplaceholder.typicode.com/posts'}/${id}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                throw new Error("Not Able to delete the post");
            }
            alert(`Deleted Post: ${id}`)
            setPosts(posts.filter((post) => post.id !== id))
        } catch (error) {
            setError(error.message)
            alert(error.message)
        }
    }

    // const deletePost = (id) => {
    //     fetch(`${'https://jsonplaceholder.typicode.com/posts'}/${id}`, {
    //         method: 'DELETE',
    //     })
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw new Error("Not Able to delete the post");
    //             }
    //             alert(`Deleted Post: ${id}`)
    //             setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    //         })
    //         .catch((error) => {
    //             setError(error.message)
    //             alert(error.message)
    //         })
    // }

    function renderData() {

        const startIndex = (currentPage - 1) * itemsPerPage;

        const endIndex = (startIndex + itemsPerPage)

        const currentItems = posts.slice(startIndex, endIndex)

        return (
            <div>
                {currentItems.length === 0 && <h3>There are no posts</h3>}
                {currentItems.length > 0 && (
                    <div>
                        {currentItems.map((post) => (
                            <div key={post.id}>

                                <h3>{post.id + ". "}{post.title}</h3>
                                <p>{post.body}</p>
                                <button onClick={() => startEditing(post)}>Update Post</button>{" "}
                                <button onClick={() => deletePost(post.id)}>Delete Post</button><hr />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    function goToNextPage() {
        setCurrentPage(prevPage => prevPage + 1)
    }
    function goToPrevPage() {
        setCurrentPage(prevPage => prevPage - 1)
    }

    function paginationController() {

        const totalPages = Math.ceil(posts.length / itemsPerPage)
        return (
            <div>
                <button onClick={goToPrevPage}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                <button onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
            </div>
        )
    }

    if (loading) return <h2>fetching the data...</h2>
    if (error) return <h2>Error: {error}</h2>

    return (
        <div>
            <div>
                <h1>Posts</h1>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id='title'
                    />

                    <label htmlFor="body">Body: </label>
                    <input type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        id='body'
                    />

                    <button type='submit'>
                        {editStatus === null ? 'Create Post' : 'Edit Post'}
                    </button>

                </form>
                <div>
                    {paginationController()}
                </div>
                {/* <button onClick={createPost}>Create New Post</button> */}


            </div>
            <div>
                {renderData()}
            </div>
            <div>
                {paginationController()}
            </div>

        </div>
    )
}
