import SearchMenu from "@/components/SearchMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto my-10 text-lg rounded-md relative">
            <div className="w-[85%] overflow-visible text-black text-lg top-0 left-0">
                {children}
            </div>
            <SearchMenu />
        </div>
    );
}
