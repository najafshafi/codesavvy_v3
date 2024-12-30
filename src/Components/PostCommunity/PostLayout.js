// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     Card,
//     CardContent,
//     Typography,
//     Avatar,
//     IconButton,
//     CircularProgress,
// } from "@mui/material";
// import { MoreVert as MoreVertIcon } from "@mui/icons-material";
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../../Auth/axiosInstance";

// const fetchPosts = async ({ queryKey }) => {
//     const [, page] = queryKey; // Extract page from queryKey
//     const response = await axiosInstance.get(`/posts/`, {
//         params: { page }, // Pass the page as a query parameter
//     });
//     return response.data;
// };

// const PostLayout = () => {
//     const [page, setPage] = useState(1);
//     const [showComments, setShowComments] = useState({}); // Track comments visibility by postID

//     const { data, isLoading, isError, isFetching } = useQuery({
//         queryKey: ["posts", page],
//         queryFn: fetchPosts,
//         keepPreviousData: true,
//     });

//     const toggleComments = (postID) => {
//         setShowComments((prev) => ({
//             ...prev,
//             [postID]: !prev[postID], // Toggle visibility for specific postID
//         }));
//     };

//     const loadMorePosts = () => {
//         if (data.currentPage < data.totalPages) {
//             setPage((prevPage) => prevPage + 1);
//         }
//     };

//     if (isLoading) {
//         return (
//             <Box>
//                 {[...Array(5)].map((_, index) => (
//                     <Card key={index} sx={{ mb: 2 }}>
//                         <CircularProgress />
//                     </Card>
//                 ))}
//             </Box>
//         );
//     }

//     if (isError) return <Typography>Error loading posts.</Typography>;

//     return (
//         <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={5}>
//             {data.posts.map((post) => (
//                 <Card
//                     key={post.postID} // Use unique postID as key
//                     sx={{
//                         maxWidth: 650,
//                         width: "100%",
//                         marginBottom: 2,
//                         borderRadius: 4,
//                         boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
//                     }}
//                 >
//                     <CardContent>
//                         <Box display="flex" alignItems="center" mb={2}>
//                             <Avatar
//                                 src={post.user?.profilePicture || ""}
//                                 alt="User Avatar"
//                                 sx={{ width: 48, height: 48 }}
//                             />
//                             <Typography variant="h6" ml={2}>
//                                 {post.user?.name || "Anonymous"}
//                             </Typography>
//                             <IconButton size="small" sx={{ marginLeft: "auto" }}>
//                                 <MoreVertIcon />
//                             </IconButton>
//                         </Box>
//                         <Typography variant="body1" mb={2}>
//                             {post.content || "No content available."}
//                         </Typography>
//                         <Box display="flex" gap={2}>
//                             <Button
//                                 variant="outlined"
//                                 sx={{
//                                     textTransform: "none",
//                                     borderRadius: 8,
//                                     fontWeight: "bold",
//                                     padding: "6px 16px",
//                                 }}
//                             >
//                                 Like ({post.likes?.length})
//                             </Button>
//                             <Button
//                                 variant="outlined"
//                                 color="secondary"
//                                 sx={{
//                                     textTransform: "none",
//                                     borderRadius: 8,
//                                     fontWeight: "bold",
//                                     padding: "6px 16px",
//                                 }}
//                                 onClick={() => toggleComments(post.postID)}
//                             >
//                                 Comment ({post.comments?.length})
//                             </Button>
//                         </Box>
//                         {showComments[post.postID] && post.comments?.length > 0 && (
//                             <Box mt={2}>
//                                 <Typography variant="subtitle1" fontWeight="bold">
//                                     Comments:
//                                 </Typography>
//                                 {post.comments.map((comment) => (
//                                     <Box key={comment.id} display="flex" mt={1}>
//                                         <Typography
//                                             variant="body2"
//                                             fontWeight="bold"
//                                             color="primary.main"
//                                             mr={1}
//                                         >
//                                             {comment.user?.name || "Anonymous"}:
//                                         </Typography>
//                                         <Typography variant="body2">{comment.content}</Typography>
//                                     </Box>
//                                 ))}
//                             </Box>
//                         )}
//                     </CardContent>
//                 </Card>
//             ))}

//             {isFetching && <CircularProgress sx={{ mt: 2 }} />}

