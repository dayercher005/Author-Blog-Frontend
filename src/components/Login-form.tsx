import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { Link } from 'react-router';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitLoginForm = async (event) => {
        
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/author/log-in", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})
            });

            const result = await response.json();
            
            if (result.token){
              localStorage.clear()
              localStorage.setItem("token", result.token)
              
            }
            
        } catch (error) {
            console.log('Error: ', error)
        }
    }
    

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={submitLoginForm} action="http://localhost:8080/author/log-in" method="POST" className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your PatchNote Publisher account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input 
                id="password" 
                type="password"
                onChange = {(event) => setPassword(event.target.value)}
                value={password}
                required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
