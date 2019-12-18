import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { SizeMe } from 'react-sizeme'
import { useDevice } from 'vtex.device-detector'
import { OrderForm } from 'vtex.order-manager'
import { Item } from 'vtex.checkout-graphql'

const { useOrderForm } = OrderForm

const MAX_MOBILE_WIDTH = 640

interface Props {
  items: Item[]
  onQuantityChange: (uniqueId: string, value: number) => void
  onRemove: (uniqueId: string) => void
}

const ProductListWrapper: StorefrontFunctionComponent<Props> = props => {
  const { loading } = useOrderForm()
  const { device } = useDevice()

  return (
    <SizeMe noPlaceholder>
      {({ size }) =>
        (loading && device === 'phone') ||
        (size.width && size.width < MAX_MOBILE_WIDTH) ? (
          <ExtensionPoint id="product-list-content-mobile" {...props} />
        ) : (
          <ExtensionPoint id="product-list-content-desktop" {...props} />
        )
      }
    </SizeMe>
  )
}

export default ProductListWrapper
