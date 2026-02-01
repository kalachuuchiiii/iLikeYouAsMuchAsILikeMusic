import type { SignUpDTO } from "@repo/dtos";
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
import { PASSWORD_MAX, PASSWORD_MIN, USERNAME_MAX, USERNAME_MIN } from "@repo/constants";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState<SignUpDTO>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { signUp, isSigningUp } = useAuth();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(signUpForm);
  };

  return (
    <form aria-disabled = {isSigningUp} id="signup-form" onSubmit={handleSignUp} className="mx-auto flex-col w-full h-screen flex items-center justify-center ">
     
     <h1 className="my-6 shadows-into-light-regular">
        ILikeYouAsMuchAsILikeMusic
      </h1>
      <Card className="md:w-3/12">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Start receiving songs!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <InputGroup>
            <InputGroupInput
             form="signup-form"
             required
             minLength={USERNAME_MIN}
             max={USERNAME_MAX}
              value={signUpForm.username}
              onChange={handleChangeForm}
              name="username"
              placeholder="@marvilcun"
            />
            <InputGroupAddon>
              <User />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
            form="signup-form"
            required
               minLength={PASSWORD_MIN}
              maxLength={PASSWORD_MAX}
              value={signUpForm.password}
              onChange={handleChangeForm}
              name="password"
              type="password"
              placeholder="averystrongpassword"
            />
            <InputGroupAddon>
              <Key />
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
              value={signUpForm.confirmPassword}
              onChange={handleChangeForm}
              required
              minLength={PASSWORD_MIN}
              maxLength={PASSWORD_MAX}
              form="signup-form"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
            <InputGroupAddon>
              <Key />
            </InputGroupAddon>
          </InputGroup>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-2">
            <p className="text-xs">
              Already have an account?{" "}
              <NavLink
                to={"/sign-in"}
                className="text-blue-400 hover:underline"
              >
                Sign in
              </NavLink>
            </p>
            <button type="submit" form="signup-form" disabled = {isSigningUp} className="ilym-button">Create account!</button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignUp;