//             {data.currentPage < data.totalPages && (
//                 <Button
//                     onClick={loadMorePosts}
//                     variant="outlined"
//                     sx={{
//                         m: 2,
//                         textTransform: "none",
//                         borderRadius: 8,
//                         fontWeight: "bold",
//                         padding: "6px 16px",
//                     }}
//                 >
//                     Load More
//                 </Button>
//             )}
//         </Box>
//     );
// };

// export default PostLayout;


import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Avatar,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import axiosInstance from "../../Auth/axiosInstance";
import "./PageLayout.css";

const PostLayout = () => {
    const [posts, setPosts] = useState([]); // Store all loaded posts
    const [isLoading, setIsLoading] = useState(false); // Loading state for fetching more posts
    const [hasMore, setHasMore] = useState(true); // Whether there are more posts to load
    const observerRef = useRef(null); // Ref for the intersection observer
    const [isInitialLoading, setIsInitialLoading] = useState(true); // Separate loading for the first fetch
    const [showComments, setShowComments] = useState({}); // Track comments visibility by postID

    const toggleComments = (postID) => {
        setShowComments((prev) => ({
            ...prev,
            [postID]: !prev[postID], // Toggle visibility for specific postID
        }));
    };

    // Function to fetch more posts
    const fetchMorePosts = async () => {
        if (isLoading || !hasMore) return; // Prevent duplicate requests
        setIsLoading(true);

        try {
            const response = await axiosInstance.get(`/posts`, {
                params: { limit: 5, skip: posts?.length }, // Fetch posts incrementally
            });
            const { posts: newPosts, totalPosts } = response.data;

            setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts to the existing list
            setHasMore(posts?.length + newPosts?.length < totalPosts); // Check if there are more posts to load
        } catch (error) {
            console.error("Error loading posts:", error);
        } finally {
            setIsLoading(false);
            setIsInitialLoading(false);
        }
    };

    // Automatically fetch the initial set of posts
    useEffect(() => {
        fetchMorePosts();
    }, []);

    // Set up intersection observer to detect when the user reaches the bottom of the list
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setTimeout(fetchMorePosts, 1000); // Wait for 1 second before loading more
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" m={7}>
            {isInitialLoading ? (
                <CircularProgress />
            ) : (
                posts.map((post) => (
                    <Card
                        key={post.postID}
                        sx={{
                            maxWidth: 650,
                            width: "100%",
                            marginBottom: 2,
                            borderRadius: 4,
                            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar
                                    src={post.user?.profilePicture || ""}
                                    alt="User Avatar"
                                    sx={{ width: 48, height: 48 }}
                                />
                                <Typography variant="h6" ml={2}>
                                    {post.user?.name || "Anonymous"}
                                </Typography>
                                <IconButton size="small" sx={{ marginLeft: "auto" }}>
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body1" mt={5} mb={5}>
                                {post.content || "No content available."}
                            </Typography>
                            <Box display="flex" gap={2}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 8,
                                        fontWeight: "bold",
                                        padding: "6px 16px",
                                    }}
                                >
                                    Like ({post.likes?.length})
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: 8,
                                        fontWeight: "bold",
                                        padding: "6px 16px",
                                    }}
                                    onClick={() => toggleComments(post.postID)}
                                >
                                    Comment ({post.comments?.length})
                                </Button>


                            </Box>
                            {
                                showComments[post.postID] && post.comments?.length > 0 && (
                                    <Box mt={2}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Comments:
                                        </Typography>
                                        {post.comments.map((comment) => (
                                            <Box key={comment.id} display="flex" mt={1}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="bold"
                                                    color="primary.main"
                                                    mr={1}
                                                >
                                                    {comment.user?.name || "Anonymous"}:
                                                </Typography>
                                                <Typography variant="body2">{comment.content}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )
                            }

                        </CardContent>
                    </Card>
                ))
            )}
            {isLoading && <CircularProgress sx={{ mt: 2 }} />}
            {!hasMore && !isLoading && (
                <Typography variant="body2" color="textSecondary" sx={{ m: 5 }}>
                    No more posts to load.
                </Typography>
            )}
            <div ref={observerRef} style={{ height: 1 }}></div>
        </Box>
    );
};

export default PostLayout;


