import { NavbarDemo } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavbarDemo/>
      <Button>Click Me!</Button>
    </div>
  );
}
