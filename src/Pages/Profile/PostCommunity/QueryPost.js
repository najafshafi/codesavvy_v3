import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostLayout from "./PostLayout";

const QueryPost = ({ user }) => {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (user) {
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    </div>
  );
};

export default QueryPost;
