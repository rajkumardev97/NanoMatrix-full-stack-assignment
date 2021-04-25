import React from "react";
import { Link, withRouter } from "react-router-dom";
const UserList = ({ history, ...props }) => {
  const { data, deleteProduct } = props;

  const ProductList = (data) => {
    let allList =
      data &&
      data.map((item, key) => {
        return (
          <tr key={key}>
            <td class="text-center">
              <a
                href={`http://localhost:5000/${item.product_image}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`http://localhost:5000/${item.product_image}`}
                  width="50"
                  alt="productImg"
                />
              </a>
            </td>
            <td class="text-center">
              <small>{item.product_name}</small>
            </td>
            <td class="text-center">
              <small>{item.product_quantity}</small>
            </td>
            <td class="text-center">
              <small>{item.product_sku}</small>
            </td>
            <td class="text-center">
              <Link to={`/edit-product/${item._id}`}>
                <i className="fa fa-pencil"></i>
              </Link>
            </td>
            <td class="text-center">
              <Link to={`/detail-product/${item._id}`}>
                <i className="fa fa-eye"></i>
              </Link>
            </td>
            <td class="text-center">
              <i
                className="fa fa-trash"
                onClick={(e) => deleteProduct(item._id)}
              ></i>
            </td>
          </tr>
        );
      });
    return allList;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover ">
        <thead className="bg-light ">
          <tr>
            <th class="text-center">Image</th>
            <th class="text-center">Name</th>

            <th class="text-center">Qty</th>
            <th class="text-center">SKU</th>
          </tr>
        </thead>
        <tbody>{ProductList(data)}</tbody>
      </table>
    </div>
  );
};

export default withRouter(UserList);
