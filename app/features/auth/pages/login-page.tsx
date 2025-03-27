import { Button } from "~/common/components/ui/button";
import { Route } from "./+types/login-page";
import { Form, Link, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { Loader2 } from "lucide-react";
import { redirect } from "react-router";
import { makeSSRClient } from "supa-client";
import { z } from "zod";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | wemake" }];
};

const formSchema = z.object({
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email is invalid",
  }).email("Email is invalid"),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password is invalid",
  }).min(8, "Password must be at least 8 characters long"),
});

//post 를 처리할 수 있게 하는 함수
export const action = async ({request}: Route.ActionArgs) => {
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if( !success ) {
    return {
      loginError: null,
      formErrors:error.flatten().fieldErrors,
    }
  }

  const {email, password} = data;
  const {client, headers} = makeSSRClient(request);
  const {error: loginError} = await client.auth.signInWithPassword({email, password});
  if(loginError) {
    return {
      
        formErrors: null,
        loginError: loginError.message,
      
    }
  }
  return redirect("/", {headers});
}

export default function LoginPage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Log in to your account</h1>      
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "formErrors" in actionData && (<p className="text-red-500">{actionData?.formErrors?.email?.join(", ")}</p>)}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "formErrors" in actionData && (<p className="text-red-500">{actionData?.formErrors?.password?.join(", ")}</p>)}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log in"}
          </Button>
          {actionData && "loginError" in actionData && (<p className="text-red-500">{actionData.loginError}</p>)}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
