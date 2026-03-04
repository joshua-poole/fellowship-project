"use client";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { signInWithGoogle } from "~/server/better-auth/client";
import { LogoIcon } from "~/components/Logo";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { AppleIcon } from "~/components/icons/AppleIcon";

export default function Login() {
  return (
    <>
      <div className="grid grid-cols-[50%_50%] w-full h-screen">
        <div className="left-side flex w-full h-full items-center justify-center">
          <div className="flex flex-col w-full max-w-[500px]">
            <LogoIcon />
            <h1 className="text-2xl font-medium my-12">Sign in to Airtable</h1>

            <div className="flex flex-col gap-4">
              <label htmlFor="email">Email</label>
                <Input type="email" name="email" className="w-full border-none rounded-[6px] shadow-[0px_0px_1px_rgba(0,0,0,0.32),0px_0px_2px_rgba(0,0,0,0.08),0px_1px_3px_rgba(0,0,0,0.08)] focus-visible:shadow-[0_0_0_2px_rgb(22,110,225)] focus-visible:ring-0 focus-visible:border-none" placeholder="Email address"/>

                <Button className="w-full h-10 bg-[rgb(27,97,201)] opacity-50 hover:bg-[rgb(27,97,201)]">Continue</Button>

                <span className="flex items-center justify-center my-6 text-[--colors-foreground-subtle] ">or</span>
                <Button variant="outline" className="w-full h-10 cursor-pointer hover:bg-white"><span>Sign in with <b>Single Sign On</b></span></Button>
                <Button variant="outline" className="w-full h-10 cursor-pointer hover:bg-white" onClick={() => signInWithGoogle()}>
                    <GoogleIcon />
                    <span>Continue with <b>Google</b></span>
                </Button>
                <Button variant="outline" className="w-full h-10 cursor-pointer hover:bg-white">
                  <AppleIcon />
                  <span>Continue with <b>Apple ID</b></span>
                </Button>
            </div>

            <p className="mt-18 text-[13px] text-[--colors-foreground-subtle]">New to Airtable? <Link className="css-1mxpef6" href="/signup">Create an account</Link> instead</p>
            <p className="mt-4 text-[13px] text-[--colors-foreground-subtle]">Manage your cookie preferences <Link className="css-1xm46ll" href="/cookie-preferences">here</Link></p>
          </div>
        </div>

        <div className="right-side flex flex-row items-center align-center justify-center mt-12">
          <div className="bg-[url('/omni_signin_large@2x.png')] bg-cover bg-center w-[395px] h-[580px] hover:scale-102 cursor-pointer transition-transform duration-200 ease-in-out">
          </div>
        </div>
      </div>
    </>
  );
}
