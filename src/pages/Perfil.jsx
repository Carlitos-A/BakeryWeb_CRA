import React, { useState, useEffect } from "react";
import "../styles/Perfil.css";
import axios from "axios";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [maxFecha, setMaxFecha] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Cargar usuario
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No se encontró token");

        const response = await axios.get("http://localhost:8081/Usuarios/Personal", {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": "123456789ABCDEF",
          },
        });

        const data = response.data;
        setUsuario({
          idUsuario: data.idUsuario, // Guardamos el ID
          nombre: data.nombre || "",
          apellidoPaterno: data.apellidoPaterno || "",
          apellidoMaterno: data.apellidoMaterno || "",
          correo: data.correo || "",
          telefono: data.telefono || "",
          fechaNacimiento: data.fechaNacimiento || "",
          pais: data.pais || "",
          ciudad: data.ciudad || "",
          direccion: data.direccion || "",
          estado: data.estado || "",
          rol: data.rol?.nombreRol || "",
        });

        setMaxFecha(new Date().toISOString().split("T")[0]);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        setErrorMessage("Error al cargar datos del perfil");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario((prev) => ({ ...prev, [id]: value }));
  };

  // Guardar cambios
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (!usuario?.idUsuario) throw new Error("No se encontró el ID del usuario");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No se encontró token");

      await axios.put(`http://localhost:8081/Usuarios/${usuario.idUsuario}`, usuario, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": "123456789ABCDEF",
          "Content-Type": "application/json",
        },
      });

      setEditando(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      setErrorMessage(
        error.response?.status === 403
          ? "No tienes permisos para actualizar este perfil"
          : "Error al guardar los cambios"
      );
      setShowError(true);
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando perfil...</p>;
  if (!usuario) return <p className="text-center mt-5">No se pudo cargar el perfil</p>;

  return (
    <main className="perfil-main">
      <div className="perfil-box">
        <h2 className="text-center mb-4">Mi Perfil</h2>
        <form onSubmit={handleGuardar}>
          {/* Nombre */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Nombre:</span>
            {editando ? (
              <input id="nombre" value={usuario.nombre} onChange={handleChange} className="perfil-input" required />
            ) : (
              <span className="perfil-texto">{usuario.nombre}</span>
            )}
          </div>

          {/* Apellido Paterno */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Apellido Paterno:</span>
            {editando ? (
              <input id="apellidoPaterno" value={usuario.apellidoPaterno} onChange={handleChange} className="perfil-input" required />
            ) : (
              <span className="perfil-texto">{usuario.apellidoPaterno}</span>
            )}
          </div>

          {/* Apellido Materno */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Apellido Materno:</span>
            {editando ? (
              <input id="apellidoMaterno" value={usuario.apellidoMaterno} onChange={handleChange} className="perfil-input" />
            ) : (
              <span className="perfil-texto">{usuario.apellidoMaterno}</span>
            )}
          </div>

          {/* Correo */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Correo:</span>
            {editando ? (
              <input type="email" id="correo" value={usuario.correo} onChange={handleChange} className="perfil-input" required />
            ) : (
              <span className="perfil-texto">{usuario.correo}</span>
            )}
          </div>

          {/* Teléfono */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Teléfono:</span>
            {editando ? (
              <input id="telefono" value={usuario.telefono} onChange={handleChange} className="perfil-input" />
            ) : (
              <span className="perfil-texto">{usuario.telefono}</span>
            )}
          </div>

          {/* Fecha Nacimiento */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Fecha Nacimiento:</span>
            {editando ? (
              <input type="date" id="fechaNacimiento" max={maxFecha} value={usuario.fechaNacimiento} onChange={handleChange} className="perfil-input" />
            ) : (
              <span className="perfil-texto">{usuario.fechaNacimiento}</span>
            )}
          </div>

          {/* País */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">País:</span>
            {editando ? (
              <input id="pais" value={usuario.pais} onChange={handleChange} className="perfil-input" />
            ) : (
              <span className="perfil-texto">{usuario.pais}</span>
            )}
          </div>

          {/* Ciudad */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Ciudad:</span>
            {editando ? (
              <input id="ciudad" value={usuario.ciudad} onChange={handleChange} className="perfil-input" />
            ) : (
              <span className="perfil-texto">{usuario.ciudad}</span>
            )}
          </div>

          {/* Dirección */}
          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Dirección:</span>
            {editando ? (
              <input id="direccion" value={usuario.direccion} onChange={handleChange} className="perfil-input" />
            ) : (
              <span className="perfil-texto">{usuario.direccion}</span>
            )}
          </div>

          {/* Rol (solo lectura) */}
          <div className="perfil-input-group mb-4">
            <span className="perfil-label">Rol:</span>
            <input id="rol" value={usuario.rol} className="perfil-input" disabled />
          </div>

          <div className="text-center mb-3">
            <button
              type="button"
              className="perfil-btn btn-lg"
              onClick={() => {
                if (editando) handleGuardar(new Event("submit"));
                setEditando(!editando);
              }}
            >
              {editando ? "Guardar Cambios" : "Editar"}
            </button>
          </div>
        </form>
      </div>

      {/* Modales */}
      {showSuccess && <p className="text-success text-center mt-3">Datos guardados correctamente</p>}
      {showError && <p className="text-danger text-center mt-3">{errorMessage}</p>}
    </main>
  );
}
