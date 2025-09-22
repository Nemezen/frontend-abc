import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Badge, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { obtenerMisReservas } from "../services/reservaService";
import { useNavigate } from "react-router-dom";

const Home = ({ isAdmin}) => {
  const user = localStorage.getItem("nombre");
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [folio, setFolio] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await obtenerMisReservas();
        setReservas(data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const getEstadoBadge = (estado) => {
    const variants = {
      PENDIENTE: "warning",
      APROBADA: "success",
      RECHAZADA: "danger",
    };
    return <Badge bg={variants[estado]}>{estado}</Badge>;
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h1>RESERVA DE ESPACIOS</h1>
          <p className="lead">Bienvenido, {user}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Nueva Reserva</Card.Title>
              <Card.Text>
                Solicita la reserva de un espacio para tu evento.
              </Card.Text>
              <LinkContainer to="/reservar">
                <Button variant="primary">Reservar Espacio</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Buscar reserva</Card.Title>
              <FormControl
                type="text"
                placeholder="f-0001"
                className="me-2"
                aria-label="Folio"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
              />
              <Button
                variant="primary"
                onClick={() => navigate(`/reservas/${folio}`)}
                disabled={!folio}
              >
                Buscar
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card className="h-10">
            <Card.Body>
              <Card.Title>Mis Reservas</Card.Title>
              {loading ? (
                <div className="text-center">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : reservas.length === 0 ? (
                <p className="text-muted">No tienes reservas aún.</p>
              ) : (
                <div className="">
                  {reservas.slice(0, 3).map((reserva) => (
                    <div key={reserva.id} className="border-bottom py-2">
                      <div className="d-flex justify-content-between">
                        <strong>{reserva.nombreEspacio}</strong>
                        {getEstadoBadge(reserva.estado)}
                      </div>
                      <small className="text-muted">
                        {new Date(reserva.fechaHoraInicio).toLocaleDateString()}{" "}
                        - {reserva.numeroFolio}
                      </small>
                    </div>
                  ))}
                  {reservas.length > 3 && (
                    <div className="text-center mt-2">
                      <small>Y {reservas.length - 3} más...</small>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {isAdmin && (
        <Row className="mt-4">
          <Col className="text-center">
            <LinkContainer to="/admin">
              <Button variant="outline-primary">Panel de Administración</Button>
            </LinkContainer>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Home;
