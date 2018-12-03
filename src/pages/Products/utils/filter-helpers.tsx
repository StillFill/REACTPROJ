/* tslint:disable no-console */
export default class FilterHelpers {
  public filterByAllAttributes(products: any[], searchValue: string): any[] {
    if (!searchValue || searchValue === "") {
      return products;
    }

    return products.filter(product => {
      let isFilteredProduct = false;
      Object.keys(product).map(key => {
        if (
          !isFilteredProduct &&
          product[key]
            .toString()
            .toUpperCase()
            .includes(searchValue.toUpperCase())
        ) {
          isFilteredProduct = true;
        }
      });
      return isFilteredProduct;
    });
  }

  public filterByPagination(
    products: any[],
    currentPage: number,
    resultsPerPage: number
  ): any[] {
    const firstIndex = resultsPerPage * (currentPage - 1);
    const lastIndex = firstIndex + resultsPerPage;
    return products.slice(firstIndex, lastIndex);
  }
}
