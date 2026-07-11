"use client";

import { PhotoImage } from "@/components/ui/PhotoImage";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { galleryItemFromId } from "@/lib/images";

type WeddingForm = {
  names: string;
  email: string;
  weddingDate: string;
  guestCount?: string;
  venue: string;
  services: string[];
  message?: string;
  website?: string;
};

type SessionForm = {
  sessionType: string;
  name: string;
  email: string;
  dates: string;
  groupSize?: string;
  message?: string;
  website?: string;
};

const weddingServices = ["Photography", "Videography", "Drone", "Content creator"];
const sessionTypes = ["Couple", "Family", "Solo", "Proposal"];

export function InquireForm({ variant }: { variant: "wedding" | "session" }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sessionType, setSessionType] = useState("");

  const weddingForm = useForm<WeddingForm>();
  const sessionForm = useForm<SessionForm>();

  const inputClass =
    "h-[52px] w-full rounded-2xl border border-border bg-bg px-4 text-base focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  async function onSubmit(data: WeddingForm | SessionForm) {
    if ("website" in data && data.website) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, ...data }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email info@g10.studio");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Container narrow>
        <div className="rounded-[20px] border border-border bg-surface p-8 text-center">
          <h3 className="font-display text-2xl font-medium">Thanks! Check your email!</h3>
          <p className="mt-3 text-text-muted">
            We typically respond within {variant === "wedding" ? "72" : "48"} hours.
          </p>
        </div>
      </Container>
    );
  }

  if (variant === "wedding") {
    const { register, handleSubmit, formState: { errors } } = weddingForm;
    return (
      <Container narrow>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />
          <Field label="Your names" error={errors.names?.message}>
            <input className={inputClass} {...register("names", { required: "Required" })} />
          </Field>
          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              className={inputClass}
              {...register("email", { required: "Required" })}
            />
          </Field>
          <Field label="Wedding date" error={errors.weddingDate?.message}>
            <input
              type="date"
              className={inputClass}
              {...register("weddingDate", { required: "Required" })}
            />
          </Field>
          <Field label="Guest count">
            <input type="number" className={inputClass} {...register("guestCount")} />
          </Field>
          <Field label="Venue / location" error={errors.venue?.message}>
            <input className={inputClass} {...register("venue", { required: "Required" })} />
          </Field>
          <div>
            <label className="mb-2 block text-sm font-medium">What do you need?</label>
            <div className="flex flex-wrap gap-2">
              {weddingServices.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    const next = selectedServices.includes(s)
                      ? selectedServices.filter((x) => x !== s)
                      : [...selectedServices, s];
                    setSelectedServices(next);
                    weddingForm.setValue("services", next);
                  }}
                  className={`rounded-full px-4 py-2 text-sm ${
                    selectedServices.includes(s)
                      ? "bg-accent text-[#f5efe6]"
                      : "border border-border bg-bg text-text"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Field label="Tell me about your day">
            <textarea
              className={`${inputClass} min-h-[120px] py-3`}
              {...register("message")}
            />
          </Field>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending…" : "Send inquiry"}
          </Button>
          <p className="text-center text-sm text-text-muted">
            Weddings from $2,000 · first come, first served…
          </p>
        </form>
      </Container>
    );
  }

  const { register, handleSubmit, formState: { errors } } = sessionForm;
  return (
    <Container narrow>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="text" {...register("website")} className="hidden" tabIndex={-1} autoComplete="off" />
        <div>
          <label className="mb-2 block text-sm font-medium">Session type</label>
          <div className="flex flex-wrap gap-2">
            {sessionTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setSessionType(t);
                  sessionForm.setValue("sessionType", t);
                }}
                className={`rounded-full px-4 py-2 text-sm ${
                  sessionType === t ? "bg-accent text-[#f5efe6]" : "border border-border bg-bg text-text"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <Field label="Name" error={errors.name?.message}>
          <input className={inputClass} {...register("name", { required: "Required" })} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" className={inputClass} {...register("email", { required: "Required" })} />
        </Field>
        <Field label="Dates in Aruba" error={errors.dates?.message}>
          <input className={inputClass} {...register("dates", { required: "Required" })} />
        </Field>
        <Field label="Group size">
          <input type="number" className={inputClass} {...register("groupSize")} />
        </Field>
        <Field label="Anything else?">
          <textarea className={`${inputClass} min-h-[120px] py-3`} {...register("message")} />
        </Field>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="text-center text-sm text-text-muted">
          All inquiries must go through this form…
        </p>
      </form>
    </Container>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function BlogCard({
  title,
  date,
  image,
  href,
  featured = false,
}: {
  title: string;
  date: string;
  image: string;
  href: string;
  featured?: boolean;
}) {
  const item = image.startsWith("img_") ? galleryItemFromId(image) : null;
  const src = item?.src ?? image;

  if (featured) {
    return (
      <Link href={href} className="group block overflow-hidden rounded-[20px] border border-border">
        <div className="relative aspect-[16/10]">
          <PhotoImage
            src={src}
            alt=""
            fill
            focalX={item?.focalX}
            focalY={item?.focalY}
            sizes="100vw"
          />
        </div>
        <div className="p-6">
          <p className="text-xs uppercase tracking-widest text-text-muted">{date}</p>
          <h3 className="mt-2 font-display text-2xl font-medium group-hover:text-accent md:text-3xl">
            {title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 border-b border-border py-4"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <PhotoImage
          src={src}
          alt=""
          fill
          focalX={item?.focalX}
          focalY={item?.focalY}
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-text-muted">{date}</p>
        <h3 className="truncate font-display text-lg group-hover:text-accent">{title}</h3>
      </div>
      <span className="text-accent">→</span>
    </Link>
  );
}
