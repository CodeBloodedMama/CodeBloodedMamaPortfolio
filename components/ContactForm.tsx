"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type TLabels = {
  title: string; intro: string; name: string; email: string; subject: string; message: string;
  send: string; success: string; error: string;
};

export default function ContactForm({ lang, t }: { lang: "da" | "en"; t: TLabels }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus({ ok: true, msg: t.success });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ ok: false, msg: t.error });
      }
    } catch {
      setStatus({ ok: false, msg: t.error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">{t.name}</label>
          <input
            name="name" type="text" required value={form.name} onChange={onChange}
            className="w-full p-2 rounded bg-black/40 border border-white/10"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">{t.email}</label>
          <input
            name="email" type="email" required value={form.email} onChange={onChange}
            className="w-full p-2 rounded bg-black/40 border border-white/10"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-semibold">{t.subject}</label>
        <input
          name="subject" type="text" value={form.subject} onChange={onChange}
          className="w-full p-2 rounded bg-black/40 border border-white/10"
        />
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-semibold">{t.message}</label>
        <textarea
          name="message" rows={6} required value={form.message} onChange={onChange}
          className="w-full p-2 rounded bg-black/40 border border-white/10"
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="mt-6 w-full py-3 rounded-xl font-semibold btn glow"
      >
        {loading ? (lang === "en" ? "Sending…" : "Sender…") : t.send}
      </button>

      {status && (
        <p className={`mt-3 text-sm ${status.ok ? "text-green-400" : "text-red-400"}`}>
          {status.msg}
        </p>
      )}
    </form>
  );
}
