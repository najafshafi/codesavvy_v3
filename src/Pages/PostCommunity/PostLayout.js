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
// import axiosInstance from "../../Auth/axiosInstance"; // Commented out API instance
import "./PageLayout.css";

const PostLayout = () => {
  // Dummy data for posts
  const dummyPosts = [
    {
      postID: 1,
      user: { name: "John Doe", profilePicture: "" },
      content: "This is the first dummy post content.",
      likes: [1, 2],
      comments: [
        { id: 1, user: { name: "Jane" }, content: "Nice post!" },
        { id: 2, user: { name: "Mark" }, content: "I agree!" },
      ],
    },
    {
      postID: 2,
      user: { name: "Alice Smith", profilePicture: "" },
      content: "Another dummy post for testing the layout.",
      likes: [1],
      comments: [{ id: 1, user: { name: "Tom" }, content: "Looks great!" }],
    },
  ];

  const [posts, setPosts] = useState(dummyPosts); // Use dummy posts instead of API data
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state for consistency
  const [hasMore, setHasMore] = useState(false); // No additional posts to load
  const [showComments, setShowComments] = useState({}); // Track comments visibility by postID

  const toggleComments = (postID) => {
    setShowComments((prev) => ({
      ...prev,
      [postID]: !prev[postID], // Toggle visibility for specific postID
    }));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      m={7}
    >
      {posts.map((post) => (
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
            {showComments[post.postID] && post.comments?.length > 0 && (
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
            )}
          </CardContent>
        </Card>
      ))}
      {isLoading && <CircularProgress sx={{ mt: 2 }} />}
      {!hasMore && !isLoading && (
        <Typography variant="body2" color="textSecondary" sx={{ m: 5 }}>
          No more posts to load.
        </Typography>
      )}
    </Box>
  );
};

export default PostLayout;
