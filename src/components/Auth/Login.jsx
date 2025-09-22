import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { login } from "../../services/authService";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    nombreUsuario: "",
    contrasena: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(credentials);
      localStorage.setItem("authToken", JSON.stringify(response.data));

      // Decodificar el token para obtener información del usuario
      const token = response.data.accessToken;
      const payload = JSON.parse(atob(token.split(".")[1]));

      onLogin({
        username: payload.sub,
        role: payload.role || "USUARIO",
      });
    } catch (error) {
      setError("Credenciales incorrectas. Por favor, intente nuevamente.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 justify-content-center">
          <Card className="shadow">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2>Iniciar Sesión</h2>
                <p className="text-muted">Sistema de Reserva de Espacios</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreUsuario"
                    value={credentials.nombreUsuario}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese su usuario"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="contrasena"
                    value={credentials.contrasena}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese su contraseña"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
      </Row>
    </Container>
  );
};

export default Login;
