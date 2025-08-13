"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    alert("Tak for din besked! Jeg vender tilbage hurtigst muligt.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#0a1a2f] text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Kontakt mig</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#122b45] p-6 rounded-2xl shadow-lg"
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Navn</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#0a1a2f] border border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#0a1a2f] border border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Emne</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#0a1a2f] border border-gray-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Besked</label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#0a1a2f] border border-gray-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition"
        >
          Send besked
        </button>
      </form>
    </div>
  );
}
