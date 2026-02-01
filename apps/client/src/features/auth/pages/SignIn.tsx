import { PASSWORD_MAX, PASSWORD_MIN, USERNAME_MAX, USERNAME_MIN } from "@repo/constants";
import type { SignInDTO } from "@repo/dtos";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@src/components/ui/input-group";
import { Key, User } from "lucide-react";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
  const [signInForm, setSignInForm] = useState<SignInDTO>({
    username: "",
    password: "",
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSignInForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { signIn, isSigningIn } = useAuth();

  const handleSignIn = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(signInForm);
  }

  return (
    <form onSubmit={handleSignIn} aria-disabled = {isSigningIn} className="mx-auto flex-col w-full h-screen flex items-center justify-center ">
      
      <h1 className="my-6 shadows-into-light-regular">
        ILikeYouAsMuchAsILikeMusic
      </h1>
      <Card className="md:w-3/12">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <InputGroup>
            <InputGroupInput
            required
            minLength={USERNAME_MIN}
             maxLength={USERNAME_MAX}
              value={signInForm.username}
              onChange={handleChangeForm}
              name="username"
              placeholder="Username"
            />
            <InputGroupAddon>
              <User />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
            required
              value={signInForm.password}
              onChange={handleChangeForm}
              minLength={PASSWORD_MIN}
              maxLength={PASSWORD_MAX}
              name="password"
              type="password"
              placeholder="Password"
            />
            <InputGroupAddon>
              <Key />
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2">
            <p className="text-xs">
              Doesn't have an account?{" "}
              <NavLink
                to={"/sign-up"}
                className="text-blue-400 hover:underline"
              >
                Create one
              </NavLink>
            </p>
            <button disabled = {isSigningIn} type="submit" className="ilym-button">Sign in!</button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignIn;
