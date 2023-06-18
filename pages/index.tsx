import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  // const {data: user } = useCurrentUser()
  const {data: movies = []} = useMovieList()
  const {data : favorites= []} = useFavorites()
  return (
    <>
      <Head>
        <title>Netflix</title>
        <link
          rel="icon"
          href="https://pngimg.com/uploads/netflix/small/netflix_PNG10.png"
        />
      </Head>
      <Navbar />
      <Billboard />
      <div className="pb-40">

      <MovieList title='Trending Now' data={movies} />
      <MovieList title='My List' data={favorites} />
      </div>
    </>
  );
}
