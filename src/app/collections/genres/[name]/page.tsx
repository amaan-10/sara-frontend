/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Footer from "@/components/Footer";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faShapes } from "@fortawesome/free-solid-svg-icons";
import sara from "../../../../../public/sara.png";
import saraDark from "../../../../../public/sara-dark.png";
import WatchlistButton from "@/components/WatchlistButton";
import { notFound, useParams } from "next/navigation";
import { fetchMoviesByGenre } from "@/utils/fetchMoviesByGenre";

const GenrePage = () => {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Decode movie query from URL
  const name = useParams();

  // Handle cases where no movie query is found
  if (!name) return notFound();

  useEffect(() => {
    document.title = `${
      typeof name.name === "string" && name.name.toLowerCase() === "tv-movie"
        ? "TV Movie"
        : typeof name.name === "string"
        ? name.name
            .toLowerCase()
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase())
        : ""
    } | SARA`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.01) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface Movie {
    backdrop_path: string;
    id: number;
    title: string;
    overview: string;
    release_date: string;
    runtime: string;
    adult: boolean;
    original_language: string;
    genres: string[];
  }

  const [moviesByGenre, setMoviesByGenre] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoviesByGenre(
      typeof name.name === "string" && name.name.toLowerCase() === "tv-movie"
        ? "TV Movie"
        : typeof name.name === "string"
        ? name.name
            .toLowerCase()
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase())
        : ""
    ).then((movies) => {
      setMoviesByGenre(movies);
      setLoading(false);
    });
  }, []);

  // console.log(moviesByGenre);

  const [hoveredMovie, setHoveredMovie] = useState(0);
  return (
    <SplashScreen isLoading={loading}>
      <div className="bg-gradient-to-br transition duration-200 text-black dark:text-white from-neutral-100 dark:from-neutral-800 dark:to-neutral-900 to-neutral-200 min-h-screen">
        <div className="mx-5 md:mx-20 pt-32">
          <div className="fixed top-0 left-0 w-full pt-5 px-5 md:px-16 mr-0 py-4 z-20">
            {/* Default Background */}

            <div
              className={` -z-10 absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isScrolled ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: isScrolled
                  ? theme === "light"
                    ? "linear-gradient(to bottom, #e5e5e5, rgba(229,229,229,0.8), transparent)"
                    : "linear-gradient(to bottom, #262626, rgba(38,38,38,0.8), transparent)"
                  : theme === "light"
                  ? "linear-gradient(to bottom, #e5e5e5,  transparent)"
                  : "linear-gradient(to bottom, #262626, transparent)",
              }}
            ></div>
            <header className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Image
                    src={theme === "light" ? sara : saraDark}
                    alt="sara-logo"
                    height={24}
                  />
                </Link>
              </div>
              <div className="flex gap-7">
                <Link
                  href={"/browse/genres"}
                  className="py-2 px-3 bg-black dark:bg-white rounded-full -mr-4"
                >
                  <FontAwesomeIcon
                    icon={faShapes}
                    className={`font-semibold text-white dark:text-black`}
                  />
                </Link>
                <button onClick={toggleTheme} className="rounded-full">
                  {theme === "light" ? (
                    <div className="h-5 w-5 text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        className="w-6 h-6"
                        viewBox="0 0 50 50"
                        fill="currentColor"
                      >
                        <path d="M 24.90625 3.96875 C 24.863281 3.976563 24.820313 3.988281 24.78125 4 C 24.316406 4.105469 23.988281 4.523438 24 5 L 24 11 C 23.996094 11.359375 24.183594 11.695313 24.496094 11.878906 C 24.808594 12.058594 25.191406 12.058594 25.503906 11.878906 C 25.816406 11.695313 26.003906 11.359375 26 11 L 26 5 C 26.011719 4.710938 25.894531 4.433594 25.6875 4.238281 C 25.476563 4.039063 25.191406 3.941406 24.90625 3.96875 Z M 10.65625 9.84375 C 10.28125 9.910156 9.980469 10.183594 9.875 10.546875 C 9.769531 10.914063 9.878906 11.304688 10.15625 11.5625 L 14.40625 15.8125 C 14.648438 16.109375 15.035156 16.246094 15.410156 16.160156 C 15.78125 16.074219 16.074219 15.78125 16.160156 15.410156 C 16.246094 15.035156 16.109375 14.648438 15.8125 14.40625 L 11.5625 10.15625 C 11.355469 9.933594 11.054688 9.820313 10.75 9.84375 C 10.71875 9.84375 10.6875 9.84375 10.65625 9.84375 Z M 39.03125 9.84375 C 38.804688 9.875 38.59375 9.988281 38.4375 10.15625 L 34.1875 14.40625 C 33.890625 14.648438 33.753906 15.035156 33.839844 15.410156 C 33.925781 15.78125 34.21875 16.074219 34.589844 16.160156 C 34.964844 16.246094 35.351563 16.109375 35.59375 15.8125 L 39.84375 11.5625 C 40.15625 11.265625 40.246094 10.800781 40.0625 10.410156 C 39.875 10.015625 39.460938 9.789063 39.03125 9.84375 Z M 25 15 C 19.484375 15 15 19.484375 15 25 C 15 30.515625 19.484375 35 25 35 C 30.515625 35 35 30.515625 35 25 C 35 19.484375 30.515625 15 25 15 Z M 4.71875 24 C 4.167969 24.078125 3.78125 24.589844 3.859375 25.140625 C 3.9375 25.691406 4.449219 26.078125 5 26 L 11 26 C 11.359375 26.003906 11.695313 25.816406 11.878906 25.503906 C 12.058594 25.191406 12.058594 24.808594 11.878906 24.496094 C 11.695313 24.183594 11.359375 23.996094 11 24 L 5 24 C 4.96875 24 4.9375 24 4.90625 24 C 4.875 24 4.84375 24 4.8125 24 C 4.78125 24 4.75 24 4.71875 24 Z M 38.71875 24 C 38.167969 24.078125 37.78125 24.589844 37.859375 25.140625 C 37.9375 25.691406 38.449219 26.078125 39 26 L 45 26 C 45.359375 26.003906 45.695313 25.816406 45.878906 25.503906 C 46.058594 25.191406 46.058594 24.808594 45.878906 24.496094 C 45.695313 24.183594 45.359375 23.996094 45 24 L 39 24 C 38.96875 24 38.9375 24 38.90625 24 C 38.875 24 38.84375 24 38.8125 24 C 38.78125 24 38.75 24 38.71875 24 Z M 15 33.875 C 14.773438 33.90625 14.5625 34.019531 14.40625 34.1875 L 10.15625 38.4375 C 9.859375 38.679688 9.722656 39.066406 9.808594 39.441406 C 9.894531 39.8125 10.1875 40.105469 10.558594 40.191406 C 10.933594 40.277344 11.320313 40.140625 11.5625 39.84375 L 15.8125 35.59375 C 16.109375 35.308594 16.199219 34.867188 16.039063 34.488281 C 15.882813 34.109375 15.503906 33.867188 15.09375 33.875 C 15.0625 33.875 15.03125 33.875 15 33.875 Z M 34.6875 33.875 C 34.3125 33.941406 34.011719 34.214844 33.90625 34.578125 C 33.800781 34.945313 33.910156 35.335938 34.1875 35.59375 L 38.4375 39.84375 C 38.679688 40.140625 39.066406 40.277344 39.441406 40.191406 C 39.8125 40.105469 40.105469 39.8125 40.191406 39.441406 C 40.277344 39.066406 40.140625 38.679688 39.84375 38.4375 L 35.59375 34.1875 C 35.40625 33.988281 35.148438 33.878906 34.875 33.875 C 34.84375 33.875 34.8125 33.875 34.78125 33.875 C 34.75 33.875 34.71875 33.875 34.6875 33.875 Z M 24.90625 37.96875 C 24.863281 37.976563 24.820313 37.988281 24.78125 38 C 24.316406 38.105469 23.988281 38.523438 24 39 L 24 45 C 23.996094 45.359375 24.183594 45.695313 24.496094 45.878906 C 24.808594 46.058594 25.191406 46.058594 25.503906 45.878906 C 25.816406 45.695313 26.003906 45.359375 26 45 L 26 39 C 26.011719 38.710938 25.894531 38.433594 25.6875 38.238281 C 25.476563 38.039063 25.191406 37.941406 24.90625 37.96875 Z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="h-5 w-5 text-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3a9 9 0 1 0 8.485 11.029A7 7 0 0 1 12 3z" />
                      </svg>
                    </div>
                  )}
                </button>

                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="rounded-full px-6 py-2 font-semibold  bg-black text-white dark:bg-white dark:text-black"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="rounded-full bg-black dark:bg-white px-6 py-2 text-white dark:text-black font-semibold"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </header>
          </div>
          <h2 className="text-2xl pb-10 text-center font-bold ">
            {typeof name.name === "string" &&
            name.name.toLowerCase() === "tv-movie"
              ? "TV Movie"
              : typeof name.name === "string"
              ? name.name
                  .toLowerCase()
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char: string) => char.toUpperCase())
              : ""}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
            {moviesByGenre.map((movie, index) => (
              <Link
                href={`/movie/${movie.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]/g, "")}/${movie.id}`}
                key={movie.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(0)}
              >
                <div className="relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}
                    width={640}
                    height={360}
                    className="w-full h-auto rounded-[6px] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute transition-transform duration-500 group-hover:scale-105 inset-0 group-hover:bg-transparent bg-gradient-to-t from-[#000000bc] to-transparent rounded-[6px]"></div>
                </div>
                <div
                  className={`absolute  left-[10px] right-[10px] text-white bottom-[10px]`}
                >
                  <div className="font-semibold text-sm truncate">
                    {movie.title}
                  </div>
                </div>
                {hoveredMovie === movie.id && (
                  <div
                    className="hidden md:block absolute w-[320px] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out bg-[linear-gradient(to_top,#000000_20%,#000000_75%,transparent_100%)] bg-opacity-90 text-white rounded-[8px] shadow-lg overflow-hidden z-[999]"
                    style={{
                      top: "-30%",
                      left: "0",
                      right: "auto",
                      transform:
                        index % 6 === 0
                          ? "translateX(-6.5%)"
                          : "translateX(-6.5%)",
                    }}
                  >
                    <Link
                      href={`/movie/${movie.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "")}/${movie.id}`}
                      className="relative cursor-pointer"
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        width={640}
                        height={360}
                        className="w-full h-auto rounded-[6px] transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute transition-transform duration-500 group-hover:scale-105 inset-0 group-hover:bg-transparent bg-[linear-gradient(to_top,#000000_1%,transparent_100%)] rounded-[6px]"></div>
                    </Link>
                    <div className="p-4">
                      <Link
                        href={`/movie/${movie.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w-]/g, "")}/${movie.id}`}
                        className="cursor-pointer"
                      >
                        <h3 className="text-lg font-bold">{movie.title}</h3>
                        <p className="text-xs font-bold text-gray-400 mt-1">
                          {movie.release_date
                            ? movie.release_date.slice(0, 4)
                            : "N/A"}{" "}
                          {/* • {movie.rating} • {convertMinutes(movie.runtime)}  */}
                          • {movie.adult ? "A" : "U/A"} •{" "}
                          {movie.original_language === "en"
                            ? "English"
                            : movie.original_language === "hi"
                            ? "हिन्दी"
                            : movie.original_language.toUpperCase()}{" "}
                        </p>
                        <strong className="text-xs text-green-500">
                          {/* {getGenresById(movie.genre_ids).join(" • ")} */}
                          {movie.genres.join(" • ")}
                        </strong>
                        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                          {movie.overview}
                        </p>
                      </Link>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/search?q=${movie.title} Watch Online`,
                              "_blank"
                            )
                          }
                          className="flex-1 bg-white text-black py-2 px-4 rounded-[6px] font-semibold shadow-md hover:bg-gray-300 transition duration-300 ease-in-out active:scale-95 text-center"
                          style={{ borderRadius: "4px" }}
                        >
                          <FontAwesomeIcon icon={faPlay} className="pr-2" />{" "}
                          Watch Now
                        </button>
                        <div className="relative flex flex-col items-center group min-h-full">
                          <div>
                            <WatchlistButton
                              movie={movie}
                              movieId={movie.id}
                              className="w-10 h-10 flex items-center justify-center bg-gray-700 bg-opacity-50 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </SplashScreen>
  );
};

export default GenrePage;
