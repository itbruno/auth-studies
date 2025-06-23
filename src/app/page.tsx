import { signin } from "@/datalayer/auth";

export default function LoginPage() {
  return (
    <form action={signin} className="flex flex-col gap-4 p-8 border border-zinc-900 max-w-lg m-auto mt-10">
      <div className="flex flex-col gap-3">
        <label className="d-block font-medium text-sm" htmlFor="email">Email</label>
        <input className="border border-zinc-800 w-full rounded-md p-3" type="email" id="email" name="email" placeholder="Email" />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="d-block font-medium text-sm" htmlFor="email">Password</label>
        <input className="border border-zinc-800 w-full rounded-md p-3" id="password" type="password" name="password" placeholder="Password" />
      </div>

      <button className="cursor-pointer w-full bg-white text-zinc-900 rounded-full py-4 px-6" type="submit">Login</button>
    </form>
  )
}