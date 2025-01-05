import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostLayout from "./PostLayout";

const QueryPost = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PostLayout />
      </QueryClientProvider>
    </div>
  );
};

export default QueryPost;
