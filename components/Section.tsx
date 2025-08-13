export default function Section({ title, children }:{ title:string; children:React.ReactNode; }){
  return (
  <section className="max-w-5xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-semibold mb-4">
      {title}
      </h2>{children}
      </section>);
}
