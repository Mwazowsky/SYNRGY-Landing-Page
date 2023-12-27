import { Card } from '@mui/material';

import ProductsTable from './ProductsTable';

import useProducts from "../../../hooks/products.hooks";

function Products() {
  const {
    cars,
    filters, 
    handleStatusChange,
    handleEdit,
    handleRemove,
    handleRemoveMultiple,
    handleSearch
  } = useProducts();

  return (
    <Card>
      <ProductsTable 
        cars={cars}
        filters={filters}
        handleStatusChange={handleStatusChange}
        handleEdit={handleEdit} 
        handleRemove={handleRemove} 
        handleSearch={handleSearch}
        handleRemoveMultiple={handleRemoveMultiple} 
      />
    </Card>
  );
}

export default Products;
