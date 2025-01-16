import React, { useState, useEffect, useRef } from "react";
import useUser from "./useUser"; // Import the custom hook
import "./PageLayout.css";
import { RxAvatar } from "react-icons/rx";
import { FaHeart } from "react-icons/fa6";

const PostLayout = () => {
  const [posts, setPosts] = useState([]); // Store all loaded posts
  const [newComment, setNewComment] = useState(""); // New comment input
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching more posts
  const [hasMore, setHasMore] = useState(true); // Whether there are more posts to load
  const observerRef = useRef(null); // Ref for the intersection observer
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Separate loading for the first fetch
  const [showComments, setShowComments] = useState({}); // Track comments visibility by postID
  const [commentState, setCommentState] = useState({}); // To track comment input for each post

  // New post modal state
  const [openModal, setOpenModal] = useState(false);
  const [postType, setPostType] = useState(""); // For job, query, suggestion, or normal post
  const [postContent, setPostContent] = useState(""); // Post text content
  const [postImage, setPostImage] = useState(null); // For image upload
  const [selectedCategory, setSelectedCategory] = useState("All"); // Category filter

  // Get user data using the custom hook
  const user = useUser();

  const handleClearPosts = () => {
    // localStorage.removeItem("posts"); // Clears the posts from localStorage
    localStorage.clear();
    setPosts([]); // Optionally clear the state too
  };

  useEffect(() => {
    // Fetch the posts from localStorage on initial load
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
    setIsInitialLoading(false); // Set loading to false after posts are loaded
  }, []); // This should only run once on component mount

  useEffect(() => {
    if (posts.length > 0) {
      // Only save to localStorage when posts array is updated
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]); // This effect is triggered whenever posts change

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // This will be a base64 string
        setPostImage(base64Image); // Store the base64 image string in state
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  // Load the image on component mount if it's saved in localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("postImage");
    if (savedImage) {
      setPostImage(savedImage); // Load the saved image from localStorage
    }
  }, []);

  // Handle post submit (save new post)
  const handlePostSubmit = () => {
    if (!postContent) {
      alert("Please fill all the fields"); // Show an alert if no content is provided
      return; // Stop execution if the condition is met
    }

    const newPost = {
      postID: Date.now(), // Generate unique postID
      user: user,
      content: postContent,
      type: postType,
      image: postImage, // Ensure the image URL is included
      likes: [], // Initialize likes as an empty array
      comments: [],
    };

    // Add the new post to the posts state
    setPosts((prevPosts) => [...prevPosts, newPost]);

    // Clear the post content and image state
    setPostImage("");
    setPostContent("");
    setOpenModal(false); // Close the modal after posting
  };

  // Handle adding a comment to a specific post
  const handleAddComment = (postID) => {
    if (!commentState[postID]) return; // If there's no comment input, do nothing

    // Find the post by postID
    const updatedPosts = posts.map((post) =>
      post.postID === postID
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(), // Generate a unique ID for the comment
                user: user, // Use the logged-in user for the comment
                content: commentState[postID], // Set the comment content
              },
            ],
          }
        : post
    );

    // Update the state with the new post data
    setPosts(updatedPosts);

    // Clear the comment input for this post
    setCommentState((prev) => ({
      ...prev,
      [postID]: "", // Clear the comment input for this specific post
    }));
  };

  // Truncate content and show 'read more' functionality
  const truncateContent = (content) => {
    if (content.length <= 50) return content;

    const shortContent = content.slice(0, 50);
    return `${shortContent}...`;
  };

  const handleLike = (postID) => {
    if (!user || !user.name) {
      console.log("User is not logged in or name is missing");
      return;
    }

    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) => {
        if (post.postID === postID) {
          const isLiked = post.likes.includes(user.name);

          const updatedLikes = isLiked
            ? post.likes.filter((name) => name !== user.name)
            : [...post.likes, user.name];

          return {
            ...post,
            likes: updatedLikes,
          };
        }
        return post;
      });

      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      return updatedPosts;
    });
  };

  const getLikeButtonColor = (postID) => {
    if (!user) return "text-textColor1";

    const post = posts.find((p) => p.postID === postID);
    if (!post) return "text-textColor1";

    return post.likes.includes(user.name) ? "text-theme" : "text-textColor1";
  };

  const filterPostsByCategory = (category) => {
    if (category === "All") {
      return posts; // Return all posts if "All" is selected
    }
    return posts.filter((post) => post.type === category); // Filter posts by type
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col p-5 overflow-x-hidden">
      <div className="relative flex flex-col items-center justify-center max-w-7xl">
        <div className="relative md:absolute top-0 left-0 flex flex-col items-start self-start mb-4 w-2/5">
          <button onClick={handleClearPosts}>Clear posts</button>

          {/* Button to Create New Post */}
          <button
            onClick={() => setOpenModal(true)}
            class="rounded-lg relative w-56 h-10 cursor-pointer flex items-center border border-theme bg-theme group hover:theme active:bg-theme active:border-theme"
          >
            <span class="text-Primary font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
              Create New Post
            </span>
            <span class="absolute right-0 h-full w-10 rounded-lg bg-theme flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
              <svg
                class="svg w-8 text-Primary"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" x2="12" y1="5" y2="19"></line>
                <line x1="5" x2="19" y1="12" y2="12"></line>
              </svg>
            </span>
          </button>

          {/* Filters to show Posts */}
          <span className="mt-4">Filter</span>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              className="border border-textColor2 px-4 py-2 rounded-lg hover:bg-Secondary hover:bg-opacity-60"
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            <button
              className="border border-textColor2 px-4 py-2 rounded-lg hover:bg-Secondary hover:bg-opacity-60"
              onClick={() => setSelectedCategory("Job")}
            >
              Jobs
            </button>
            <button
              className="border border-textColor2 px-4 py-2 rounded-lg hover:bg-Secondary hover:bg-opacity-60"
              onClick={() => setSelectedCategory("Query")}
            >
              Queries
            </button>
            <button
              className="border border-textColor2 px-4 py-2 rounded-lg hover:bg-Secondary hover:bg-opacity-60"
              onClick={() => setSelectedCategory("Other")}
            >
              Others
            </button>
          </div>
        </div>
        {openModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New Post</h2>
                <button
                  className="text-gray-500 hover:text-textColor1"
                  onClick={() => {
                    setOpenModal(false);
                    setPostImage(null); // Clear the image when modal closes
                  }}
                >
                  <span className="text-3xl">&times;</span> {/* Close button */}
                </button>
              </div>

              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full border p-2 mb-4 rounded"
              >
                <option value="" disabled>
                  Select Post Type
                </option>
                <option value="Job">Job</option>
                <option value="Query">Query</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post here"
                className="w-full border p-2 mb-4 rounded"
                rows="4"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block mb-4"
              />

              {postImage && (
                <img
                  src={postImage}
                  alt="PostImage"
                  className="w-auto h-32 object-cover mb-4"
                />
              )}

              <button
                className="hover:bg-theme hover:grayscale-0 bg-theme text-white py-2 w-[20%] rounded-lg grayscale"
                onClick={() => {
                  if (!postContent && !postImage) {
                    alert("Please add content or an image to post.");
                  } else {
                    handlePostSubmit();
                  }
                }}
              >
                Post
              </button>
            </div>
          </div>
        )}

        {isInitialLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-y-4 border-theme rounded-full animate-spin" />
          </div>
        ) : (
          filterPostsByCategory(selectedCategory).map((post) => (
            <div
              key={post.postID}
              className="ml-20 max-w-2xl my-4 w-2/3 bg-Primary border-2 border-[#F4F4F4] rounded-lg shadow-md"
            >
              <div className="flex items-center mb-2 space-x-4 w-full bg-[#F4F4F4] text-textColor1 px-4 py-2 rounded-t-lg">
                <RxAvatar className="size-8" />
                <span className="font-semibold text-xl">
                  {post.user?.name || "Unknown User"}
                </span>
              </div>

              <p className="text-textColor1 px-4 py-2">
                {truncateContent(post.content)}
              </p>

              {post.image && (
                <img
                  src={post.image}
                  alt="PostImage"
                  className="w-full h-80 object-cover my-4 px-4 py-2 border-t-2 border-t-textColor2"
                />
              )}

              <div className="flex items-center justify-between w-full bg-[#F4F4F4] text-textColor1 py-2 px-4 rounded-b-lg">
                <button
                  className={`flex gap-2 items-center text-lg`}
                  onClick={() => handleLike(post.postID)}
                >
                  <FaHeart
                    onClick={getLikeButtonColor}
                    className={`size-6 ${getLikeButtonColor(post.postID)}`}
                  />{" "}
                  {post.likes.length}
                </button>
                <button
                  className=" text-textColor2"
                  onClick={() =>
                    setShowComments((prev) => ({
                      ...prev,
                      [post.postID]: !showComments[post.postID],
                    }))
                  }
                >
                  {showComments[post.postID]
                    ? "Hide Comments"
                    : "Show Comments"}
                </button>
              </div>

              {showComments[post.postID] && (
                <div className="mx-4 mt-4">
                  {post.comments.map((comment) => (
                    <p
                      key={comment.id}
                      className="flex gap-1 items-center text-sm w-full bg-gray-300 text-textColor1 p-2 rounded-full mb-2"
                    >
                      <RxAvatar className="size-5" />
                      <strong>
                        {comment.user?.name || "Unknown User"}
                      </strong>: {comment.content}
                    </p>
                  ))}

                  <textarea
                    value={commentState[post.postID] || ""}
                    onChange={(e) =>
                      setCommentState((prev) => ({
                        ...prev,
                        [post.postID]: e.target.value,
                      }))
                    }
                    className="w-full border p-2 mt-4 rounded"
                    placeholder="Add a comment"
                  />

                  <button
                    className="bg-gradColor2 text-white w-full py-2 mb-2 px-4 self-end rounded-lg hover:bg-theme"
                    onClick={() => handleAddComment(post.postID)}
                  >
                    Add Comment
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostLayout;
