import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CityCardProps {
    loc: {
        name: string
        imageUrl?: string
        count: number
    }
    idx: number
    country: { country: string }
}

const CityCard: React.FC<CityCardProps> = ({ loc, idx, country }) => {
    return (
        <Link
            className="relative rounded-lg overflow-hidden shadow group"
            key={idx}
            href={`/properties?city=${loc.name}&country=${country.country}`}
        >
            <Image
                src={loc.imageUrl || ""}
                alt={`Location `}
                width={200}
                height={200}
                className="object-cover w-full h-40 transition-transform duration-300 group-hover:scale-105"
                priority
                
           />
            <div className=" absolute left-2 bottom-2 bg-black/60 rounded px-2 py-1">
                <span className="text-white text-base font-medium">
                    {loc.name} ({loc.count})
                </span>
            </div>
        </Link>
    )
}

export default CityCard
