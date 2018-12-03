/* tslint:disable */
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import "./Products.css";
import Input from "../../components/common/Input";
import * as _ from "lodash";
import FilterHelpers from "./utils/filter-helpers";
import Pagination from "../../components/common/Pagination";
import Select from "react-select";

const helpers = new FilterHelpers();

interface SelectOption {
  label: string;
  value: number;
}

interface Product {
  _id: string;
  name: string;
  images: string[];
  category: string;
  price: number;
  discount_percentage: number;
}

interface States {
  searchedValue: string;
  products: any[];
  isLoading: boolean;
  currentPage: any;
  totalPages: number;
  numberOfProducts: number;
  allProducts: any[];
  headerTitle: string;
  resultsPerPage: any;
}

const selectOptions = Array.from([3, 5, 10, 15, 20, 25], (value: any) => ({
  label: `Visualizar ${value} produtos`,
  value
}));

class Products extends React.Component<States, any> {
  private debouncedFilter: any;
  constructor(props: any) {
    super(props);
    this.state = {
      searchedValue: "",
      products: [],
      allProducts: [],
      isLoading: false,
      currentPage: 1,
      totalPages: 0,
      numberOfProducts: 0,
      headerTitle: "",
      resultsPerPage: 5
    };
    this.debouncedFilter = _.debounce(this.filterData.bind(this), 500);
  }
  public componentWillMount = (): void => {
    this.filterData();
  };

  public componentDidMount = async () => {
    const myRequest = new Request("http://localhost:3006/get-products", {});
    const result = await fetch(myRequest);
    const body = await result.json();
    const { response } = body;
    this.setState({ allProducts: response }, () => this.filterData());
  };

  public handlePaginationChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    const value = (event as any).value;
    this.setState({ currentPage: value }, this.filterData);
  };

  public handleSearchChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const value = (event.target as any).value;
    this.setState({ searchedValue: value }, () => {
      this.debouncedFilter();
    });
  };

  private filterData = () => {
    this.setState({ isLoading: true }, () => {
      const {
        searchedValue,
        currentPage,
        allProducts,
        resultsPerPage
      } = this.state;
      let filteredProducts = helpers.filterByAllAttributes(
        allProducts,
        searchedValue
      );
      this.setState({
        numberOfProducts: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / resultsPerPage)
      });
      filteredProducts = helpers.filterByPagination(
        filteredProducts,
        currentPage,
        resultsPerPage
      );
      this.setState({
        products: filteredProducts,
        isLoading: false,
        headerTitle: searchedValue
      });
    });
  };

  handleChangeResultsPerPage = (event: SelectOption) => {
    this.setState({ resultsPerPage: event.value }, this.filterData);
  };

  public render() {
    // functions
    const { handleSearchChange } = this;

    // state
    const {
      searchedValue,
      products,
      currentPage,
      totalPages,
      numberOfProducts,
      headerTitle,
      resultsPerPage
    } = this.state;
    return (
      <div>
        <div>
          <div className="top-bar">
            <h1>mmartan</h1>
            <div className="filter-container">
              <Input onChange={handleSearchChange} value={searchedValue} />
            </div>
          </div>
        </div>
        <div className="products-header">
          <span>{headerTitle || "Lista de produtos"}</span>
        </div>
        <Grid className="products-container">
          <Row>
            <Col md={12}>
              <div className="products-count-container">
                <p className="products-count">
                  {numberOfProducts} produtos encontrados{" "}
                </p>
                <Select
                  options={selectOptions}
                  value={resultsPerPage}
                  onChange={this.handleChangeResultsPerPage}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {products.map(
                ({
                  _id,
                  images,
                  name,
                  category,
                  price,
                  discount_percentage
                }: Product) => (
                  <div key={_id} className="product-row-container">
                    <div className="images-container">
                      <div className="product-images">
                        {images.map((image: string) => (
                          <img key={image} src={image} />
                        ))}
                      </div>
                    </div>
                    <div className="product-details">
                      <div>
                        <p className="product-name">{name}</p>
                        <p className="product-category">{category}</p>
                      </div>
                      <div>
                        <span>
                          <span className="product-price">R${price / 100}</span>{" "}
                          por{" "}
                          <strong>
                            R$
                            {(price - (price * discount_percentage) / 100) /
                              100}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Col>
          </Row>
          <Row>
            <Pagination
              handlePageChange={this.handlePaginationChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Products;
