import Widget from "@/components/Profile/Widget";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div className="container mx-auto my-10 text-lg h-full bg-slate-50 rounded-md">
            <Widget />
        <div>{children}</div>
      </div>
    </div>
  );
}
