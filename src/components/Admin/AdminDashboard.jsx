import { useState } from "react";
import { Tab, Tabs, Card } from "react-bootstrap";
import GestionReservas from "./GestionReservas";
// import UserManagement from "./UserManagement";

const AdminDashboard = () => {
  const [key, setKey] = useState("reservas");

  return (
    <div>
      <h1 className="mb-4">Panel de Administración</h1>

      <Card>
        <Card.Body>
          <Tabs
            id="admin-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="reservas" title="Gestión de Reservas">
              <GestionReservas />
            </Tab>
            {/* <Tab eventKey="usuarios" title="Gestión de Usuarios"> */}
              {/* <UserManagement /> */}
            {/* </Tab> */}
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
