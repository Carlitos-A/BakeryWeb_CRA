import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registrar.css";
import { registrarUsuario } from "../api/usuarioService";

function Registrar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    apellidoPaterno: "",
    run: "",
    dv: "",
    correo: "",
    telefono: "",
    genero: "",
    fechaNacimiento: "",
    pais: "",
    ciudad: "",
    direccion: "",
    codigoDesc: "",
    contrasena: "",
    confirmarcontrasena: "",
    rol:{
    idRol: 2,
    nombreRol: "CLIENTE"
  },
  });

//AQUI DEFINO EL ROL COMO COMPRADOR POR DEFECTO, YA QUE EL UNICO CAPAZ DE CAMBIAR ESO DEBE SER EL ADMIN (AUN NO IMPLEMENTADO)

const [maxFecha, setMaxFecha] = useState("");
const [modal, setModal] = useState({ show: false, title: "", message: "", type: "" });

useEffect(() => {
  const today = new Date().toISOString().split("T")[0];
  setMaxFecha(today);
}, []);

const handleChange = (e) => {
  const { id, value } = e.target;
  setFormData({ ...formData, [id]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  //Confirmacion de contraseñas iguales en el formulario
  if (formData.contrasena !== formData.confirmarcontrasena) {
    setModal({
      show: true,
      title: "Error",
      message: "Las contraseñas no coinciden.",
      type: "error",
    });
    return;
  }

  try {

    // Registrar en backend usando AXIOS (Post usando bearer token y etc) cosas que antes se definian manualmente con el fecth
    await registrarUsuario({
      usuario: formData.usuario,
      nombre: formData.nombre,
      apellidoPaterno: formData.apellidoPaterno,
      run: formData.run,
      dv: formData.dv,
      correo: formData.correo,
      telefono: formData.telefono,
      genero: formData.genero,
      fechaNacimiento: formData.fechaNacimiento,
      pais: formData.pais,
      ciudad: formData.ciudad,
      direccion: formData.direccion,
      codigoDesc: formData.codigoDesc,
      contrasena: formData.contrasena,
      rol: formData.rol,
    });

    // Si todo sale bien (considerando que todo esto esta dentro de un catch)
    setModal({
      show: true,
      title: "Registro exitoso",
      message: "El usuario se ha registrado correctamente.",
      type: "success",
    });

    // Reset formulario
    setFormData({
      usuario: "",
      nombre: "",
      apellidoPaterno: "",
      run: "",
      dv: "",
      correo: "",
      telefono: "",
      genero: "",
      fechaNacimiento: "",
      pais: "",
      ciudad: "",
      direccion: "",
      codigoDesc: "",
      contrasena: "",
      confirmarcontrasena: "",
      rol: "COMPRADOR",
    });

    // Redirigir de una a login despues de 2 segundos (para que el usuario vea el modal, se ve mas lindo, mas profesional)
    setTimeout(() => navigate("/login"), 2000);
    //En caso de error, mostrar modal con el error respectivo
  } catch (error) {
    console.error(error);
    setModal({
      show: true,
      title: "Error",
      //Si ya se tiene el correo registrado en firebase, mostrar mensaje especifico
      message: error.message.includes("email-already-in-use")
        ? "El correo ya está registrado en Firebase."
        //Sino mostrar mensaje generico con el error
        : "Error al registrar usuario. " + error.message,
      type: "error",
    });
  }
};

const closeModal = () => {
  if (modal.type === "success") navigate("/login");
  setModal({ show: false, title: "", message: "", type: "" });
};

return ( //NADA CAMBIA DE AQUI EN ADELANTE
  <main className="registro-main">
    <div className="registro-box">
      <h1 className="mb-4 text-center">Registro</h1>
      <form onSubmit={handleSubmit}>

        {/* Usuario */}
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            id="usuario"
            required
            placeholder="Nombre de usuario"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Solo letras, números o guión"
            value={formData.usuario}
            onChange={handleChange}
          />
        </div>

        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            required
            placeholder="Nombre completo"
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
            maxLength="50"
            title="Solo letras y espacios"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        {/* Apellido paterno */}
        <div className="mb-3">
          <label htmlFor="apellidoPaterno" className="form-label">Apellido paterno</label>
          <input
            type="text"
            className="form-control"
            id="apellidoPaterno"
            required
            maxLength="30"
            pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
            placeholder="Apellido paterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
          />
        </div>

        {/* Run */}
        <div className="mb-3">
          <label className="form-label">RUN</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="number"
              className="form-control"
              id="run"
              required
              min="1000000"
              max="99999999"
              placeholder="RUN sin dígito verificador"
              value={formData.run}
              onChange={handleChange}
            />

            <span>-</span>

            <input
              type="text"
              className="form-control"
              id="dv"
              required
              maxLength="1"
              pattern="[0-9Kk]"
              placeholder="DV"
              value={formData.dv}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            id="correo"
            required
            maxLength="100"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="number"
            className="form-control"
            id="telefono"
            max="999999999"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        {/* Fecha de nacimiento */}
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control"
            id="fechaNacimiento"
            required
            max={maxFecha}
            placeholder="Fecha de nacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </div>

        {/* Dirección */}
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            maxLength="100"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        {/* Código descuento */}
        <div className="mb-3">
          <label htmlFor="codigoDesc" className="form-label">Código descuento</label>
          <input
            type="text"
            className="form-control"
            id="codigoDesc"
            maxLength="30"
            placeholder="Código descuento"
            value={formData.codigoDesc}
            onChange={handleChange}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            required
            minLength="6"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
          />
        </div>

        {/* Confirmación */}
        <div className="mb-3">
          <label htmlFor="confirmarcontrasena" className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmarcontrasena"
            required
            minLength="6"
            placeholder="Confirmar contraseña"
            value={formData.confirmarcontrasena}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-outline-dark" type="submit">Registrarse</button>
        </div>

      </form>

    </div>

    {modal.show && (
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div
              className={`modal-header ${modal.type === "success" ? "bg-success text-white" : "bg-danger text-white"
                }`}
            >
              <h5 className="modal-title">{modal.title}</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p>{modal.message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>
);
}

export default Registrar;
