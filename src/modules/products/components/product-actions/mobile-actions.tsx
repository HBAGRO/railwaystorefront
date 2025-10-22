Here's the result of running `cat -n` on /home/ubuntu/github_repos/medusa-iox-storefront/src/modules/products/components/product-actions/mobile-actions.tsx:
     1	import { Dialog, Transition } from "@headlessui/react"
     2	import { Button, clx } from "@medusajs/ui"
     3	import React, { Fragment, useMemo } from "react"
     4	
     5	import useToggleState from "@lib/hooks/use-toggle-state"
     6	import ChevronDown from "@modules/common/icons/chevron-down"
     7	import X from "@modules/common/icons/x"
     8	
     9	import { getProductPrice } from "@lib/util/get-product-price"
    10	import OptionSelect from "./option-select"
    11	import { HttpTypes } from "@medusajs/types"
    12	import QuoteRequestButton from "@modules/products/components/quote-request"
    13	
    14	type MobileActionsProps = {
    15	  product: HttpTypes.StoreProduct
    16	  variant?: HttpTypes.StoreProductVariant
    17	  options: Record<string, string | undefined>
    18	  updateOptions: (title: string, value: string) => void
    19	  inStock?: boolean
    20	  handleAddToCart: () => void
    21	  isAdding?: boolean
    22	  show: boolean
    23	  optionsDisabled: boolean
    24	}
    25	
    26	const MobileActions: React.FC<MobileActionsProps> = ({
    27	  product,
    28	  variant,
    29	  options,
    30	  updateOptions,
    31	  inStock,
    32	  handleAddToCart,
    33	  isAdding,
    34	  show,
    35	  optionsDisabled,
    36	}) => {
    37	  const { state, open, close } = useToggleState()
    38	
    39	  const price = getProductPrice({
    40	    product: product,
    41	    variantId: variant?.id,
    42	  })
    43	
    44	  const selectedPrice = useMemo(() => {
    45	    if (!price) {
    46	      return null
    47	    }
    48	    const { variantPrice, cheapestPrice } = price
    49	
    50	    return variantPrice || cheapestPrice || null
    51	  }, [price])
    52	
    53	  return (
    54	    <>
    55	      <div
    56	        className={clx("lg:hidden inset-x-0 bottom-0 fixed", {
    57	          "pointer-events-none": !show,
    58	        })}
    59	      >
    60	        <Transition
    61	          as={Fragment}
    62	          show={show}
    63	          enter="ease-in-out duration-300"
    64	          enterFrom="opacity-0"
    65	          enterTo="opacity-100"
    66	          leave="ease-in duration-300"
    67	          leaveFrom="opacity-100"
    68	          leaveTo="opacity-0"
    69	        >
    70	          <div
    71	            className="bg-white flex flex-col gap-y-3 justify-center items-center text-large-regular p-4 h-full w-full border-t border-gray-200"
    72	            data-testid="mobile-actions"
    73	          >
    74	            <div className="flex items-center gap-x-2">
    75	              <span data-testid="mobile-title">{product.title}</span>
    76	              <span>—</span>
    77	              {selectedPrice ? (
    78	                <div className="flex items-end gap-x-2 text-ui-fg-base">
    79	                  {selectedPrice.price_type === "sale" && (
    80	                    <p>
    81	                      <span className="line-through text-small-regular">
    82	                        {selectedPrice.original_price}
    83	                      </span>
    84	                    </p>
    85	                  )}
    86	                  <span
    87	                    className={clx({
    88	                      "text-ui-fg-interactive":
    89	                        selectedPrice.price_type === "sale",
    90	                    })}
    91	                  >
    92	                    {selectedPrice.calculated_price}
    93	                  </span>
    94	                </div>
    95	              ) : (
    96	                <div></div>
    97	              )}
    98	            </div>
    99	            <div className="grid grid-cols-2 w-full gap-x-4">
   100	              <Button
   101	                onClick={open}
   102	                variant="secondary"
   103	                className="w-full"
   104	                data-testid="mobile-actions-button"
   105	              >
   106	                <div className="flex items-center justify-between w-full">
   107	                  <span>
   108	                    {variant
   109	                      ? Object.values(options).join(" / ")
   110	                      : "Select Options"}
   111	                  </span>
   112	                  <ChevronDown />
   113	                </div>
   114	              </Button>
   115	              <Button
   116	                onClick={handleAddToCart}
   117	                disabled={!inStock || !variant}
   118	                className="w-full"
   119	                isLoading={isAdding}
   120	                data-testid="mobile-cart-button"
   121	              >
   122	                {!variant
   123	                  ? "Select variant"
   124	                  : !inStock
   125	                  ? "Out of stock"
   126	                  : "Add to cart"}
   127	              </Button>
            <div className="w-full mt-2">
              <QuoteRequestButton
                productId={product.id || ""}
                productTitle={product.title || ""}
                variant="secondary"
              />
            </div>
   128	            </div>
   129	          </div>
   130	        </Transition>
   131	      </div>
   132	      <Transition appear show={state} as={Fragment}>
   133	        <Dialog as="div" className="relative z-[75]" onClose={close}>
   134	          <Transition.Child
   135	            as={Fragment}
   136	            enter="ease-out duration-300"
   137	            enterFrom="opacity-0"
   138	            enterTo="opacity-100"
   139	            leave="ease-in duration-200"
   140	            leaveFrom="opacity-100"
   141	            leaveTo="opacity-0"
   142	          >
   143	            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
   144	          </Transition.Child>
   145	
   146	          <div className="fixed bottom-0 inset-x-0">
   147	            <div className="flex min-h-full h-full items-center justify-center text-center">
   148	              <Transition.Child
   149	                as={Fragment}
   150	                enter="ease-out duration-300"
   151	                enterFrom="opacity-0"
   152	                enterTo="opacity-100"
   153	                leave="ease-in duration-200"
   154	                leaveFrom="opacity-100"
   155	                leaveTo="opacity-0"
   156	              >
   157	                <Dialog.Panel
   158	                  className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
   159	                  data-testid="mobile-actions-modal"
   160	                >
   161	                  <div className="w-full flex justify-end pr-6">
   162	                    <button
   163	                      onClick={close}
   164	                      className="bg-white w-12 h-12 rounded-full text-ui-fg-base flex justify-center items-center"
   165	                      data-testid="close-modal-button"
   166	                    >
   167	                      <X />
   168	                    </button>
   169	                  </div>
   170	                  <div className="bg-white px-6 py-12">
   171	                    {(product.variants?.length ?? 0) > 1 && (
   172	                      <div className="flex flex-col gap-y-6">
   173	                        {(product.options || []).map((option) => {
   174	                          return (
   175	                            <div key={option.id}>
   176	                              <OptionSelect
   177	                                option={option}
   178	                                current={options[option.title ?? ""]}
   179	                                updateOption={updateOptions}
   180	                                title={option.title ?? ""}
   181	                                disabled={optionsDisabled}
   182	                              />
   183	                            </div>
   184	                          )
   185	                        })}
   186	                      </div>
   187	                    )}
   188	                  </div>
   189	                </Dialog.Panel>
   190	              </Transition.Child>
   191	            </div>
   192	          </div>
   193	        </Dialog>
   194	      </Transition>
   195	    </>
   196	  )
   197	}
   198	
   199	export default MobileActions
   200	