import type { SignInDTO, SignUpDTO } from "@repo/dtos";
import { SignUpFormSchema } from "@repo/validators";
import { extractErrorMessage } from "@src/error/extractErrorMessage";
import { useAppDispatch } from "@src/hooks/useRedux";
import myApi from "@src/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getSession } from "../slice/authSlice";

export const useAuth = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: async (signUpForm: SignUpDTO) => {
      const p = myApi.post("/auth/sign-up", { signUpForm });

      await toast.promise(p, {
        loading: "Creating your account...",
        error: extractErrorMessage,
        success: (res) => res.data.message,
      });
      const res = await p;
      return res;
    },
    onSuccess: () => {
      nav("/sign-in");
    },
  });

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: async (signInForm: SignInDTO) => {
      const p = myApi.post("/auth/sign-in", { signInForm });

      await toast.promise(p, {
        loading: "Signing you in...",
        error: extractErrorMessage,
        success: (res) => res.data.message,
      });
      const res = await p;
      return res;
    },
    onSuccess: async() => {
      await dispatch(getSession());
      nav("/");
    },
  });

  const { mutate: signOut } = useMutation({
    mutationFn: async () => {
      const p = myApi.post("/auth/sign-out");
      toast.promise(p, {
        loading: "Signing you out...",
        success: (res) => res.data.message ?? "Sign out success!",
        error: (err) =>
          err.response.data.message ?? "Something unexpected has occurred.",
      });
      const res = await p;
      return res;
    },
    onSuccess: () => {
      nav('/sign-in')
    },
  });

  return {
    signUp,
    isSigningUp,
    signIn,
    isSigningIn,
    signOut,

  };
};
