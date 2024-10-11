import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";
import LoadingPostsSkeleton from "@/components/shared/LoadingPostsSkeleton";
import FeedHold from "@/components/FeedHold";

// Home page, has a feed component that fetches data from the database so it become async
const Home = async () => {
  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Welcome to Void Board, a basic full stack app.
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>
      {/* Showcase a loading skeleton while the data is fetched and built */}
      <Suspense fallback={<LoadingPostsSkeleton />}>
        <FeedHold />
      </Suspense>
    </>
  );
};

export default Home;
