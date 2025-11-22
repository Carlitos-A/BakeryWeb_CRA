import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PanelAdmin.css";

const API_KEY = "123456789ABCDEF";

export default function PanelAdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSel, setUsuarioSel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const resp = await axios.get("http://localhost:8081/Usuarios", {
        headers: { "x-api-key": API_KEY }
      });

      setUsuarios(resp.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUsuarioSel({
      ...usuarioSel,
      [name]: value
    });
  };

  const guardarCambios = async () => {
    if (!usuarioSel) return;

    try {
      await axios.put(
        `http://localhost:8081/Usuarios/${usuarioSel.id_usuario}`,
        usuarioSel,
        { headers: { "x-api-key": API_KEY } }
      );

      alert("Datos actualizados correctamente");
      cargarUsuarios();
    } catch (err) {
      alert("Error al actualizar usuario");
    }
  };

  return (
    <div className="panel-admin">
      <div className="panel-box">

        {/* LISTA DE USUARIOS */}
        <div className="lista-usuarios">
          <h3>Usuarios</h3>

          {usuarios.map((u) => (
            <div
              key={u.id_usuario}
              className="usuario-item"
              onClick={() => setUsuarioSel(u)}
            >
              {u.nombre} {u.apellido_paterno}
            </div>
          ))}
        </div>

        {/* PANEL DE EDICIÓN */}
        <div className="editar-usuario">
          <h3>Editar Usuario</h3>

          {!usuarioSel ? (
            <p className="texto-muted">Seleccione un usuario</p>
          ) : (
            <>
              <div className="form-grupo">
                <label className="form-label">Rol</label>
                <input
                  className="form-input"
                  name="id_rol"
                  value={usuarioSel.id_rol}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Nombre</label>
                <input
                  className="form-input"
                  name="nombre"
                  value={usuarioSel.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Apellido Paterno</label>
                <input
                  className="form-input"
                  name="apellido_paterno"
                  value={usuarioSel.apellido_paterno}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Apellido Materno</label>
                <input
                  className="form-input"
                  name="apellido_materno"
                  value={usuarioSel.apellido_materno || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Teléfono</label>
                <input
                  className="form-input"
                  name="telefono"
                  value={usuarioSel.telefono || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Dirección</label>
                <input
                  className="form-input"
                  name="direccion"
                  value={usuarioSel.direccion || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Nacimiento</label>
                <input
                  className="form-input"
                  name="fecha_nacimiento"
                  value={usuarioSel.fecha_nacimiento || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Correo</label>
                <input
                  className="form-input"
                  name="correo"
                  value={usuarioSel.correo}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Contraseña</label>
                <input
                  className="form-input"
                  name="contrasena"
                  value={usuarioSel.contrasena}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">RUN</label>
                <input
                  className="form-input"
                  name="run"
                  value={usuarioSel.run}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">DV</label>
                <input
                  className="form-input"
                  name="dv"
                  value={usuarioSel.dv}
                  onChange={handleChange}
                />
              </div>

              <div className="form-grupo">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  name="estado"
                  value={usuarioSel.estado}
                  onChange={handleChange}
                >
                  <option value="A">Activo</option>
                  <option value="I">Inactivo</option>
                </select>
              </div>

              <button className="btn-guardar" onClick={guardarCambios}>
                Guardar Cambios
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
