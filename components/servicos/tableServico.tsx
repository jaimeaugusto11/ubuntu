'use client';

import React, { useState, useRef } from 'react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, GridApi, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Eye } from 'lucide-react'; // Ícone de visualizar


ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

export default function TabelaServico() {
  const gridRef = useRef<AgGridReact<IRow>>(null);
  const [quickFilterText, setQuickFilterText] = useState('');

  const [rowData] = useState<IRow[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
  ]);

  const visualizarServico = (dados: IRow) => {
    alert(`Visualizando serviço de: ${dados.make} ${dados.model}`);
  };

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: 'make', headerName: 'Marca' },
    { field: 'model', headerName: 'Modelo' },
    { field: 'price', headerName: 'Preço' },
    { field: 'electric', headerName: 'Elétrico' },
    {
      headerName: 'Ações',
      cellRenderer: (params: ICellRendererParams<IRow>) => (
        <button
          onClick={() => visualizarServico(params.data)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex items-center gap-1"
        >
          <Eye size={16} />
        </button>
      ),
      width: 120,
      pinned: 'right',
    },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
  };

  const onExportExcel = () => {
    const api = gridRef.current?.api as GridApi<IRow>;
    if (api) {
      api.exportDataAsExcel({
        fileName: 'dados_aggrid.xlsx',
      });
    }
  };

  return (
    <div className="w-full">
      {/* Barra de ações */}
      <div className="mb-3 flex gap-3">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
          className="border border-gray-300 rounded p-2 flex-1"
        />
        <button
          onClick={onExportExcel}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Exportar Excel
        </button>
      </div>

      {/* Grid */}
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
        />
      </div>
    </div>
  );
}
