"use client";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { signInWithGoogle } from "~/server/better-auth/client";
import { LogoIcon } from "~/components/Logo";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { AppleIcon } from "~/components/icons/AppleIcon";
import { Checkbox } from "~/components/ui/checkbox";

export default function Signup() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="flex flex-col w-full justify-center max-w-[500px] mx-auto mt-12">
          <LogoIcon />
          <h1 className="text-2xl font-medium my-12">Welcome to Airtable</h1>

          <div className="flex flex-col gap-4">
            <label htmlFor="email">Work Email</label>
              <Input type="email" name="email" className="w-full border-none rounded-[6px] shadow-[0px_0px_1px_rgba(0,0,0,0.32),0px_0px_2px_rgba(0,0,0,0.08),0px_1px_3px_rgba(0,0,0,0.08)] focus-visible:shadow-[0_0_0_2px_rgb(22,110,225)] focus-visible:ring-0 focus-visible:border-none" placeholder="name@company.com"/>

              <Button className="w-full h-10 bg-[rgb(27,97,201)] opacity-50 hover:bg-[rgb(27,97,201)]">Continue with email</Button>

              <span className="flex items-center justify-center my-2 text-[--colors-foreground-subtle] ">or</span>
              <Button variant="outline" className="w-full h-10 cursor-pointer hover:bg-white"><span>Continue with <b>Single Sign On</b></span></Button>
              <Button variant="outline" className="w-full h-10 cursor-pointer hover:bg-white" onClick={() => signInWithGoogle()}>
                  <GoogleIcon />
                  <span>Continue with <b>Google</b></span>
              </Button>
              <Button variant="outline" className="w-full h-10 cursor-pointer hover:bg-white">
                <AppleIcon />
                <span>Continue with <b>Apple</b></span>
              </Button>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="h-4 w-4 shrink-0" />
              <p className="text-[13px] text-[--colors-foreground-subtle]">By creating an account, you agree to the <Link className="css-1mxpef6" href="/tos">Terms of Service</Link> and <Link className="css-1mxpef6" href="/privacy">Privacy Policy</Link>.</p>
            </div>

            <div className="mt-2 flex items-start gap-2">
              <div className="h-4 w-4 shrink-0" />
              <p className="text-[13px] text-[--colors-foreground-subtle]">Manage your cookie preferences <Button variant="link" className="css-1xm46ll">here</Button></p>
            </div>

            <div className="mt-2 flex items-start gap-2">
              <Checkbox />
              <p className="text-[13px] text-[--colors-foreground-subtle]">I agree to receive marketing communications about Airtable products and events. I understand that I can manage my preferences at any time by following the instructions in the communications received.</p>
            </div>
            <p className="mt-2 text-[13px] text-[--colors-foreground-subtle]">Already have an account? <Link className="css-1mxpef6" href="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
