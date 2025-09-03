import Post from "@/components/post";
import SubmitForm from "@/components/submitForm";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Feed from "@/components/feed";
import { ImageWithSkeleton } from "@/components/skeletonImage";

export const metadata = {
  title: "Gab's wall",
};

export default function Home() {
  return (
    <div className="justify-items-center grid grid-cols-1 min-h-screen gap-4 drop-shadow-lg">
      <div className="bg-blue-400 mt-5 w-11/12 rounded-t-2xl">
        <header className="text-left font-bold p-4 text-white">My Wall</header>
        <div className="bg-white md:grid md:grid-cols-[350px_auto] h-full">
          <div className="flex flex-col space-y-6 border-r border-gray-400 p-8">
            <div className="aspect-[4/5] w-70 relative">
              <ImageWithSkeleton
                src="/my-wall-profile.jpg"
                alt="profile-photo"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="font-bold text-2xl">Gabriel P. Torres</h2>
            <p>Wall</p>
            <div>
              <h3 className="font-medium">Networks</h3>
              <span>DLSU-D Alum</span>
            </div>
            <div>
              <h3 className="font-medium">Current City</h3>
              <span>Los Banos, Philippines</span>
            </div>
          </div>
          <div className="m-10 space-y-6">
            <SubmitForm />
            <div className="space-y-6">
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
