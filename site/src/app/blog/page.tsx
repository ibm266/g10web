"use client";

import { useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StickyInquireBar } from "@/components/layout/StickyInquireBar";
import { BlogCard } from "@/components/forms/InquireForm";
import { Container, PAGE_CONTENT_CLASS, PageIntro, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Typography";
import { blogPosts } from "@/lib/content";
import { slotIds } from "@/lib/images";

export default function BlogIndexPage() {
  const [visible, setVisible] = useState(6);
  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);
  const featuredId = slotIds("blog-index", "featured")[0];
  const postIds = slotIds("blog-index", "posts");

  return (
    <>
      <SiteHeader />
      <PageIntro
        eyebrow={<Eyebrow>Blog</Eyebrow>}
        headline={[
          { text: "Tips, venues &" },
          { text: "inspiration", italic: true, gold: true },
        ]}
      >
        <p className="mt-4 max-w-2xl text-text-muted">
          Find Aruba wedding photography and videography tips, venue guides, packages, and
          inspiration on the G10 Studio blog.
        </p>
      </PageIntro>
      <Section className={PAGE_CONTENT_CLASS}>
        <Container>
          <BlogCard
            title={featured.title}
            date={featured.date}
            image={featuredId}
            href={`/blog/${featured.slug}`}
            featured
          />
          <div className="mt-10">
            {rest.slice(0, visible).map((post, i) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                date={post.date}
                image={postIds[i] ?? postIds[0]}
                href={`/blog/${post.slug}`}
              />
            ))}
          </div>
          {visible < rest.length && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + 6)}
              className="mt-8 w-full rounded-full border border-border py-3 text-sm font-medium hover:border-accent hover:text-accent"
            >
              Load more
            </button>
          )}
        </Container>
      </Section>
      <Section className="!py-12 bg-highlight/40">
        <Container className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-display text-2xl font-medium">Get tips & inspiration in your inbox</p>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="h-[52px] flex-1 rounded-full border border-border bg-surface px-4 text-base"
            />
            <button
              type="submit"
              className="h-[52px] rounded-full bg-accent px-6 text-sm font-medium text-text-on-dark"
            >
              Subscribe
            </button>
          </form>
        </Container>
      </Section>
      <StickyInquireBar hint="Planning an Aruba wedding?" />
      <SiteFooter />
    </>
  );
}
