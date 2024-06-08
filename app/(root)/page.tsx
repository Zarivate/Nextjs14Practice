"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";

const Home = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetch("api/posts", {
        method: "GET",
      });
      const data = await posts.json();
      setUserPosts(data);
      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Welcome to Void Board. A Basic full stack demonstration app.
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
      {/* Maybe turn this entire section into it's own component, ala a FEED component */}
      <div>
        <button>Get posts</button>
      </div>
    </>
  );
};

export default Home;
