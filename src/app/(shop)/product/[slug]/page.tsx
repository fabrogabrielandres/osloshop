import type { Metadata } from 'next'
interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return { title: params.slug }
}

export default function ProductPage({ params }: Props) {
    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    );
}