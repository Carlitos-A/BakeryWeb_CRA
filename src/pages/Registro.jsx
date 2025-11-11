import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registrar.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Registrar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    correo: "",
    celular: "",
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.correo,
        formData.contrasena
      );
      //SE USA FIREBASE PARA AUTENTICAR AL USUARIO, SE LE ENTREGA EL AUTH QUE SE INICIALIZA EN FIREBASE.JS, EL CORREO Y LA CONTRASEÑA

      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // ESTO ENVIA LOS DATOS DEL USUARIO AL BACKEND PARA GUARDARLOS EN LA BASE DE DATOS COMO SE HIZO EN PRODUCTO PERO EN VEZ DE DEJARSE SOLO UN FETCH
      //SE DEFINE TODO DENTRO DEL FETCH PARA QUE HAGA EL POST A LA RUTA CORRECTA Y CON LOS HEADERS Y BODY NECESARIOS
      const response = await fetch("http://localhost:8081/usuarios/registrar", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          usuario: formData.usuario,
          correo: formData.correo,
          celular: formData.celular,
          genero: formData.genero,
          fechaNacimiento: formData.fechaNacimiento,
          pais: formData.pais,
          ciudad: formData.ciudad,
          direccion: formData.direccion,
          codigoDesc: formData.codigoDesc,
          rol: formData.rol,
        }),
      });
      //RESPONSE.OK ES UN ESTADO DEL OBJETO QUE INDICA QUE LA RESPUESTA FUE EXITOSA 
      if (response.ok) {
        setModal({
          show: true,
          title: "Registro exitoso",
          message: "El usuario se ha registrado correctamente.",
          type: "success", //COLORCITO VERDE PARA EL MODAL KIAKIA
        });

        setFormData({
          usuario: "",
          nombre: "",
          correo: "",
          celular: "",
          genero: "",
          fechaNacimiento: "",
          pais: "",
          ciudad: "",
          direccion: "",
          codigoDesc: "",
          contrasena: "",
          confirmarcontrasena: "",
        });
        //TE MANDA ALTIRO AL LOGIN DESPUES DE REGISTRARTE
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Error al guardar datos en el servidor.");
      }

    } catch (error) {
      console.error(error);
      setModal({
        show: true,
        title: "Error",
        message: error.message.includes("email-already-in-use")
          ? "El correo ya está registrado en Firebase." //SI YA SE TIENE EL CORREO, ENTONCES MUESTRA ESTE MENSAJE
          : "Error al registrar usuario. " + error.message, //SINO TE MANDA EL ERROR QUE DIO el CATCH
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
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">
              Nombre de usuario
            </label>
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

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              placeholder="Nombre completo"
              pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+"
              minLength="3"
              maxLength="30"
              title="Solo letras y espacios"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="mail@site.com"
              required
              value={formData.correo}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="form-control"
              id="fechaNacimiento"
              max={maxFecha}
              required
              value={formData.fechaNacimiento}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="codigoDesc" className="form-label">
              Código de descuento
            </label>
            <input
              type="text"
              className="form-control"
              id="codigoDesc"
              placeholder="Código Descuento (opcional)"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Solo letras, números o guión"
              value={formData.codigoDesc}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              placeholder="Contraseña"
              minLength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Debe contener más de 6 caracteres, incluyendo número, mayúscula y minúscula"
              required
              value={formData.contrasena}
              onChange={handleChange}
            />
          </div>
          {/*//EXCEPTO ESTO. ESTO PERMITE ELEGIR EL ROL DEL USUARIO AL REGISTRARSE. DEBE IMPLEMENTARSE QUE SOLO EL ADMIN PUEDE CAMBIAR ESO DESPUES*/}
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol del usuario
            </label>
            <select
              id="rol"
              className="form-control"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="COMPRADOR">Comprador</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmarcontrasena" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmarcontrasena"
              placeholder="Confirmar contraseña"
              minLength="6"
              required
              value={formData.confirmarcontrasena}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button id="btnRegister" type="submit" className="btn btn-outline-dark">
              Registrarse
            </button>
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
