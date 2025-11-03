import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function Introduction({}) {

  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
            <span className="text-primary text-6xl max-w-3xl">
                Multiply your progress with AI-powered training
            </span>
            <span className="text-muted-foreground text-xl max-w-2xl">
                Workouts evolve. Nutrition changes. What never changes is progress built with the right tools and team. With SmartMacros, athletes, coaches, and AI agents train side-by-side on one platform, planning meals, tracking lifts, and learning from your data in real time.
            </span>
        </div>
        <div className="w-full flex items-center justify-center">
            <div className="relative w-fit">
                <Input placeholder="Enter your email" className="w-[90vw] min-[475px]:w-md py-4" />
                <Link to="/signup">
                    <Button className="absolute right-0.5 top-0.5 cursor-pointer h-8" variant={"default"}>Register</Button>
                </Link>
            </div>
        </div>
    </div>
  );
}
