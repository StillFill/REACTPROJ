/* tslint:disable */
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import "./Products.css";
import Input from "../../components/common/Input";
import * as _ from "lodash";
import FilterHelpers from "./utils/filter-helpers";
import Pagination from "../../components/common/Pagination";
// import axios from "axios";

const helpers = new FilterHelpers();

class Products extends React.Component<
  {},
  {
    searchedValue: string;
    products: any[];
    isLoading: boolean;
    currentPage: any;
    totalPages: number;
    numberOfProducts: number;
    allProducts: any[];
    headerTitle: string;
  }
> {
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
      headerTitle: ""
    };
    this.debouncedFilter = _.debounce(this.filterData.bind(this), 500);
  }
  public componentWillMount = (): void => {
    this.filterData();
  };

  public componentDidMount = async () => {
    const myRequest = new Request("http://localhost:3006/get-products", {});
    const result = await fetch(myRequest);
    console.log(result);
    const body = await result.json();
    console.log(body);
    const { response } = body;
    this.setState({ allProducts: response }, () => this.filterData());
  };

  public handlePaginationChange = (
    event: React.FormEvent<HTMLSelectElement>
  ): void => {
    var value = (event as any).value;
    this.setState({ currentPage: value }, this.filterData);
  };

  public handleSearchChange = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    var value = (event.target as any).value;
    this.setState({ searchedValue: value }, () => {
      this.debouncedFilter();
    });
  };

  private filterData = () => {
    this.setState({ isLoading: true }, () => {
      const { searchedValue, currentPage, allProducts } = this.state;
      let filteredProducts = helpers.filterByAllAttributes(
        allProducts,
        searchedValue
      );
      this.setState({
        numberOfProducts: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / 3)
      });
      filteredProducts = helpers.filterByPagination(
        filteredProducts,
        currentPage,
        3
      );
      this.setState({
        products: filteredProducts,
        isLoading: false,
        headerTitle: searchedValue
      });
    });
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
      headerTitle
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
              <p className="products-count">
                {numberOfProducts} produtos encontrados{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              {products.map(prod => (
                <div className="product-row-container">
                  <div className="images-container">
                    <div className="product-images">
                      {prod.images.map((image: string) => (
                        <img src={image} />
                      ))}
                    </div>
                  </div>
                  <div className="product-details">
                    <div>
                      <p className="product-name">{prod.name}</p>
                      <p className="product-category">{prod.category}</p>
                    </div>
                    <div>
                      <span>
                        <span className="product-price">
                          R${prod.price / 100}
                        </span>{" "}
                        por{" "}
                        <strong>
                          R$
                          {(prod.price -
                            (prod.price * prod.discount_percentage) / 100) /
                            100}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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
