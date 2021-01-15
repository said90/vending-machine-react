import "./App.css";
import { ThemeProvider } from "styled-components";
import theme from "./utils/theme";
import { Box, Label } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "./redux/actions/action";
import Spinner from "./components/Spinner/Spinner";
import { v4 as uuidv4 } from "uuid";
import Product from "./components/Product";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  
  const getProducts = useCallback(() => {
    setLoading(true);
    dispatch(fetchProducts()).then(() => {
      setLoading(false);
    });
  }, [dispatch, setLoading]);
  
  
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const products = useSelector((state) => state.vendorMachine.stockProducts);
  const productsInProcess = useSelector(
    (state) => state.vendorMachine.productsInProcess
  );
  const productsDispatched = useSelector(
    (state) => state.vendorMachine.productsDispatched
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="row"
        width="100vw"
        bg="primary"
        height="100vh"
        flexWrap="wrap"
      >
        <Box
          display="flex"
          flexDirection="row"
          width="50vw"
          bg="primary"
          flexWrap="wrap"
          alignItems="center"
          maxHeight="100vh"
          overflowY="scroll"
        >
          {loading ? (
            <Spinner />
          ) : (
            products?.map((item) => {
              return <Product key={uuidv4()} product={item} />;
            })
          )}
        </Box>
        <Box
          display="flex"
          bg="gray"
          flexDirection="row"
          justifyContent="center"
          width="25vw"
          flexWrap="wrap"
          maxHeight="100vh"
          overflowY="scroll"
        >
          <Box>
            <Box p={10} display="flex" flexDirection="row" mb={0.8}>
              <Label display="flex" justifyContent="center" color="white">
                {`In Process (${productsInProcess.length})`}
              </Label>
            </Box>

            {productsInProcess?.map((item, index) => {
              return (
                <Product key={uuidv4()} product={item} dispatch={dispatch} />
              );
            })}

          </Box>
        </Box>

        <Box
          display="flex"
          bg="darkGray"
          flexDirection="row"
          width="25vw"
          flexWrap="wrap"
          justifyContent="center"
          height="100vh"
          maxHeight="100vh"
          overflowY="scroll"
        >
          <Box>
            <Box p={10} display="flex" flexDirection="row" mb={0.8}>
              <Label color="white">{`Dispatched (${productsDispatched.length})`}</Label>
            </Box>
            {productsDispatched?.map((item, index) => {
              return (
                <Product key={uuidv4()} product={item} dispatch={dispatch} />
              );
            })}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
