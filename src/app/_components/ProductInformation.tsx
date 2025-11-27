'use client'
import React from 'react';

type ProductInformationProps = {
  description?:string;
}

const ProductInformation:React.FC<ProductInformationProps> = ({
  description = "No additional information available.",
}) => {
  return (
    <p>
      {description}
    </p>
  )
}

export default ProductInformation