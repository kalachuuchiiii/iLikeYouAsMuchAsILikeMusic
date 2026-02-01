import type { SentimentDTO, SentimentForm } from "@repo/dtos";
import { useApi } from "@src/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSentimentActions = () => {
  const api = useApi();
  const { mutate: createSentiment, isPending: isCreatingSentiment } =
    useMutation({
      mutationFn: async ({
        sentimentForm,
        username,
      }: {
        sentimentForm: SentimentForm;
        username: string;
      }) => {
        const p =  api.post('/sentiments', { sentimentForm, username })
         toast.promise(p, {
          loading: 'Creating...',
          success: (res) => res.data.message ?? 'Your sentiment was sent!',
          error: (err) => err.response.data.message ?? 'Something unexpected has occurred.'
         })

        const res = await p
        
        return res.data;
      },
    });

  return {
    createSentiment,
    isCreatingSentiment,
  };
};
