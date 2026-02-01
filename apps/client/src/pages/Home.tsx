import { Button } from "@src/components/ui/button";
import { Card } from "@src/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@src/components/ui/empty";
import { Item } from "@src/components/ui/item";
import { getSession } from "@src/features/auth/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRedux";
import { Copy } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const yourLink = `${window.location.origin}/s/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(yourLink);
    toast.success('Copied!')
  }

  return (
    <div className=" w-full h-[90vh]  flex-col top-0 bottom-0 left-0 right-0 gap-10 flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
  ILikeYouAsMuchAsILikeMusic
          </EmptyTitle>
          <EmptyDescription>
Share your link to receive sentiments!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent> 
           <div className="flex items-center md:text-xl gap-4">
        <Button onClick={handleCopy} variant={'outline'}>
          Copy your link  <Copy />
        </Button>
          <Link to={'/inbox'}>
          <Button variant={'outline'} className="ilym-button">
        Inbox
       </Button></Link>
       </div>
     
        </EmptyContent>
      </Empty>
       
     <div className="text-center w-full flex flex-col items-center justify-center gap-2">
    
      
     </div>
    </div>
  );
};

export default Home;
