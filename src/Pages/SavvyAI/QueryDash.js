import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./dashboardLayout/DashboardLayout";

const QueryDash = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <DashboardLayout />
      </QueryClientProvider>
    </div>
  );
};

export default QueryDash;
