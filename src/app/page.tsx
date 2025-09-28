import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndexPage } from "../lib/api";
import Container from "@/app/_components/container";
import Image from "next/image";
import { PostBody } from "@/app/_components/post-body";
import markdownToHtml from "@/lib/markdownToHtml";
import Header from "@/app/_components/header";
import { ArrowRight } from "lucide-react";

export default async function Index() {
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const content = await markdownToHtml(page.content || "");

  return (
    <main className="flex flex-col items-center">
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-2000 animate-fadeIn"
        style={{ animation: 'fadeOut 2s forwards' }}>
        {page.pageLoadImage && (
          <div className="mb-4 md:mb-8 flex justify-center relative">
            <div className="relative overflow-hidden w-[200px] md:w-[300px]">
              <Image
                src={page.pageLoadImage}
                alt="Loading"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
              <div className="absolute inset-0 bg-background animate-revealFromLeft opacity-70 blur-md"
                style={{
                  width: '300%',
                  left: '-100%'
                }} />
            </div>
          </div>
        )}
      </div>

      <Container className="flex flex-col min-h-[100dvh] pt-0 px-4 md:px-5">
        <Header text="" />
        <h1 className="text-2xl md:text-4xl tracking-tighter leading-tight mb-4 md:mb-8 text-center">
          {page.title}
        </h1>
        <article className="flex-grow flex items-center justify-center">
          <div className="max-w-2xl w-full">

            {/* <div className="text-base">
              <p></p>
            </div> */}

            {page.coverImage && (
              <div className="mb-8 sm:mx-0">
                <Image
                  src={page.coverImage}
                  alt={page.title}
                  width={1000}
                  height={1000}
                  className="w-full h-auto"
                />
              </div>
            )}

            {page.buyButtonText && (
              <div className="mt-8 flex justify-center">
                <div className="block">
                  <a
                    href={page.buyButtonLink}
                    className="lemonsqueezy-button bg-gray-200 hover:bg-gray-200 hover:text-black text-black px-8 py-4 min-w-[200px] flex items-center rounded-md justify-center pointer-events-none opacity-60 cursor-not-allowed"
                    target="_blank" >
                    <p className="text-2xl font-bold inline-flex items-center">{page.buyButtonText}</p>
                  </a>
                  {page.price && (
                    <p className="text-base-text text-center">{page.price}</p>
                  )}
                </div>
              </div>
            )}

            <div className="mb-8 text-xl w-full">
              <div className="mt-6 space-y-6">
                {page.infoBlock1 && (
                  <div className="prose">
                    <p>{page.infoBlock1}</p>
                  </div>
                )}
              </div>
              {/* <div className="mt-6 space-y-6">
                <a href="/assets/keyssss22.jpeg" target="_blank" className="underline italic inline-flex items-center">See available designs <ArrowRight className="ml-1" size={16} /></a>
              </div> */}
              <div className="mt-6 space-y-6">
                <div className="prose">
                  <p><span className="italic">"It's all inspired by the copenhagen lifestyle"</span> - memaelade</p>
                </div>
              </div>
            </div>

            <PostBody content={content} />
          </div>
        </article>

        {page.copyrightBody && (
          <footer className="max-w-2xl py-4 mt-auto text-xs text-center mx-auto w-full">
            <p className="text-subtle">{page.copyrightBody}</p>
            <p className="text-subtle mt-2">{page.copyrightEndText}</p>
          </footer>
        )}
      </Container>
    </main>
  );
}

export function generateMetadata(): Metadata {
  const page = getIndexPage();

  if (!page) {
    return notFound();
  }

  const title = `${page.title}`;

  return {
    title,
  };
}