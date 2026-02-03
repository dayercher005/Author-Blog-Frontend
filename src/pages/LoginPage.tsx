import { LoginForm } from "@/components/Login-form";
import { Link } from 'react-router';
import { Button } from '@/components/ui/button.tsx';
import { ArrowLeftIcon } from 'lucide-react';

export function LoginPage() {
  return (
    <div>
        <div className="bg-muted md:pt-10 md:pl-15">
            <Link className="inline-block" to="/">
                <Button>
                <ArrowLeftIcon className="size-4" />
                </Button>
            </Link>
        <div className="bg-muted flex min-h-fit flex-col items-center pb-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <LoginForm />
            </div>
        </div>
        </div>
    </div>
  )
}