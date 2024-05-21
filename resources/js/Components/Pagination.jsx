import { Link } from "@inertiajs/react";

export default function Pagination({links}) {
    console.log(links);
    return <div className="flex m-8 space-x-2 justify-center">
     {links.map((link, index) => 
        <Link key={index} href={link.url} className={link.active ?
        "bg-indigo-600 text-white px-4 py-2 border border-indigo-600 rounded-md" : "text-indigo-600 hover:text-white px-4 py-2 border rounded-md"
        } dangerouslySetInnerHTML={{__html: link.label}}/>
    )}
    </div>
}