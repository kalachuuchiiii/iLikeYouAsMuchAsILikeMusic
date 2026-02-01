import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";
import { useAppSelector } from "@src/hooks/useRedux";
import { Link, Outlet } from "react-router-dom";
import { Home, InboxIcon, LogOutIcon, ScanHeartIcon, Star } from "lucide-react";
import { Button } from "./button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { useAuth } from "@src/features/auth/hooks/useAuth";

const ProtectedLayout = () => {
  const { user, accessToken } = useAppSelector((state) => state.auth);
  const { signOut } = useAuth();

  return !!accessToken ? (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      
      <SidebarProvider>
        <SidebarTrigger className="absolute " >

        </SidebarTrigger>
        <Sidebar>
          <SidebarHeader>
            <div className="p-6 flex  items-center gap-2 justify-center border-b border-neutral-200 dark:border-neutral-700">
              <p className="font-semibold text-xl shadows-into-light-regular  text-center select-none">
                ILikeYouAsMuchAsILikeMusic/
              </p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Hello, {user.username}!</SidebarGroupLabel>
              <SidebarMenu>
                 <SidebarMenuItem className="w-full text-left">
                  <Link to="/">
                    <button className="w-full flex gap-2 items-center p-2" >
                      <Home /> Home
                    </button>
                  
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem className="w-full ">
                  <Link to="/inbox">
                    <button className="w-full flex gap-2 items-center p-2" >
                      <InboxIcon /> Inbox
                    </button>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will have to re-enter your credentials again to sign-in
                  </AlertDialogDescription>
                  <AlertDialogFooter className="w-full">
                    <div className="mt-3 flex justify-end gap-2 items-center w-full">
                      <AlertDialogCancel>Stay</AlertDialogCancel>
                      <Button onClick={() => signOut()}  variant={"destructive"}>Sign out</Button>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogHeader>
              </AlertDialogContent>
              <AlertDialogTrigger>
                <Button className="w-full" variant={"outline"}>
                  <LogOutIcon /> <p>Sign out</p>
                </Button>
              </AlertDialogTrigger>
            </AlertDialog>
          </SidebarFooter>
        </Sidebar>
        <main className="w-full h-screen overflow-y-auto p-2 lg:p-6 ">
          <main className="p-4 max-w-4xl mx-auto">
            <Outlet />
          </main>
        </main>
      </SidebarProvider>
    </div>
  ) : (
    <main className="w-full h-screen overflow-y-auto p-2 lg:p-6 ">
      <main className="p-4 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </main>
  );
};

export default ProtectedLayout;
