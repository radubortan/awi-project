import React from 'react';
import { useState } from 'react';

const CostContext = React.createContext({
  additionalCost: 0,
  personnalCost: 0,
  fluidCost: 0,
  productionCost: 0,
  salesPrice: 0,
  useAdditionalCost: false,
  materialCost: 0,
  setCosts: (
    materialCost,
    additionalCost,
    personnalCost,
    fluidCost,
    productionCost,
    salesPrice,
    useAdditionalCost
  ) => {},
});

export const CostContextProvider = (props) => {
  const [additionalCost, setAdditionalCost] = useState(0);
  const [personnalCost, setPersonnalCost] = useState(0);
  const [fluidCost, setFluidCost] = useState(0);
  const [productionCost, setProductionCost] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [useAdditionalCost, setUseAdditionalCost] = useState(false);
  const [materialCost, setMaterialCost] = useState(0);

  const setCosts = (
    materialCost,
    additionalCost,
    personnalCost,
    fluidCost,
    productionCost,
    salesPrice,
    useAdditionalCost
  ) => {
    setMaterialCost(materialCost);
    setAdditionalCost(additionalCost);
    setPersonnalCost(personnalCost);
    setFluidCost(fluidCost);
    setProductionCost(productionCost);
    setSalesPrice(salesPrice);
    setUseAdditionalCost(useAdditionalCost);
  };

  const contextValue = {
    materialCost: materialCost,
    additionalCost: additionalCost,
    personnalCost: personnalCost,
    fluidCost: fluidCost,
    productionCost: productionCost,
    salesPrice: salesPrice,
    setCosts: setCosts,
    useAdditionalCost: useAdditionalCost,
  };

  return (
    <CostContext.Provider value={contextValue}>
      {props.children}
    </CostContext.Provider>
  );
};

export default CostContext;
