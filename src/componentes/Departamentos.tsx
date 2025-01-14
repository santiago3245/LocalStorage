import React, { useState } from "react";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  departamentoId: number;
}

interface PropsDepartamento {
  departamentos: Departamento[];
  setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
  empleados: Empleado[];
}

const Departamentos: React.FC<PropsDepartamento> = ({ departamentos, setDepartamentos, empleados }) => {

  const [nombreDepartamento, setNombreDepartamento] = useState<string>("");
  const [editandoDepartamento, setEditandoDepartamento] = useState<Departamento | null>(null);

  const agregarDepartamento = () => {
    if (nombreDepartamento.trim() !== "") {
      if (editandoDepartamento) {
        setDepartamentos(departamentos.map(departamento =>
          departamento.id === editandoDepartamento.id
            ? { ...departamento, nombre: nombreDepartamento }
            : departamento
        ));
        setEditandoDepartamento(null);
      } else {
        setDepartamentos([
          ...departamentos,
          { id: departamentos.length + 1, nombre: nombreDepartamento },
        ]);
      }
      setNombreDepartamento("");
    }
  };

  const eliminarDepartamento = (id: number) => {
    const tieneEmpleados = empleados.some(empleado => empleado.departamentoId === id);
    if (tieneEmpleados) {
      alert("No es posible eliminar el departamento porque tiene empleados.");
    } else {
      setDepartamentos(departamentos.filter(departamento => departamento.id !== id));
    }
  };

  const iniciarEdicion = (departamento: Departamento) => {
    setNombreDepartamento(departamento.nombre);
    setEditandoDepartamento(departamento);
  };

  return (
    <div>
      <h1>Departamentos</h1>
      <input
        type="text"
        value={nombreDepartamento}
        onChange={(e) => setNombreDepartamento(e.target.value)}
        placeholder="Nombre del departamento"
      />
      <button onClick={agregarDepartamento}>
        {editandoDepartamento ? "Actualizar Departamento" : "Agregar Departamento"}
      </button>
      <table border={1} style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.id}</td>
              <td>{departamento.nombre}</td>
              <td>
                <button onClick={() => iniciarEdicion(departamento)}>Editar</button>
                <button onClick={() => eliminarDepartamento(departamento.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departamentos;