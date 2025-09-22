import { useState } from 'react';
import { Card, Nav, Alert, Container, Row, Col } from 'react-bootstrap';
import Espacio from './Espacio';
import FechaHora from './FechaHora';
import Detalles from './Detalles';
import Confirmacion from './Confirmacion';
import { crearReserva } from '../../services/reservaService';

const ReservaForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    espacioId: '',
    fechaHoraInicio: null,
    fechaHoraFin: null,
    descripcionEvento: '',
  });
  const [reservaCreada, setReservaCreada] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: 'Espacio', component: Espacio },
    { title: 'Fecha y Hora', component: FechaHora },
    { title: 'Detalles', component: Detalles },
    { title: 'Confirmación', component: Confirmacion },
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (field, value) => {
    console.log('Updating form data:', { field, value });
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const reservaData = {
        espacioId: formData.espacioId,
        fechaHoraInicio: formData.fechaHoraInicio.toISOString(),
        fechaHoraFin: formData.fechaHoraFin.toISOString(),
        descripcionEvento: formData.descripcionEvento,
      };
      const response = await crearReserva(reservaData);
      setReservaCreada(response);
      // No longer calling nextStep here
    } catch (error) {
      setError('Error al crear la reserva. Por favor, intente nuevamente.');
      console.error('Error creating reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const CurrentStepComponent = steps[step - 1].component;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="shadow">
            <Card.Header>
              <Nav variant="pills" className="justify-content-center">
                {steps.map((s, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link active={index + 1 === step}>
                      {index + 1}. {s.title}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Header>
            
            <Card.Body>
              {error && !reservaCreada && <Alert variant="danger" className="mb-3">{error}</Alert>}
              
              <CurrentStepComponent 
                formData={formData} 
                updateFormData={updateFormData} 
                nextStep={handleNext}
                prevStep={handleBack}
                onSubmit={handleSubmit}
                reservaCreada={reservaCreada}
                loading={loading}
                error={error}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservaForm;
