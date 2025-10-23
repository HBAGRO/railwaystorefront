import { Metadata } from "next"
import { notFound } from "next/navigation"

import InteractiveLink from "@modules/common/components/interactive-link"
import { getCollectionsList } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Koleksiyonlar",
  description: "Tüm ürün koleksiyonlarını keşfedin.",
}

export const dynamic = 'force-dynamic'

type Params = {
  params: {
    countryCode: string
  }
}

export default async function CollectionsPage({ params }: Params) {
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const { collections } = await getCollectionsList(0, 100)

  return (
    <div className="content-container py-6">
      <div className="mb-8 text-2xl-semi">
        <h1>Koleksiyonlar</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <InteractiveLink
            key={collection.id}
            href={`/${countryCode}/collections/${collection.handle}`}
          >
            <div className="group relative overflow-hidden rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
              {collection.thumbnail && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.thumbnail}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {collection.title}
                </h3>
                {collection.metadata?.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {collection.metadata.description as string}
                  </p>
                )}
              </div>
            </div>
          </InteractiveLink>
        ))}
      </div>
      
      {collections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Henüz koleksiyon bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}
