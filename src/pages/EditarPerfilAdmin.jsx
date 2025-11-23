import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscarUsuario, editarUsuarioAdmin } from "../api/usuarioService";
import "../styles/Perfil.css";

export default function EditarUsuarioAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    pais: "",
    ciudad: "",
    direccion: "",
    estado: "",
    rolId: "",
  });

  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [maxFecha, setMaxFecha] = useState("");
  const [roles, setRoles] = useState([
    { idRol: 1, nombreRol: "Admin" },
    { idRol: 2, nombreRol: "Usuario" },
    // Agrega aquí más roles si los tienes
  ]);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const data = await buscarUsuario(id);
        setUsuario({
          idUsuario: data.idUsuario,
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
 
          rolId: data.rol?.idRol || "",
        });
        setMaxFecha(new Date().toISOString().split("T")[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("Error al cargar usuario");
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };
    cargarUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUsuario((prev) => ({ ...prev, [id]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: usuario.nombre,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fechaNacimiento: usuario.fechaNacimiento,
      pais: usuario.pais,
      ciudad: usuario.ciudad,
      direccion: usuario.direccion,
      estado: usuario.estado,
      idRol: usuario.rolId,
    };

    try {
      await editarUsuarioAdmin(id, datos);
      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => navigate("/admin/panel"), 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage("Error al actualizar usuario");
      setShowError(true);
      setShowSuccess(false);
    }
  };

  if (loading) return <p>Cargando usuario...</p>;

  return (
    <main className="perfil-main">
      <div className="perfil-box">
        <h2 className="text-center mb-4">Editar Usuario (Admin)</h2>
        <form onSubmit={handleGuardar}>
          {["nombre", "apellidoPaterno", "apellidoMaterno", "correo", "telefono", "fechaNacimiento", "pais", "ciudad", "direccion", "codigoDesc", "estado"].map((field) => (
            <div className="perfil-input-group mb-3" key={field}>
              <span className="perfil-label">{field}</span>
              <input
                id={field}
                type={field === "correo" ? "email" : field === "fechaNacimiento" ? "date" : field === "telefono" ? "number" : "text"}
                value={usuario[field] || ""}
                onChange={handleChange}
                className="perfil-input"
                max={field === "fechaNacimiento" ? maxFecha : undefined}
                required={["nombre", "apellidoPaterno", "correo"].includes(field)}
              />
            </div>
          ))}

          <div className="perfil-input-group mb-3">
            <span className="perfil-label">Rol</span>
            <select
              id="rolId"
              value={usuario.rolId || ""}
              onChange={handleChange}
              className="perfil-input"
              required
            >
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.idRol} value={rol.idRol}>
                  {rol.nombreRol}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center mb-3">
            <button type="submit" className="perfil-btn btn-lg">Guardar Cambios</button>
          </div>
        </form>

        {showSuccess && <p className="text-success text-center mt-3">Usuario actualizado correctamente</p>}
        {showError && <p className="text-danger text-center mt-3">{errorMessage}</p>}
      </div>
    </main>
  );
}
