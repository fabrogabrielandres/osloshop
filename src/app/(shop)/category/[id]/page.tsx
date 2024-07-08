import { notFound } from "next/navigation";


interface Props {
    params: {
        id: string
    }
}


export default function CategoryPage({ params }: Props) {
    console.log(params);
    if (params.id === "kids") {
        notFound()
    }

    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    );
}