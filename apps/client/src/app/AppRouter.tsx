import ProtectedLayout from "@src/components/ui/ProtectedLayout";
import { AuthGuard } from "@src/features/auth/guard/AuthGuard";
import React, { lazy } from "react";
import { useRoutes, type RouteObject } from "react-router-dom";

const Home = lazy(() => import("@src/pages/Home"));
const NotFound = lazy(() => import("@src/pages/NotFound"));
const SignIn = lazy(() => import("@src/features/auth/pages/SignIn"));
const SignUp = lazy(() => import("@src/features/auth/pages/SignUp"));
const CreateASentiment = lazy(
  () => import("@src/features/sentiment/pages/CreateASentiment")
);
const SentimentInbox = lazy(
  () => import("@src/features/sentiment/pages/SentimentInbox")
);
const ASentimentForMe = lazy(
  () => import("@src/features/sentiment/pages/ASentimentForMe")
);

const routes: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: (
          <AuthGuard>
            <Home />
          </AuthGuard>
        ),
        path: "/",
      },
      {
        element: <CreateASentiment />,
        path: "/s/:username",
      },
      {
        element: (
          <AuthGuard>
            <SentimentInbox />
          </AuthGuard>
        ),
        path: "/inbox",
      },
      {
        element: (
          <AuthGuard>
            <ASentimentForMe />
          </AuthGuard>
        ),
        path: "/sentiment/:sentimentId",
      },
    ],
  },
  {
    element: <NotFound />,
    path: "*",
  },
  {
    element: <SignIn />,
    path: "/sign-in",
  },
  {
    element: <SignUp />,
    path: "/sign-up",
  },
];

const AppRouter = () => {
  return useRoutes(routes);
};

export default AppRouter;
