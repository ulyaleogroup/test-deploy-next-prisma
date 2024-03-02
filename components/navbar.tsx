import Link from "next/link";
import { ModeToggle } from "./buttons/mode-theme";
import { Button, buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center h-[10vh] border-b">
      <div className="container flex justify-between items-center">
        <Link href={'/'} className="text-3xl font-bold">UlyaStore</Link>
        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <div className="flex gap-x-4">
            <Link href={"/sign-in"} className={buttonVariants()}>
              Sign In
            </Link>
            <Link href={"/sign-up"} className={buttonVariants({variant: "secondary"})}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
