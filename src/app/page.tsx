
// Component -> Element / ReactNode
// compose / gabungan / campuran dari Elemen lain
// Element => HTML tag <div> <h1> <image>

import { Experience } from "@/components/Experience";
import { HomeComponent } from "@/components/HomeComponent";
import { Profile } from "@/components/Profile";



export default function Home() {
  console.log("hello");
  
  return (
    <div>
      <Profile name="tara" >
        <Experience/>
      </Profile>
    </div>
  );
}