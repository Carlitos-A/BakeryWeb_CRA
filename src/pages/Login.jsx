import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                correo,
                contrasena
            );

            const token = await userCredential.user.getIdToken();
            localStorage.setItem("token", token);

            navigate("/");

        } catch (error) {
            console.error("Error en login", error);
            setUsuario('');
            setContrasena('');
            setShowModal(true);

        }
    };
    ;

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <main className="login-main">
                <div className="login-box">
                    <h2>Inicio de sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="Correo">Correo:</label>
                            <input
                                type="text"
                                name="Correo"
                                id="Correo"
                                className="form-control"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contraseña">Contraseña:</label>
                            <input
                                type="password"
                                name="contraseña"
                                id="contraseña"
                                className="form-control"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button
                                type="submit"
                                className="btn btn-secondary"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Error</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Usuario o contraseña incorrecta</p>
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
        </div>
    );
}

export default Login;
