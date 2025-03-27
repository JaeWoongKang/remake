import { Button } from "~/common/components/ui/button";
import { Form, Link, useNavigation } from "react-router";
import { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { z } from "zod";
import { checkUsernameExists } from "../queries";
import { Loader2 } from "lucide-react";
import { redirect } from "react-router";
import { makeSSRClient } from "supa-client";


export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | wemake" }];
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export const action = async ({request}: Route.ActionArgs) => {
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if(!success) {
    console.error(error);
    return {formErrors: error.flatten().fieldErrors};
  }
  const usernameExists = await checkUsernameExists(request, {username: data.username});
  if(usernameExists) {
    return {formErrors: {username: ["Username already exists"]}};
  }
  const {client, headers} = makeSSRClient(request);
  const {error: signupError} = await client.auth.signUp({email: data.email, password: data.password, options: {data: {name: data.name, username: data.username}}});
  if(signupError) {
    console.error(signupError);
    return {signupError:[signupError.message]};
  }
  return redirect("/", {headers});
}

export default function JoinPage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Name"
            description="Enter your name"
            name="name"
            id="name"
            required
            type="text"
            placeholder="Enter your name"
          />
          {actionData && "formErrors" in actionData && (
            <div className="text-red-500">
              {actionData?.formErrors?.name?.join(", ")}
            </div>
          )}
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            required
            type="text"
            placeholder="i.e wemake"
          />
          {actionData && "formErrors" in actionData && (
            <div className="text-red-500">
              {actionData?.formErrors?.username?.join(", ")}
            </div>
          )}
          <InputPair
            id="email"
            label="Email"
            description="Enter your email address"
            name="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "formErrors" in actionData && (
            <div className="text-red-500">
              {actionData?.formErrors?.email?.join(", ")}
            </div>
          )}
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="Enter your password"
          />
          {actionData && "formErrors" in actionData && (
            <div className="text-red-500">
              {actionData?.formErrors?.password?.join(", ")}
            </div>
          )}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
          </Button>
          {actionData && "signupError" in actionData && (
            <div className="text-red-500">
              {actionData.signupError}
            </div>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
