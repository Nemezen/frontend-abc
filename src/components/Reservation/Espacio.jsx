import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { obtenerEspacios } from "../../services/espacioService";

const Espacio = ({ formData, updateFormData, nextStep }) => {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const fetchEspacios = async () => {
      try {
        const data = await obtenerEspacios();
        setEspacios(data);
      } catch (error) {
        console.error("Error al obtener espacios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspacios();
  }, []);

  const handleSelectSpace = (espacio) => {
    setSelectedSpace(espacio);
    updateFormData("espacioId", espacio.id);
  };

  const handleNext = () => {
    if (formData.espacioId) {
      nextStep();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando espacios...</span>
        </Spinner>
        <p className="mt-2">Cargando espacios disponibles...</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-4">Selecciona un espacio</h4>

      <Row>
        {espacios.map((espacio) => (
          <Col md={6} key={espacio.id} className="mb-3">
            <Card
              className={`h-100 cursor-pointer ${
                selectedSpace?.id === espacio.id ? "border-primary" : ""
              }`}
              onClick={() => handleSelectSpace(espacio)}
            >
              <Card.Body>
                <Card.Title>{espacio.nombre}</Card.Title>
                <Card.Text>
                  <small className="text-muted">Tipo: {espacio.tipo}</small>
                  <br />
                  <small className="text-muted">
                    Capacidad: {espacio.capacidad} personas
                  </small>
                </Card.Text>
                {espacio.descripcion && (
                  <Card.Text className="mt-2">{espacio.descripcion}</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button onClick={handleNext} disabled={!formData.espacioId}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default Espacio;
