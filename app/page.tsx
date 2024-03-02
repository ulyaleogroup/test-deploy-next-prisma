import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex gap-x-4 items-center">
        hello this is a homepage. for go to the dashboard protected 
        <Link href={"/dashboard"} className={buttonVariants()}>
          Click Me
        </Link>
      </div>
    </div>
  );
};

export default Home;
