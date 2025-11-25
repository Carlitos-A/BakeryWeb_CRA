import React, { useEffect, useState } from 'react';
import { listarUsuarios, eliminarUsuario } from '../api/usuarioService';
import { listarProductos, eliminarProducto } from '../api/productosService';
import '../styles/PanelAdmin.css';
import { useNavigate } from 'react-router-dom';
import EditarProducto from './EditarProducto';  

export default function AdminPanel() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosData = await listarUsuarios();
        const productosData = await listarProductos();

        setUsuarios(
          usuariosData.map(u => ({
            id: u.idUsuario,
            nombre: `${u.nombre} ${u.apellidoPaterno}`,
            correo: u.correo,
            rol: u.rol?.nombreRol,
            estado: u.estado
          }))
        );

        setProductos(
          productosData.map(p => ({
            id: p.id_producto,
            nombre: p.nombre,
            categoria: p.categoria,
            precio: p.precio,
            stock: p.stock,
            descripcion: p.descripcion
          }))
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);


  const handleEliminarUsuario = async (id) => {
    if (window.confirm("¿Eliminar usuario?")) {
      await eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      setUsuarioSeleccionado(null);
    }
  };


  const handleEliminarProducto = async (id) => {
    if (window.confirm("¿Eliminar producto?")) {
      await eliminarProducto(id);
      setProductos(prev => prev.filter(p => p.id !== id));
      setProductoSeleccionado(null);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="panel-admin">
      <div className="panel-box">

        {/* SECCIÓN DE LISTAS */}
        <div className="lista-usuarios">
          <h3>Seleccionar Usuario</h3>

          <select
            className="form-select"
            onChange={(e) =>
              setUsuarioSeleccionado(
                usuarios.find(u => u.id === parseInt(e.target.value))
              )
            }
          >
            <option value="">-- Seleccione un usuario --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>

          <h3 style={{ marginTop: "30px" }}>Seleccionar Producto</h3>

          <select
            className="form-select"
            onChange={(e) =>
              setProductoSeleccionado(
                productos.find(p => p.id === parseInt(e.target.value))
              )
            }
          >
            <option value="">-- Seleccione un producto --</option>
            {productos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* PANEL DE EDICIÓN */}
        <div className="editar-usuario">
          <h3>Detalles Seleccionados</h3>

          {/* Usuario */}
          {usuarioSeleccionado ? (
            <div>
              <h4>Usuario</h4>
              <p><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</p>
              <p><strong>Correo:</strong> {usuarioSeleccionado.correo}</p>
              <p><strong>Rol:</strong> {usuarioSeleccionado.rol}</p>
              <p><strong>Estado:</strong> {usuarioSeleccionado.estado}</p>

              {/* BOTONES */}
              <button
                className="btn-admin-editar"
                onClick={() => navigate(`/admin/editar-usuario/${usuarioSeleccionado.id}`)}
              >
                Editar Usuario
              </button>

              <button
                className="btn-admin-eliminar"
                onClick={() => handleEliminarUsuario(usuarioSeleccionado.id)}
              >
                Eliminar Usuario
              </button>
            </div>
          ) : (
            <p className="texto-muted">Selecciona un usuario para ver detalles</p>
          )}

          <hr style={{ margin: "25px 0" }} />

          {/* Producto */}
          {productoSeleccionado ? (
            <div>
              <h4>Producto</h4>
              <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
              <p><strong>Categoría:</strong> {productoSeleccionado.categoria}</p>
              <p><strong>Precio:</strong> {productoSeleccionado.precio}</p>
              <p><strong>Stock:</strong> {productoSeleccionado.stock}</p>
              <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>

              <button
                className="btn-admin-editar"
                onClick={() => navigate(`/admin/editar-producto/${productoSeleccionado.id}`)}
              >
                Editar Producto
              </button>

              <button
                className="btn-admin-eliminar"
                onClick={() => handleEliminarProducto(productoSeleccionado.id)}
              >
                Eliminar Producto
              </button>
            </div>
          ) : (
            <p className="texto-muted">Selecciona un producto para ver detalles</p>
          )}
        </div>
      </div>
    </div>
  );
}
