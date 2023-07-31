import React, { useEffect, useState } from 'react';
import './App.css';

const ContagemVendas = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    loadDataFromCache();
  }, []);

  // Função para adicionar um item à lista de vendas
  const addItem = () => {
    const itemList = document.getElementById('itemList');
    const selectedOption = itemList.options[itemList.selectedIndex];

    const newRow = {
      item: selectedOption.text,
      value: parseFloat(selectedOption.value),
    };

    setSalesData([...salesData, newRow]);
    saveDataToCache();
  };

  // Função para remover um item da lista de vendas
  const removeItem = (index) => {
    const updatedSalesData = [...salesData];
    updatedSalesData.splice(index, 1);

    setSalesData(updatedSalesData);
    saveDataToCache();
  };

  // Função para salvar os dados da contagem de vendas no cache do navegador
  const saveDataToCache = () => {
    localStorage.setItem('festajunina_data', JSON.stringify({ salesData }));
  };

  // Função para carregar os dados da contagem de vendas do cache do navegador
  const loadDataFromCache = () => {
    const data = localStorage.getItem('festajunina_data');

    if (data) {
      const parsedData = JSON.parse(data);
      setSalesData(parsedData.salesData);
    }
  };

  // Função para calcular os totais de vendas e itens
  const getTotalAmount = () => {
    return salesData.reduce((total, item) => total + item.value, 0).toFixed(2);
  };

  const getTotalCount = () => {
    return salesData.length;
  };

  return (
    <div>
      <h1>Contagem de Vendas - Festa Junina</h1>

      <h2>Itens Vendidos</h2>
      <select id="itemList" class="selectItem">
        <option value="5.00">Pipoca</option>
        <option value="7.00">Quentão</option>
        <option value="3.00">Canjica</option>
      </select>
      <button onClick={addItem} class="add_button">Adicionar Item</button>

      <table id="salesTable">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Item</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.item}</td>
              <td>{item.value.toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(index)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <strong>Total de Vendas:</strong>
        <span id="totalAmount">R$ {getTotalAmount()}</span>
      </div>

      <div>
        <strong>Total de Itens:</strong>
        <span id="totalCount">{getTotalCount()}</span>
      </div>
    </div>
  );
};

export default ContagemVendas;
