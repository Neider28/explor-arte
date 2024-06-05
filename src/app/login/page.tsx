"use client";
import { RefreshCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { useMyContext } from "@/context/MainContext";
import { tree } from "next/dist/build/templates/app-page";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 character(s)",
  }),
});

const hardcodedUser = {
  email: "admin@example.com",
  password: "Password123",
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    setTimeout(async () => {
      if (values.email === hardcodedUser.email && values.password === hardcodedUser.password) {
        const responseNextAuth = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (responseNextAuth?.error) {
          return;
        }

        router.push("/search");
      } else {
        if (values.email === hardcodedUser.email && values.password !== hardcodedUser.password) {
          setIsLoading(false);
          toast({
            variant: "destructive",
            description: "Incorrect password.",
          });
        } else {
          setIsLoading(false);
          toast({
            variant: "destructive",
            description: "Invalid credentials.",
          });
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (session) {
      router.push("/search");
    }
  }, [router, session]);

  return (<>
    {session ? (
      <Loading />
    ) : (
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input autoComplete="off" placeholder="email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input autoComplete="off" placeholder="Your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
            </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    )}
  </>);
}
