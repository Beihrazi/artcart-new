import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import styled from 'styled-components';
import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";

const OrdersContainer = styled.div`
  overflow-y: scroll;
  max-height: 600px; /* Adjust max-height as needed */
`;

const OrderRow = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line if needed */
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none; /* Remove border for last row */
  }
`;

const OrderInfo = styled.div`
  flex: 1;
  width: 100%; /* Take up the remaining space in the row */
  display: flex;
  flex-wrap: wrap; /* Allow product details to wrap if needed */
`;

const OrderTime = styled.div`
  font-weight: bold;
  width: 30%;
  
  
`;

const CustomerName = styled.div`
  font-style: italic;
  width: 20%;
`;

const Address = styled.div`
  color: #888;
  width: 30%;
`;

const ProductDetails = styled.div`
  margin-right: 10px; /* Add spacing between product details */
  width:100px;
`;

const ManageOrders = () => {
  const [orders, setOrders] = useState([]); // State to hold fetched order data
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Function to fetch order data from the API using Axios
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://fakestoreapi.com/carts'); // Replace with your API URL
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrdersContainer>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>Error fetching orders: {error}</p>
      ) : (
        <div>
          {orders.map((order) => (
            <OrderRow key={order.id}>
              <OrderInfo>
                <OrderTime>{order.date}</OrderTime>
                {/* <CustomerName>{order.customerName}</CustomerName> */}
                {/* <Address>{order.address}</Address> */}
                {order.products.map((product) => (
                  <ProductDetails key={product.productId}>
                    <p>{product.productId} (Qty: {product.quantity})</p>
                  </ProductDetails>
                ))}
                <button style={{ width: "70px", backgroundColor: "blue" }}><TiTick /></button>
                <button style={{ width: "70px", backgroundColor: "red" }}><RxCross1 /></button>
                {/* Add more fields as needed */}
              </OrderInfo>
              {/* Add buttons or actions related to the order */}
            </OrderRow>
          ))}
        </div>
      )}
    </OrdersContainer>
  );
};

export default ManageOrders;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TiTick } from "react-icons/ti";
// import { RxCross1 } from "react-icons/rx";

// // ManageOrders component
// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchOrders = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get('https://fakestoreapi.com/carts'); // Replace with your API URL
//       setOrders(response.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div  className=" h-600 bg-gray-100">
//       {isLoading ? (
//         <p className="text-center py-4">Loading orders...</p>
//       ) : error ? (
//         <p className="text-center py-4 text-red-500">Error fetching orders: {error}</p>
//       ) : (
//         <div style={{ overflowY: 'scroll' }} className="flex flex-col">
//           {orders.map((order) => (
//             <div key={order.id} className="flex items-center border-b border-gray-300 p-4 rounded-md shadow-sm">
//               <div className="flex-grow">
//                 <p className="text-lg font-medium mb-2">{order.date}</p>
//                 {/* Add product details here */}
//                 <div className="flex flex-wrap">
//                   {order.products.map((product) => (
//                     <div key={product.productId} className="mr-4 mb-2">
//                       <p className="text-gray-600">{product.productId} (Qty: {product.quantity})</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="w-8 h-8 bg-blue-500 text-white rounded-full">
//                   <TiTick />
//                 </button>
//                 <button className="w-8 h-8 bg-red-500 text-white rounded-full">
//                   <RxCross1 />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;

