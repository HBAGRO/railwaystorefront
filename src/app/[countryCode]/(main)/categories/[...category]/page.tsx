Here's the result of running `cat -n` on /home/ubuntu/github_repos/medusa-iox-storefront/src/app/[countryCode]/(main)/categories/[...category]/page.tsx:
export const dynamic = 'force-dynamic'
     1	import { Metadata } from "next"
     2	import { notFound } from "next/navigation"
     3	
     4	import { getCategoryByHandle, listCategories } from "@lib/data/categories"
     5	import { listRegions } from "@lib/data/regions"
     6	import { StoreProductCategory, StoreRegion } from "@medusajs/types"
     7	import CategoryTemplate from "@modules/categories/templates"
     8	import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
     9	
    10	type Props = {
    11	  params: { category: string[]; countryCode: string }
    12	  searchParams: {
    13	    sortBy?: SortOptions
    14	    page?: string
    15	  }
    16	}
    17	
    18	export async function generateStaticParams() {
    19	  const product_categories = await listCategories()
    20	
    21	  if (!product_categories) {
    22	    return []
    23	  }
    24	
    25	  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    26	    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    27	  )
    28	
    29	  const categoryHandles = product_categories.map(
    30	    (category: any) => category.handle
    31	  )
    32	
    33	  const staticParams = countryCodes
    34	    ?.map((countryCode: string | undefined) =>
    35	      categoryHandles.map((handle: any) => ({
    36	        countryCode,
    37	        category: [handle],
    38	      }))
    39	    )
    40	    .flat()
    41	
    42	  return staticParams
    43	}
    44	
    45	export async function generateMetadata({ params }: Props): Promise<Metadata> {
    46	  try {
    47	    const { product_categories } = await getCategoryByHandle(
    48	      params.category
    49	    )
    50	
    51	    const title = product_categories
    52	      .map((category: StoreProductCategory) => category.name)
    53	      .join(" | ")
    54	
    55	    const description =
    56	      product_categories[product_categories.length - 1].description ??
    57	      `${title} category.`
    58	
    59	    return {
    60	      title: `${title} | Medusa Store`,
    61	      description,
    62	      alternates: {
    63	        canonical: `${params.category.join("/")}`,
    64	      },
    65	    }
    66	  } catch (error) {
    67	    notFound()
    68	  }
    69	}
    70	
    71	export default async function CategoryPage({ params, searchParams }: Props) {
    72	  const { sortBy, page } = searchParams
    73	
    74	  const { product_categories } = await getCategoryByHandle(
    75	    params.category
    76	  )
    77	
    78	  if (!product_categories) {
    79	    notFound()
    80	  }
    81	
    82	  return (
    83	    <CategoryTemplate
    84	      categories={product_categories}
    85	      sortBy={sortBy}
    86	      page={page}
    87	      countryCode={params.countryCode}
    88	    />
    89	  )
    90	}
    91	